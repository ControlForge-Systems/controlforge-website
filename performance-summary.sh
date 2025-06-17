#!/bin/bash

echo "=== Image Optimization Results ==="
echo 

echo "Header Logo Optimization:"
echo "Before: $(ls -lh static/controlforge_horizontal_white_1434x359.png | awk '{print $5}')"
echo "After (PNG): $(ls -lh static/controlforge_horizontal_white_240x60.png | awk '{print $5}')"
echo "After (WebP): $(ls -lh static/controlforge_horizontal_white_240x60.webp | awk '{print $5}')"
echo

echo "Social Media Logo Optimization:"
echo "Before: $(ls -lh static/controlforge_logo_1024x1024.png | awk '{print $5}')"  
echo "After (WebP): $(ls -lh static/controlforge_logo_512x512_optimized.webp | awk '{print $5}')"
echo

echo "=== Bundle Sizes ==="
if [ -d "build/_app/immutable/chunks" ]; then
    echo "Largest JS chunks:"
    du -h build/_app/immutable/chunks/*.js | sort -hr | head -5
else
    echo "Build directory not found - run 'pnpm build:prod' first"
fi

echo
echo "=== Performance Optimizations Applied ==="
echo "✅ Image optimization (WebP format, proper sizing)"
echo "✅ Lazy loading with Intersection Observer"
echo "✅ Separate Monaco Editor chunk"
echo "✅ Enhanced gzip compression config"
echo "✅ Optimized Vite build configuration"
echo
echo "🚀 Ready to test with Lighthouse!"
echo "   Development: http://localhost:5173/"
echo "   Production: http://localhost:5172/ (after 'pnpm preview --port 5172')"
