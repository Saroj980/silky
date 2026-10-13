const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting Server Export Build (Direct Laravel API)...')

// 3. Static export build (temporarily moving app/api since static export only builds HTML pages)
let apiMoved = false
const apiDir = path.join(__dirname, '..', 'app', 'api')
const tempApiDir = path.join(__dirname, '..', 'app', '_api_temp')

try {
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, tempApiDir)
    apiMoved = true
    console.log('📁 Temporarily moved app/api for static HTML export.')
  }

  console.log('⚡ Running next build with NEXT_EXPORT=true...')
  execSync('npx next build', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_EXPORT: 'true' }
  })
  console.log('✅ Next.js static build exported to out/ successfully!')
} finally {
  if (apiMoved && fs.existsSync(tempApiDir)) {
    fs.renameSync(tempApiDir, apiDir)
    console.log('📁 Restored app/api to normal state.')
  }
}

// 4. Mirror HTML files into folder/index.html so both /route and /route/ work on any web server
const outDir = path.join(__dirname, '..', 'out')

function mirrorHtmlAsFolderIndex(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith('_') && item.name !== 'backend') {
      mirrorHtmlAsFolderIndex(fullPath)
    } else if (item.isFile() && item.name.endsWith('.html') && item.name !== 'index.html' && item.name !== '404.html' && !item.name.startsWith('_')) {
      const folderName = item.name.replace(/\.html$/, '')
      const targetFolder = path.join(dir, folderName)
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true })
      }
      const targetIndex = path.join(targetFolder, 'index.html')
      fs.copyFileSync(fullPath, targetIndex)
    }
  }
}

mirrorHtmlAsFolderIndex(outDir)
console.log('📁 Mirrored all HTML pages to folder/index.html pairs for flawless URL routing.')

// 5. Ensure out/.htaccess exists with production rules
const htaccessPath = path.join(__dirname, '..', 'out', '.htaccess')
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
console.log('📄 Generated production-ready out/.htaccess.')
console.log('🎉 Server export ready in out/!')
