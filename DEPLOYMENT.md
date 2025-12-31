# Cloudflare Pages Deployment Guide

## ✅ Deployment Compatibility

This project **CAN be deployed to Cloudflare Pages** for free. It's a static React SPA built with Vite.

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

The app requires a Gemini API key. Set it in Cloudflare Pages:

**Variable Name:** `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY`
**Value:** Your Gemini API key from https://aistudio.google.com/apikey

**How to set in Cloudflare Pages:**
1. Go to your project in Cloudflare Pages dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `VITE_GEMINI_API_KEY` with your API key value
4. Make sure it's available for **Production**, **Preview**, and **Development** environments

### 2. Build Configuration

**Build Command:** `npm run build`
**Build Output Directory:** `dist`
**Root Directory:** `/` (root of repository)

### 3. Node.js Version

Cloudflare Pages will automatically detect Node.js version from `package.json` or use the latest LTS. If needed, specify in `package.json`:

```json
"engines": {
  "node": ">=18.0.0"
}
```

## 🚀 Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard

1. **Connect Repository:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Build Settings:**
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty if repo root)

3. **Set Environment Variables:**
   - Add `VITE_GEMINI_API_KEY` with your Gemini API key
   - Save and deploy

### Option 2: Deploy via Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy (from project root)
npm run build
wrangler pages deploy dist --project-name=vyapaar-mitra
```

### Option 3: Deploy via GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: vyapaar-mitra
          directory: dist
```

## ⚠️ Security Considerations

### API Key Exposure

**IMPORTANT:** The Gemini API key will be **bundled into the client-side JavaScript**. This means:

- ✅ **Works:** The app will function correctly
- ⚠️ **Security Risk:** Anyone can view the API key in the browser's developer tools
- 💡 **Recommendation:** 
  - Use Google's API key restrictions (domain restrictions, IP restrictions)
  - Monitor API usage in Google Cloud Console
  - Consider implementing a backend proxy for production (not required for Cloudflare Pages)

### Google API Key Restrictions

To secure your API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your API key
4. Under **Application restrictions**, set:
   - **HTTP referrers** → Add your Cloudflare Pages domain
   - Example: `https://your-app.pages.dev/*`
5. Under **API restrictions**, restrict to **Generative Language API** only

## 📁 Project Structure

```
├── dist/              # Build output (deployed to Cloudflare)
├── public/
│   └── _redirects     # SPA routing configuration
├── src/               # Source files
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies
```

## 🔧 Troubleshooting

### Build Fails

- Check Node.js version (requires >= 18)
- Verify all dependencies are in `package.json`
- Check build logs in Cloudflare Pages dashboard

### API Not Working

- Verify `VITE_GEMINI_API_KEY` is set in Cloudflare Pages environment variables
- Check browser console for API errors
- Verify API key restrictions allow your domain

### 404 Errors on Routes

- Ensure `public/_redirects` file exists with: `/*    /index.html   200`
- This file is automatically copied to `dist/` during build

### Blank Page

- Check browser console for JavaScript errors
- Verify the build completed successfully
- Check that `index.html` has the correct script tag

## 📊 Free Tier Limits

Cloudflare Pages free tier includes:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Custom domains
- ✅ Preview deployments

## 🔗 Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Google Gemini API Docs](https://ai.google.dev/docs)

## ✅ Post-Deployment

After deployment:

1. Test the deployed app thoroughly
2. Set up API key restrictions in Google Cloud Console
3. Monitor API usage
4. Set up custom domain (optional)
5. Enable Cloudflare's security features (DDoS protection, etc.)

---

**Note:** This is a client-side only application. All data is stored in browser memory and will be lost on page refresh. For production use, consider adding a backend for data persistence.
