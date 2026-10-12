# Server Ready ZIP Deployment Standards

Whenever the user asks to "make server ready zip", "make server zip", or create a deployment archive:

1. **Zero-Command Server Deployment**:
   - Pre-build the Next.js static export using `npm run build` so output is in `out/`.
   - Ensure `out/.htaccess` exists for cPanel/Apache clean URL routing and caching headers.
   - Include the complete `backend/` folder fully pre-packaged (with `vendor/` included so no `composer install` is required on the server).
   - Copy `backend/.env.production` to `backend/.env` inside the deployment bundle so production settings are preset.

2. **Zip Structure**:
   - Root of Zip: All contents of `out/` (HTML, CSS, JS, `_next`, images, upload assets, `.htaccess`).
   - `backend/` folder in Zip: Pre-configured Laravel backend with `vendor/`, `storage/`, `routes/`, `database/`, `.env`.

3. **Exclude Zip Files**:
   - Exclude all existing `*.zip` files in the directory so they are never nested inside the new zip file.
