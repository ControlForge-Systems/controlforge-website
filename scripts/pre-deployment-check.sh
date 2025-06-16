#!/bin/bash

# =========================================
# ControlForge Website - Pre-deployment Validation Script
# =========================================

echo "🚀 ControlForge Website - Pre-deployment Validation"
echo "=================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    if [ "$2" = "OK" ]; then
        echo -e "✅ ${GREEN}$1${NC}"
    elif [ "$2" = "WARNING" ]; then
        echo -e "⚠️  ${YELLOW}$1${NC}"
        ((WARNINGS++))
    else
        echo -e "❌ ${RED}$1${NC}"
        ((ERRORS++))
    fi
}

print_section() {
    echo -e "\n${BLUE}📋 $1${NC}"
    echo "----------------------------------------"
}

# =========================================
# Build Validation
# =========================================
print_section "Build Validation"

if [ -d "build" ]; then
    print_status "Build directory exists" "OK"
else
    print_status "Build directory missing - run 'pnpm build' first" "ERROR"
    exit 1
fi

if [ -f "build/index.html" ]; then
    print_status "Main index.html exists" "OK"
else
    print_status "Main index.html missing" "ERROR"
fi

if [ -f "build/sitemap.xml" ]; then
    print_status "Sitemap exists" "OK"
else
    print_status "Sitemap missing" "ERROR"
fi

if [ -f "build/robots.txt" ]; then
    print_status "Robots.txt exists" "OK"
else
    print_status "Robots.txt missing" "ERROR"
fi

# =========================================
# File Structure Validation
# =========================================
print_section "File Structure Validation"

# Check for essential files
essential_files=(
    "package.json"
    "prod.compose.yml"
    "nginx/default.conf"
    ".gitignore"
)

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "$file exists" "OK"
    else
        print_status "$file missing" "ERROR"
    fi
done

# =========================================
# Content Validation
# =========================================
print_section "Content Validation"

# Check for ControlForge branding in main page
if grep -q "ControlForge" build/index.html; then
    print_status "ControlForge branding found in homepage" "OK"
else
    print_status "ControlForge branding missing from homepage" "ERROR"
fi

# Check for VS Code extension references
if grep -q "controlforge.controlforge-structured-text" build/index.html; then
    print_status "Extension ID found in homepage" "OK"
else
    print_status "Extension ID missing from homepage" "WARNING"
fi

# Check docs pages exist
docs_pages=(
    "docs.html"
    "docs/syntax.html"
    "docs/variables.html"
    "docs/functions.html"
    "docs/examples.html"
)

for page in "${docs_pages[@]}"; do
    if [ -f "build/$page" ]; then
        print_status "Documentation page $page exists" "OK"
    else
        print_status "Documentation page $page missing" "WARNING"
    fi
done

# =========================================
# SEO Validation
# =========================================
print_section "SEO Validation"

# Check for meta descriptions
if grep -q "meta name=\"description\"" build/index.html; then
    print_status "Meta description found" "OK"
else
    print_status "Meta description missing" "ERROR"
fi

# Check for Open Graph tags
if grep -q "property=\"og:" build/index.html; then
    print_status "Open Graph tags found" "OK"
else
    print_status "Open Graph tags missing" "ERROR"
fi

# Check for structured data
if grep -q "application/ld+json" build/index.html; then
    print_status "Structured data (JSON-LD) found" "OK"
else
    print_status "Structured data missing" "WARNING"
fi

# =========================================
# Asset Validation
# =========================================
print_section "Asset Validation"

# Check for essential images
images=(
    "controlforge_logo_1024x1024.png"
    "controlforge_ST_icon_1024x1024.png"
    "favicon-192x192.png"
    "favicon-512x512.png"
)

for image in "${images[@]}"; do
    if [ -f "build/$image" ]; then
        print_status "Image $image exists" "OK"
    else
        print_status "Image $image missing" "WARNING"
    fi
done

# =========================================
# Configuration Validation
# =========================================
print_section "Configuration Validation"

# Check nginx config
if nginx -t -c nginx/default.conf 2>/dev/null; then
    print_status "Nginx configuration valid" "OK"
else
    print_status "Nginx configuration has issues" "WARNING"
fi

# =========================================
# Security Validation
# =========================================
print_section "Security Validation"

# Check for security headers in nginx config
if grep -q "X-Content-Type-Options" nginx/default.conf; then
    print_status "Security headers configured in nginx" "OK"
else
    print_status "Security headers missing in nginx config" "ERROR"
fi

# Check for HTTPS redirect
if grep -q "return 301 https" nginx/default.conf; then
    print_status "HTTPS redirect configured" "OK"
else
    print_status "HTTPS redirect not configured" "WARNING"
fi

# =========================================
# Final Summary
# =========================================
print_section "Validation Summary"

echo "Total errors: $ERRORS"
echo "Total warnings: $WARNINGS"
echo ""

if [ $ERRORS -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}🎉 All checks passed! Ready for production deployment.${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠️  Validation completed with $WARNINGS warning(s). Review and deploy if acceptable.${NC}"
        exit 0
    fi
else
    echo -e "${RED}❌ Validation failed with $ERRORS error(s). Fix issues before deployment.${NC}"
    exit 1
fi
