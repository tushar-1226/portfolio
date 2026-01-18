# Environment Variables Setup

## Required Environment Variables

### Local Development

Create a `.env.local` file in the root directory:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

### Production Deployment (Vercel)

**CRITICAL:** Your contact form won't work in production without this!

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Production, Preview, Development (check all)

4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Getting a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use `onboarding@resend.dev` for testing)
3. Go to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `re_`)

## Testing the Contact Form

### Locally
```bash
npm run dev
```
Visit `http://localhost:3000/#contact` and submit a test message.

### Production
After setting the environment variable in Vercel and redeploying, test the contact form on your live site.

## Troubleshooting

**Contact form shows "Email service is currently unavailable":**
- Check that `RESEND_API_KEY` is set in Vercel environment variables
- Verify the API key is valid in your Resend dashboard
- Make sure you've redeployed after adding the environment variable

**Emails not arriving:**
- Check your Resend dashboard for delivery logs
- Verify the recipient email: `rockeytushar17@gmail.com`
- Check spam folder
- Ensure your domain is verified in Resend (or use their test sender)

## Alternative: Use WhatsApp Instead

If email setup is too complex, users can click the "WhatsApp" tab in the contact form to send messages via WhatsApp directly to: **+91 7668839824**
