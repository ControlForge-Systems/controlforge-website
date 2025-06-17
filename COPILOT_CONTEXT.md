# COPILOT_CONTEXT.md

<!-- Essential context for GitHub Copilot when working on the ControlForge website -->

## Project Overview
ControlForge website built with SvelteKit for showcasing VS Code extension for IEC 61131-3 Structured Text programming.

## 📚 Documentation Hub
**ALL project documentation is in `/docs/` folder** - [Browse Documentation Index](./docs/README.md)

## 🚨 Critical References

### Before ANY Styling Changes
- **[docs/STYLING_GUIDE.md](./docs/STYLING_GUIDE.md)** ⭐ **ALWAYS REFERENCE**
  - Brand colors, typography, component patterns, accessibility

### For Feature Development
- [docs/VS_CODE_INTEGRATION.md](./docs/VS_CODE_INTEGRATION.md) - Extension integration
- [docs/IEC61131_SPECIFICATION.md](./docs/IEC61131_SPECIFICATION.md) - Language specs

### For Production Deployment
- [docs/PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md) ⭐ **REQUIRED**
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment procedures

## ⚡ Quick Reference

### Brand Colors
```css
--control-blue: #008CFF     /* Primary brand color */
--midnight-navy: #0A0F1F    /* Dark backgrounds */  
--steel-gray: #E0E0E0       /* Subtle accents */
```

### Component Patterns
```css
/* Primary Button */
.btn-primary { @apply bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-2 focus:outline-brand-blue; }

/* Card Container */
.card { @apply border border-gray-300 rounded-lg bg-white shadow-lg; }

/* Terminal Style */
.terminal { @apply bg-gray-900 rounded-lg p-3 text-gray-100 font-mono; }
```

### File Structure
```
src/
├── lib/components/          # Reusable components  
├── routes/                  # SvelteKit pages
└── app.css                 # Global styles + CSS variables

docs/                       # All documentation
├── STYLING_GUIDE.md        # PRIMARY STYLE REFERENCE ⭐
├── README.md               # Documentation index
└── ...                     # Other guides
```

## ⚠️ Important Notes
- **UI Changes**: ALWAYS check `docs/STYLING_GUIDE.md` for approved patterns
- **Deployments**: Complete `docs/PRODUCTION_CHECKLIST.md` before release
- **Component Development**: Follow established patterns in existing components
