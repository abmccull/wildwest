#!/bin/bash

echo "🚀 Wild West Construction SEO Platform Setup"
echo "==========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    npm install --save-dev tsx
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Get your Supabase credentials from https://supabase.com"
echo "   - Create a new project"
echo "   - Go to Settings > API"
echo "   - Copy the Project URL and anon key"
echo "   - Copy the service_role key (keep this secret!)"
echo ""
echo "2. Update .env.local with your Supabase credentials:"
echo "   - NEXT_PUBLIC_SUPABASE_URL=your_project_url"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key"
echo "   - SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
echo ""
echo "3. Run the database migration in Supabase SQL editor:"
echo "   - Copy contents of supabase/migrations/001_initial_schema.sql"
echo "   - Paste in Supabase SQL editor and run"
echo ""
echo "4. Seed the database with 1,140 pages:"
echo "   npm run seed"
echo ""
echo "5. Start the development server:"
echo "   npm run dev"
echo ""
echo "6. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "✨ Your Wild West Construction SEO platform is ready!"
echo ""
echo "Business Information Configured:"
echo "- Name: Wild West Construction"
echo "- Phone: (801) 691-4065"
echo "- Email: info@wildwestslc.com"
echo "- Address: 4097 S 420 W Murray, UT 84123"
echo "- WhatsApp: https://wa.me/18016914065"
echo ""
echo "Total Pages to Generate:"
echo "- 15 Salt Lake County city hub pages"
echo "- 1,125 keyword-specific pages (15 cities × 3 services × 25 keywords)"
echo "- Total: 1,140 SEO-optimized pages"