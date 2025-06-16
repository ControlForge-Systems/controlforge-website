#!/bin/bash

echo "=== ControlForge SEO Setup Checker ==="
echo ""

# Check if site is accessible
echo "1. Checking main domain accessibility..."
curl -I -s https://controlforge.dev/ | head -n 1

echo ""
echo "2. Checking www redirect..."
curl -I -s https://www.controlforge.dev/ | head -n 3

echo ""
echo "3. Checking robots.txt..."
curl -s https://controlforge.dev/robots.txt

echo ""
echo "4. Checking sitemap.xml..."
curl -s https://controlforge.dev/sitemap.xml

echo ""
echo "5. Next steps to improve Google indexing:"
echo "   - Submit your sitemap to Google Search Console"
echo "   - Verify both controlforge.dev and www.controlforge.dev properties"
echo "   - Set up 301 redirects from www to non-www in your hosting provider"
echo "   - Request indexing for your main pages in Search Console"
echo "   - Check that your site is mobile-friendly"
echo ""
echo "6. Google Search Console URLs:"
echo "   - Main property: https://search.google.com/search-console"
echo "   - Submit sitemap: https://controlforge.dev/sitemap.xml"
echo ""
