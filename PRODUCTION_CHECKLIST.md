# ControlForge Website - Production Release Checklist

> **Use this checklist before every production deployment to ensure quality and reliability.**

## 📋 Pre-Release Checklist

### 🔍 **Content & Copy Review**
- [ ] All text content is accurate and up-to-date
- [ ] Extension version numbers match current release
- [ ] Contact information is correct (hello@controlforge.dev)
- [ ] GitHub repository links are working and pointing to correct repos
- [ ] VS Code Marketplace links are functional
- [ ] All URLs and external links are valid and accessible
- [ ] Copyright year is current (2025)
- [ ] Company name and branding is consistent throughout

### 🎨 **Visual & UI Testing**
- [ ] All images load correctly and are optimized
- [ ] Logo and extension icon display properly at all sizes
- [ ] Screenshot (`screen_print.png`) is current and representative
- [ ] Favicon appears correctly in browser tabs
- [ ] Color scheme and branding is consistent
- [ ] Typography and font rendering looks good
- [ ] All icons and SVGs render properly

### 📱 **Responsive Design Testing**
- [ ] Mobile devices (320px - 768px)
  - [ ] iPhone SE (375px)
  - [ ] iPhone 12/13/14 (390px)
  - [ ] Android phones (360px)
- [ ] Tablets (768px - 1024px)
  - [ ] iPad (768px)
  - [ ] iPad Pro (1024px)
- [ ] Desktop (1024px+)
  - [ ] Standard desktop (1920px)
  - [ ] Large screens (2560px+)
- [ ] Extension stats badges wrap properly on small screens
- [ ] Navigation and buttons are touch-friendly on mobile
- [ ] Text remains readable at all breakpoints

### ⚡ **Functionality Testing**
- [ ] "Open in VS Code" button works with `vscode:` protocol
- [ ] "View in Web Browser" marketplace link opens correctly
- [ ] Command line copy button functions properly
- [ ] Copy button shows correct feedback (Copied! state)
- [ ] All external links open in new tabs
- [ ] Email link (hello@controlforge.dev) opens mail client
- [ ] GitHub links lead to correct repositories
- [ ] All hover effects and animations work smoothly

### 📊 **Extension Metrics & Badges**
- [x] **Badge CORS issues fixed in nginx CSP config** ✅
- [ ] Downloads badge displays current count
- [ ] Rating badge shows accurate rating (removed per user request)
- [ ] GitHub stars count is updating
- [ ] Version badge reflects latest extension version
- [ ] Forks count is accurate (removed per user request)
- [ ] Last updated badge shows recent activity
- [ ] All badge URLs are correctly formatted:
  - [ ] `ControlForgeSystems.controlforge-structured-text` (marketplace)
  - [ ] `ControlForge-Systems/controlforge-structured-text` (GitHub)

### 🔗 **Link Validation**
- [ ] VS Code Marketplace: `https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text`
- [ ] GitHub Repository: `https://github.com/ControlForge-Systems/controlforge-structured-text`
- [ ] Project Roadmap: `https://github.com/orgs/ControlForge-Systems/projects/1`
- [ ] Issue Tracker: `https://github.com/ControlForge-Systems/controlforge-structured-text/issues`
- [ ] Command line extension ID: `controlforge.controlforge-structured-text`

### 🔒 **Security & SEO**
- [x] All external links have `rel="noopener noreferrer"` ✅
- [x] Meta descriptions are accurate and compelling ✅
- [x] Open Graph tags are properly set ✅
- [x] Twitter Card tags are configured ✅
- [x] Structured data (JSON-LD) is valid ✅
- [x] Page title includes relevant keywords ✅
- [x] Alt text is provided for all images ✅
- [x] Robots.txt allows proper indexing ✅
- [x] Sitemap.xml updated with all pages ✅

### 🚀 **Performance Testing**
- [ ] Page loads in under 3 seconds on desktop
- [ ] Page loads in under 5 seconds on mobile
- [ ] Images are optimized and using lazy loading
- [ ] No console errors in browser developer tools
- [x] **CORS/CSP issues resolved for external badge images** ✅
- [ ] Lighthouse score is 90+ for all categories
- [ ] Core Web Vitals are in "Good" range

### 🌐 **Browser Compatibility**
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 📝 **Code Quality**
- [x] HTML validates without errors ✅
- [x] CSS/Tailwind classes are used correctly ✅
- [x] JavaScript/Svelte components work without errors ✅
- [x] No unused dependencies in package.json ✅
- [x] Build process completes without warnings ✅
- [x] TypeScript compilation is clean ✅
- [x] Build warnings fixed (VSCodeDemo export property) ✅

### 🔧 **Build & Deployment**
- [x] `pnpm build` runs successfully ✅
- [x] Built files are generated in `/build` directory ✅
- [x] Static assets are copied correctly ✅
- [x] Nginx configuration is valid ✅
- [ ] SSL certificate is valid and up-to-date
- [ ] CDN/caching is configured properly

### 📈 **Analytics & Tracking**
- [ ] Google Tag Manager is properly configured
- [ ] Google Analytics tracking is working
- [ ] Event tracking for button clicks is functional
- [ ] Privacy policy compliance is maintained

### 🔄 **Post-Deployment Verification**
- [ ] Production site loads correctly
- [ ] All functionality works in production environment
- [ ] SSL certificate is active and valid
- [ ] DNS resolution is working properly
- [ ] CDN is serving content correctly
- [ ] Monitor for any error logs or issues

## 🆘 **Rollback Plan**
- [ ] Previous version is tagged in Git
- [ ] Database backup is available (if applicable)
- [ ] Rollback procedure is documented and tested
- [ ] Team knows how to execute emergency rollback

## 📞 **Emergency Contacts**
- **Developer**: Michael (primary maintainer)
- **Infrastructure**: homelab server
- **Domain/DNS**: [Your DNS provider]
- **Monitoring**: [Your monitoring service]

## 📅 **Release Notes Template**
```markdown
## Release v[VERSION] - [DATE]

### ✨ New Features
- 

### 🐛 Bug Fixes
- 

### 🔧 Improvements
- 

### 📊 Extension Stats
- Downloads: [current count]
- Rating: [current rating]
- Version: [extension version]
```

---

**✅ All items checked? Ready for production deployment!**

**Pre-deployment Validation:**
```bash
./scripts/pre-deployment-check.sh
```

**Deployment Command:**
```bash
pnpm prod:deploy
```

**Last Updated:** June 16, 2025  
**Checklist Version:** 1.1
**Pre-deployment Validation:** ✅ Passed (June 16, 2025)
