# Production Release Validation

> Pre-deployment validation tasks for ControlForge website releases.

## Content & Copy
- Verify extension version numbers match current release
- Check contact info (hello@controlforge.dev)
- Validate all external links functional
- Ensure branding consistency throughout

## Visual & UI
- Images load correctly and optimized
- Logo and favicon render properly
- Color scheme consistent
- Icons and SVGs display correctly

## Responsive Design
- Test mobile (320px-768px): iPhone SE, standard Android
- Test tablet (768px-1024px): iPad
- Test desktop (1024px+): standard desktop
- Navigation touch-friendly on mobile
- Text readable at all breakpoints

## Functionality
- VS Code protocol link works
- Marketplace link opens correctly
- Copy button functions with feedback
- External links open in new tabs
- Email link triggers mail client
- Monaco Editor loads code examples

## Link Validation
- VS Code Marketplace: `https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text`
- GitHub Repo: `https://github.com/ControlForge-Systems/controlforge-structured-text`
- Extension ID: `controlforge.controlforge-structured-text`

## Security & SEO
- External links have `rel="noopener noreferrer"`
- Meta descriptions accurate
- Open Graph tags set
- Structured data (JSON-LD) valid
- Alt text on images
- robots.txt/sitemap.xml updated

## Performance
- Desktop load < 3s
- Mobile load < 5s
- No console errors
- Lighthouse score 90+
- Core Web Vitals in "Good" range

## Browser Compatibility
- Chrome/Firefox/Safari/Edge (latest 2 versions)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Code Quality
- TypeScript compiles clean
- Build completes without warnings
- No unused dependencies
- Svelte components error-free

## Build & Deploy
- `pnpm build` succeeds
- Build files in `/build`
- Static assets copied
- Nginx config valid
- SSL cert valid

## Post-Deployment
- Production site loads
- All functionality works
- SSL active
- DNS resolves
- Monitor error logs

---

**Pre-deployment validation:**
```bash
./scripts/pre-deployment-check.sh
```

**Deploy:**
```bash
pnpm prod:deploy
```
