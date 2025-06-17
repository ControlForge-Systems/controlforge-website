# ControlForge Website Styling Guide

## Brand Colors

### Primary Colors
- **Brand Blue**: `#008CFF` (CSS var: `--control-blue`, Tailwind: `brand-blue`)
- **Brand Navy**: `#0A0F1F` (CSS var: `--midnight-navy`, Tailwind: `brand-navy`)
- **Pure White**: `#FFFFFF` (CSS var: `--pure-white`)
- **Steel Gray**: `#E0E0E0` (CSS var: `--steel-gray`, Tailwind: `brand-gray`)

### Semantic Gray Scale
- **Text Primary**: `text-gray-900` (headings, primary content)
- **Text Secondary**: `text-gray-600` (descriptions, subtitles)
- **Text Muted**: `text-gray-400` (labels, metadata)
- **Background Light**: `bg-gray-50` (code blocks, subtle backgrounds)
- **Background Medium**: `bg-gray-100` (cards, sections)
- **Background Dark**: `bg-gray-800` (headers, dark sections)
- **Background Darkest**: `bg-gray-900` (navigation, terminal)

## Typography

### Font Family
- **Primary**: `'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
- **Monospace**: System monospace fonts for code

### Heading Hierarchy
```css
h1: text-3xl font-bold text-gray-900 (48px)
h2: text-2xl font-semibold text-gray-800 (24px)
h3: text-xl font-semibold text-gray-800 (20px)
h4: text-lg font-medium text-gray-800 (18px)
```

### Responsive Text Sizing
Use responsive patterns:
- `text-xl xs:text-2xl sm:text-3xl` for main headings
- `text-lg xs:text-xl sm:text-2xl` for section headings
- `text-sm xs:text-base` for body text

### Body Text
- **Primary**: `text-gray-700` or `text-gray-900`
- **Secondary**: `text-gray-600`
- **Muted**: `text-gray-400`

## Component Patterns

### Buttons

#### Primary Button (CTA)
```html
<button class="bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
```

#### Secondary Button
```html
<button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors shadow hover:shadow-lg">
```

#### Minimal Button (Terminal copy style)
```html
<button class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-px rounded flex items-center space-x-1 transition-colors duration-150" style="min-height: auto;">
```

### Links
- **Primary**: `text-brand-blue hover:text-blue-700`
- **Navigation**: `text-white hover:text-gray-300` (on dark backgrounds)
- **Docs**: `text-blue-600 hover:text-blue-800`

### Cards and Containers
```html
<div class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
```

### Terminal/Code Blocks
```html
<div class="bg-gray-900 rounded-lg p-3 relative">
  <!-- Dark terminal style with white text -->
  <code class="text-gray-100 font-mono">
```

### Alerts/Callouts
```html
<!-- Info -->
<div class="bg-blue-50 border-l-4 border-brand-blue p-6">
  <p class="text-blue-800">

<!-- Success -->
<div class="bg-green-50 border border-green-200 rounded-lg p-6">
  <p class="text-green-700">

<!-- Warning -->
<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
  <p class="text-yellow-700">
```

## Spacing System

### Standard Spacing
- **Section margins**: `mb-6 sm:mb-8`
- **Element margins**: `mb-4 sm:mb-6`
- **Small margins**: `mb-2 sm:mb-3`
- **Container padding**: `p-4 sm:p-6`
- **Tight padding**: `p-3`

### Responsive Spacing
Always use responsive spacing:
- Mobile: smaller spacing
- Desktop: larger spacing
- Pattern: `mb-4 sm:mb-6` or `p-3 sm:p-4`

## Layout Patterns

### Container Widths
- **Main content**: `max-w-4xl mx-auto`
- **Prose content**: `max-w-none` (with prose class)
- **Full width**: `w-full`

### Responsive Design
- **Mobile first**: Start with mobile styles
- **Breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- **Navigation**: Show hamburger on `< md`, full nav on `>= md`

## Interactive States

### Hover Effects
- **Buttons**: Color change + shadow + slight scale
- **Links**: Color change only
- **Cards**: Subtle shadow increase

### Focus States
```css
focus:outline-2 focus:outline-brand-blue focus:outline-offset-2
```

### Transitions
- **Standard**: `transition-colors duration-150`
- **Transform**: `transition-all duration-200`
- **Hover effects**: `hover:shadow-xl transform hover:scale-105`

## Accessibility

### Minimum Touch Targets
- **Buttons**: `min-height: 44px, min-width: 44px`
- **Mobile nav items**: `min-height: 44px`

### Color Contrast
- Ensure all text meets WCAG AA standards
- Test against brand colors
- Use sufficient contrast for interactive elements

## Component-Specific Patterns

### Navigation
- **Header height**: `h-16`
- **Logo max height**: `max-h-10` (40px)
- **Mobile menu**: `bg-gray-800` with `border-t border-gray-700`

### VS Code Demo
- **Header**: `bg-gray-800` with traffic light buttons
- **Tabs**: `bg-gray-700` with active state `bg-gray-800`
- **Content**: Light background with Monaco editor

### Terminal
- **Background**: `bg-gray-900`
- **Text**: `text-gray-100`
- **Prompt**: `text-green-400`
- **Buttons**: Subtle gray with minimal padding

## File Organization

### CSS Variables
Define in `/src/app.css`:
```css
:root {
  --control-blue: #008CFF;
  --midnight-navy: #0A0F1F;
  --pure-white: #FFFFFF;
  --steel-gray: #E0E0E0;
}
```

### Tailwind Config
Extend in `tailwind.config.js`:
```js
colors: {
  'brand-blue': '#008CFF',
  'brand-navy': '#0A0F1F',
  'brand-gray': '#E0E0E0',
}
```

## Common Anti-Patterns to Avoid

❌ **Don't mix color systems**: Use either Tailwind grays OR custom brand colors consistently
❌ **Don't hardcode colors**: Use CSS variables and Tailwind classes
❌ **Don't skip responsive**: Always consider mobile-first design
❌ **Don't forget accessibility**: Include focus states and proper contrast
❌ **Don't use inline styles**: Use Tailwind classes or CSS variables

---

*This guide is the authoritative source for all styling decisions. Reference before making any UI changes.*
