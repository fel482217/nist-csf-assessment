#!/bin/bash
# Script to apply complete NIST CSF 2.0 data to database

echo "🚀 Applying complete NIST CSF 2.0 data..."

# Set token
export CLOUDFLARE_API_TOKEN="y7zbytJsoYc_HNof7aViHv_Nu39oPrXWsUL7FMLj"

# Apply category updates
echo "📊 Step 1/4: Updating categories..."
npx wrangler d1 execute nist-csf-db --remote --file=./migrations/0002_complete_nist_csf.sql.bak

# Apply complete subcategories
echo "📋 Step 2/4: Adding complete subcategories..."
npx wrangler d1 execute nist-csf-db --remote --file=./seed_complete_csf.sql

# Apply framework controls
echo "🔧 Step 3/4: Adding framework controls..."
npx wrangler d1 execute nist-csf-db --remote --file=./seed_frameworks_controls.sql

# Apply mappings
echo "🔗 Step 4/4: Creating framework mappings..."
npx wrangler d1 execute nist-csf-db --remote --file=./seed_mappings.sql

echo "✅ Complete! Data successfully applied to production database."
echo ""
echo "📊 Summary:"
echo "  - 23 NIST CSF 2.0 Categories"
echo "  - 100+ Subcategories with assessment questions"
echo "  - 93 ISO 27001:2022 Controls"
echo "  - 18 CIS Controls v8"
echo "  - 100+ Strategic mappings"
