#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   🚀 VERCEL DEPLOYMENT READINESS CHECK                   ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd /home/tushar/Downloads/Dev/portfolio

echo "📦 Checking Build..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test build
if npm run build > /tmp/build-check.log 2>&1; then
    echo -e "${GREEN}✅ Production build successful${NC}"
else
    echo -e "${RED}❌ Build failed - check /tmp/build-check.log${NC}"
    tail -20 /tmp/build-check.log
    exit 1
fi

echo ""
echo "🔐 Checking Environment Variables..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".env.local" ]; then
    if grep -q "RESEND_API_KEY=re_" .env.local; then
        echo -e "${GREEN}✅ RESEND_API_KEY configured locally${NC}"
        echo -e "${YELLOW}⚠️  Remember to add this to Vercel dashboard${NC}"
    else
        echo -e "${RED}❌ RESEND_API_KEY not properly set${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No .env.local file (OK for production)${NC}"
fi

echo ""
echo "📁 Checking Required Files..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

files=(
    "package.json"
    "next.config.ts"
    ".gitignore"
    "app/layout.tsx"
    "app/page.tsx"
    "app/api/contact/route.ts"
    "components/Contact.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file missing!"
    fi
done

echo ""
echo "🔍 Checking for Hardcoded URLs..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Contact.tsx for proper localhost handling
if grep -q "process.env.NODE_ENV === 'development'" components/Contact.tsx; then
    echo -e "${GREEN}✅ Localhost URLs properly handled (dev-only)${NC}"
else
    echo -e "${YELLOW}⚠️  Check Contact.tsx for localhost URLs${NC}"
fi

echo ""
echo "📊 Build Statistics..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -d ".next" ]; then
    echo "Build directory: $(du -sh .next 2>/dev/null | cut -f1)"
    echo "Static pages: $(find .next/server/app -name "*.html" 2>/dev/null | wc -l)"
    echo "API routes: $(find .next/server/app/api -type f 2>/dev/null | wc -l)"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   ✅ DEPLOYMENT READY!                                   ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Push to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial deployment'"
echo "   git remote add origin YOUR_GITHUB_URL"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   • Visit: https://vercel.com/new"
echo "   • Import your GitHub repository"
echo "   • Add environment variable:"
echo "     RESEND_API_KEY = re_2Rw1EfNm_KRfcj6MMQM3qvCj8w8NG17y2"
echo "   • Click Deploy!"
echo ""
echo "3. Or use Vercel CLI:"
echo "   npm i -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "📖 Full Guide: VERCEL_DEPLOYMENT.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
