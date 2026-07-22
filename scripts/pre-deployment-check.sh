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
    "static/_headers"
    "static/_redirects"
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
# Cloudflare Pages Configuration Validation
# =========================================
print_section "Cloudflare Pages Configuration"

# _headers and _redirects must reach the build output root to take effect
if [ -f "build/_headers" ]; then
    print_status "_headers present in build output" "OK"
else
    print_status "_headers missing from build output" "ERROR"
fi

if [ -f "build/_redirects" ]; then
    print_status "_redirects present in build output" "OK"
else
    print_status "_redirects missing from build output" "ERROR"
fi

# =========================================
# Security Validation
# =========================================
print_section "Security Validation"

security_headers=(
    "X-Content-Type-Options"
    "X-Frame-Options"
    "Strict-Transport-Security"
    "Content-Security-Policy"
    "Referrer-Policy"
)

for header in "${security_headers[@]}"; do
    if grep -q "$header" build/_headers 2>/dev/null; then
        print_status "$header configured" "OK"
    else
        print_status "$header missing from _headers" "ERROR"
    fi
done

# Check www -> apex canonical redirect
if grep -q "www.controlforge.dev" build/_redirects 2>/dev/null; then
    print_status "www -> apex redirect configured" "OK"
else
    print_status "www -> apex redirect not configured" "WARNING"
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
