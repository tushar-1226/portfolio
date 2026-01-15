# Vercel Deployment Checklist

##  Pre-Deployment Checklist

### 1. Build Status
- [x] Production build works: `npm run build` 
- [x] No build errors
- [x] TypeScript types valid
- [x] ESLint warnings (minor, non-blocking)

### 2. Environment Variables
**Required in Vercel:**
- `RESEND_API_KEY` = `re_2Rw1EfNm_KRfcj6MMQM3qvCj8w8NG17y2`

### 3. Code Updates for Production
- [x] Removed hardcoded localhost URLs
- [x] Backend fallback only in development
- [x] Production uses Next.js API only

### 4. Email Configuration
- [x] Resend API configured
- [x] Recipient email: `rockeytushar17@gmail.com`
- [x] Sender: `Portfolio Contact <onboarding@resend.dev>`

### 5. WhatsApp Configuration
- [x] WhatsApp number: `+91 7668839824`
- [x] No server-side dependencies

---

##  Vercel Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   cd /home/tushar/Downloads/Dev/portfolio
   
   # Initialize git if not done
   git init
   git add .
   git commit -m "Initial commit - Portfolio with Email/WhatsApp integration"
   
   # Create GitHub repo and push
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to: https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings 

3. **Add Environment Variables:**
   - In Vercel project settings
   - Go to: Settings → Environment Variables
   - Add:
     - Name: `RESEND_API_KEY`
     - Value: `re_2Rw1EfNm_KRfcj6MMQM3qvCj8w8NG17y2`
     - Environment: Production, Preview, Development

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live! 

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
cd /home/tushar/Downloads/Dev/portfolio
vercel

# Deploy to production
vercel --prod
```

During deployment, you'll be asked:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **portfolio** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **No**

Then add environment variable:
```bash
vercel env add RESEND_API_KEY
# Paste: re_2Rw1EfNm_KRfcj6MMQM3qvCj8w8NG17y2
# Select: Production, Preview, Development
```

---

##  Post-Deployment Verification

### 1. Check Deployment Status
- Visit your Vercel dashboard
- Check build logs for errors
- Verify deployment is "Ready"

### 2. Test Email Integration
1. Visit your live site (e.g., `https://your-portfolio.vercel.app`)
2. Go to Contact section
3. Select "Email"
4. Fill and submit form
5. Check `rockeytushar17@gmail.com` inbox

### 3. Test WhatsApp Integration
1. Visit contact section
2. Select "WhatsApp"
3. Fill form
4. Click "Continue to WhatsApp"
5. Verify WhatsApp opens correctly

### 4. Test on Mobile
- Test responsive design
- Test both contact methods
- Check all sections load

---

##  Vercel Auto-Configuration

Vercel automatically handles:
-  Framework Detection (Next.js)
-  Build Command: `npm run build`
-  Output Directory: `.next`
-  Install Command: `npm install`
-  Node.js version: Auto-detected
-  Environment variables from `.env.local`
-  Serverless Functions (API routes)
-  Edge Network CDN
-  Automatic HTTPS
-  Custom domain support

---

## Custom Domain Setup (Optional)

1. **Add Domain in Vercel:**
   - Project Settings → Domains
   - Add your domain (e.g., `yourname.com`)

2. **Update DNS:**
   - Add DNS records as shown by Vercel
   - Wait for propagation (5-60 minutes)

3. **SSL Certificate:**
   - Vercel auto-provisions SSL
   - Your site will be HTTPS

---

##  Important Production Settings

### Update Resend for Production
Currently, emails only go to `rockeytushar17@gmail.com` (free tier).

**To send to any email address:**
1. Go to: https://resend.com/domains
2. Add your custom domain
3. Add DNS records
4. Verify domain
5. Update email API from address:
   ```typescript
   from: 'Contact <contact@yourdomain.com>'
   ```

### Update Metadata
Add to `app/layout.tsx` or `app/metadata.ts`:
```typescript
export const metadata = {
  metadataBase: new URL('https://your-portfolio.vercel.app'),
  // ... other metadata
}
```

---

##  Monitoring & Analytics

### Vercel Analytics (Optional)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

##  Troubleshooting

### Build Fails
- Check build logs in Vercel
- Test locally: `npm run build`
- Check Node.js version compatibility

### Email Not Sending
- Verify `RESEND_API_KEY` in Vercel env vars
- Check Resend dashboard for errors
- Ensure recipient is `rockeytushar17@gmail.com`

### WhatsApp Not Working
- No server dependencies needed
- Should work immediately
- Check popup blockers

### 404 Errors
- Check file structure
- Verify routes in `app/` directory
- Check Vercel deployment logs

---

##  What's Deployed

### Frontend (Vercel)
-  Next.js 15 app
-  Email integration (Resend)
-  WhatsApp integration
-  All components & pages
-  Optimized for production

### Backend (Not Deployed)
-  Python backend (`/backend`) not deployed
- Not needed - Next.js API handles everything
- Only used in local development

### APIs Available
-  `/api/contact` - Email/WhatsApp handler
-  `/sitemap.xml` - SEO sitemap
-  All other Next.js routes

---

##  Quick Deploy Commands

```bash
# Option 1: Via Vercel CLI
vercel --prod

# Option 2: Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
# Auto-deploys if connected to Vercel

# Check deployment status
vercel ls
```

---

##  Deployment Ready Status

**Your portfolio is 100% ready for Vercel deployment!**

-  Build passes
-  No hardcoded URLs
-  Environment variables documented
-  Email integration configured
-  WhatsApp integration ready
-  Production optimizations enabled
-  No backend dependencies needed

**Just deploy and it will work! **

---

##  Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Resend Docs**: https://resend.com/docs
- **Your Vercel Dashboard**: https://vercel.com/dashboard

---

**Last Updated**: January 14, 2026
**Status**:  READY TO DEPLOY
