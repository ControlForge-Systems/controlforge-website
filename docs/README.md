# ControlForge Documentation Hub

> 📚 Complete documentation and guidelines for the ControlForge website pro---

*This documentation provides the current state and standards for the ControlForge website. Always reference before making changes.*older contains all project documentation, development guidelines, and operational procedures. Reference these files before making any changes.

---

## 🎯 Quick Reference

### For Styling/UI Changes
1. **[STYLING_GUIDE.md](./STYLING_GUIDE.md)** ⭐ **REQUIRED READING**

### For Feature Development  
1. [VS_CODE_INTEGRATION.md](./VS_CODE_INTEGRATION.md)
2. [IEC61131_SPECIFICATION.md](./IEC61131_SPECIFICATION.md)

### For Production Deployment
1. [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) ⭐ **REQUIRED**
2. [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📋 Documentation Index

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[STYLING_GUIDE.md](./STYLING_GUIDE.md)** | Brand guidelines, component patterns, typography | ⭐ Every UI/style change |
| [VS_CODE_INTEGRATION.md](./VS_CODE_INTEGRATION.md) | VS Code component guidelines | Adding/modifying demos |
| [IEC61131_SPECIFICATION.md](./IEC61131_SPECIFICATION.md) | Technical language specification | Language-specific features |
| [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Pre-deployment validation | ⭐ Before every release |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment procedures | Production deployments |
| [CHUNK_OPTIMIZATION.md](./CHUNK_OPTIMIZATION.md) | Performance optimization | Build/performance issues |

---

## 🎨 Brand Standards (Quick Reference)

```css
/* Brand Colors */
--control-blue: #008CFF     /* Primary brand color */
--midnight-navy: #0A0F1F    /* Dark backgrounds */
--steel-gray: #E0E0E0       /* Subtle accents */

/* Component Patterns */
.btn-primary { @apply bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-2 focus:outline-brand-blue; }

.card { @apply border border-gray-300 rounded-lg bg-white shadow-lg; }

.terminal { @apply bg-gray-900 rounded-lg p-3 text-gray-100 font-mono; }
```

## 📱 Responsive Patterns

```css
/* Mobile-first responsive */
.responsive-text { @apply text-sm xs:text-base sm:text-lg; }
.responsive-spacing { @apply mb-4 sm:mb-6; }
.responsive-padding { @apply p-3 sm:p-4; }
```

---

## 🏗️ Project Architecture

### Tech Stack
- **Framework**: SvelteKit
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Build**: Vite with custom chunking
- **Deploy**: Docker + Nginx on homelab server

### Key Directories
```
src/
├── lib/components/          # Reusable UI components
├── routes/                  # SvelteKit pages & layouts
└── app.css                 # Global styles + CSS variables

docs/                       # This folder - all documentation
static/                     # Static assets (images, fonts, etc.)
```

### Core Components
- `Header.svelte` - Navigation with responsive menu
- `VSCodeDemo.svelte` - Interactive VS Code simulation  
- `CodeExample.svelte` - Monaco editor integration
- `Footer.svelte` - Site footer with branding

---

## 🚨 Critical Guidelines

### Before Making Changes
1. **Read relevant documentation** from the table above
2. **Check existing patterns** in `STYLING_GUIDE.md`
3. **Consider performance impact** per `CHUNK_OPTIMIZATION.md`

### Before Deployment
1. **Complete checklist** in `PRODUCTION_CHECKLIST.md`
2. **Follow procedures** in `DEPLOYMENT.md`
3. **Test all functionality** across devices

### Code Quality Standards
- ✅ Follow established component patterns
- ✅ Use approved brand colors and typography
- ✅ Implement proper focus states for accessibility
- ✅ Maintain mobile-first responsive design
- ✅ Include semantic HTML and ARIA labels

---

## � Need Help?

1. **Check documentation** - Most questions are answered here
2. **Reference existing code** - Follow established patterns
3. **Consult style guide** - Ensure brand consistency
4. **Test thoroughly** - Use the production checklist

---

*This documentation is maintained alongside the codebase. Update when making significant changes to project structure, styling systems, or development processes.*
