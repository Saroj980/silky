const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT_DIR = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT_DIR, 'out')
const BACKEND_DIR = path.join(ROOT_DIR, 'backend')
const STAGING_DIR = path.join(ROOT_DIR, 'silky-server-staging')
const ZIP_NAME = 'silky-textiles-server-ready.zip'
const ZIP_PATH = path.join(ROOT_DIR, ZIP_NAME)

console.log('📦 Creating Server-Ready Deployment ZIP...')

// 1. Verify out/ directory exists
if (!fs.existsSync(OUT_DIR)) {
  console.error('❌ out/ directory does not exist! Running npm run build first...')
  execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit' })
}

// 2. Clean staging directory & target zip
if (fs.existsSync(STAGING_DIR)) {
  fs.rmSync(STAGING_DIR, { recursive: true, force: true })
}
fs.mkdirSync(STAGING_DIR, { recursive: true })

if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH)
}

// 3. Copy all static files from out/ to staging root (including hidden files like .htaccess)
console.log('📂 Copying static assets from out/ to staging root...')
execSync(`cp -a "${OUT_DIR}/." "${STAGING_DIR}/"`, { stdio: 'inherit' })

// Verify .htaccess exists at root
const htaccessPath = path.join(STAGING_DIR, '.htaccess')
console.log('📄 Writing verified production .htaccess at staging root...')
const htaccessContent = `# Prevent directory listing and disable MultiViews (fixes 403 Forbidden and conflicts)
Options -Indexes -MultiViews +FollowSymLinks

# Set default index files
DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Pass Authorization header to Laravel / PHP (vital for Bearer tokens & Admin auth)
  RewriteCond %{HTTP:Authorization} .
  RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

  # 2. Route all /api/* requests to Laravel backend API
  RewriteCond %{REQUEST_URI} ^/api/ [NC]
  RewriteRule ^api/(.*)$ backend/public/index.php [QSA,L]

  # 3. Serve existing files directly (images, css, js, fonts, svgs, etc.)
  # NOTE: Only match real files (-f). Do NOT match directories (-d) here.
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # 4. Clean URLs for folders containing index.html (with or without trailing slash)
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.*)/$ $1/index.html [L]

  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]

  # 5. Clean URLs for .html pages (e.g. /admin -> admin.html, /contact -> contact.html)
  RewriteCond %{DOCUMENT_ROOT}/$1.html -f
  RewriteRule ^(.*)/$ $1.html [L]

  RewriteCond %{DOCUMENT_ROOT}/$1.html -f
  RewriteRule ^(.*)$ $1.html [L]

  # Additional fallback for shared hosting document root mappings
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^([^/]+)/?$ $1.html [L]

  # 6. If a directory exists but has NO index.html, route to 404 instead of throwing 403 Forbidden
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html !-f
  RewriteRule ^ 404.html [L]

  # 7. Fallback for unknown routes to custom 404 page
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ 404.html [L]
</IfModule>

# Custom Error Documents (never expose raw Apache 403/404 server screens)
ErrorDocument 404 /404.html
ErrorDocument 403 /404.html

# Prevent direct web access to sensitive backend files and configurations
<FilesMatch "(\\.env|\\.env\\.production|artisan|composer\\.json|composer\\.lock|package\\.json|\\.git|\\.prisma)">
  Order allow,deny
  Deny from all
</FilesMatch>

# Static Asset Caching for high performance
<IfModule mod_headers.c>
  <FilesMatch "\\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  <FilesMatch "\\.(html|htm|json)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
`
fs.writeFileSync(htaccessPath, htaccessContent, 'utf8')
console.log('✅ Applied verified production .htaccess to staging root.')

// 4. Copy backend/ directory
console.log('📂 Copying backend/ pre-packaged with vendor/ and .env.production...')
const stagingBackendDir = path.join(STAGING_DIR, 'backend')
fs.mkdirSync(stagingBackendDir, { recursive: true })
execSync(`cp -a "${BACKEND_DIR}/." "${stagingBackendDir}/"`, { stdio: 'inherit' })

// Configure backend environment
const prodEnvPath = path.join(BACKEND_DIR, '.env.production')
if (fs.existsSync(prodEnvPath)) {
  fs.copyFileSync(prodEnvPath, path.join(stagingBackendDir, '.env'))
  fs.copyFileSync(prodEnvPath, path.join(stagingBackendDir, '.env.production'))
  console.log('✅ Applied production .env to backend/.env')
}

// Ensure Laravel storage directories exist
const storageDirs = [
  path.join(stagingBackendDir, 'storage', 'framework', 'cache', 'data'),
  path.join(stagingBackendDir, 'storage', 'framework', 'sessions'),
  path.join(stagingBackendDir, 'storage', 'framework', 'views'),
  path.join(stagingBackendDir, 'storage', 'logs'),
  path.join(stagingBackendDir, 'bootstrap', 'cache'),
]
for (const d of storageDirs) {
  fs.mkdirSync(d, { recursive: true })
}

// Remove unnecessary dev folders in backend
const backendNodeModules = path.join(stagingBackendDir, 'node_modules')
if (fs.existsSync(backendNodeModules)) {
  fs.rmSync(backendNodeModules, { recursive: true, force: true })
}
const backendGit = path.join(stagingBackendDir, '.git')
if (fs.existsSync(backendGit)) {
  fs.rmSync(backendGit, { recursive: true, force: true })
}

// 5. Exclude any nested zip files
console.log('🧹 Purging any nested zip files...')
execSync(`find "${STAGING_DIR}" -type f -name "*.zip" -delete || true`, { shell: '/bin/bash' })

// 6. Create the ZIP archive
console.log(`🗜️ Creating ZIP archive: ${ZIP_NAME}...`)
execSync(`zip -r -q "${ZIP_PATH}" . -x "*.zip" "*.git*"`, { cwd: STAGING_DIR, stdio: 'inherit' })

// 7. Cleanup staging directory
fs.rmSync(STAGING_DIR, { recursive: true, force: true })

const stats = fs.statSync(ZIP_PATH)
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
console.log(`\n🎉 Success! Server-ready zip created at: ${ZIP_PATH} (${sizeMB} MB)`)
console.log('🚀 Ready to upload directly to cPanel public_html! Zero commands needed on server.')
