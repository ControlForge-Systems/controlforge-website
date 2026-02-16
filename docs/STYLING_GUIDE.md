# ControlForge Website Styling Guide

## Brand Colors

### Primary Colors

- **Brand Blue**: `#008CFF` (Tailwind: `brand-blue`)
- **Brand Navy**: `#0A0F1F` (Tailwind: `brand-navy`)
- **Brand Gray**: `#E0E0E0` (Tailwind: `brand-gray`)

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
<button
	class="bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
></button>
```

**Note**: Use `hover:bg-blue-700` for darker hover state until brand-blue-dark is defined.

#### Secondary Button

```html
<button
	class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors shadow hover:shadow-lg"
></button>
```

#### Minimal Button (Terminal copy style)

```html
<button
	class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-px rounded flex items-center space-x-1 transition-colors duration-150"
	style="min-height: auto;"
></button>
```

### Links

- **Primary**: `text-brand-blue hover:text-blue-700`
- **Navigation**: `text-white hover:text-gray-300` (on dark backgrounds)
- **Footer**: `text-gray-600 hover:text-brand-blue`

### Cards and Containers

```html
<div class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg"></div>
```

### Terminal/Code Blocks

```html
<div class="bg-gray-900 rounded-lg p-3 relative">
	<!-- Dark terminal style with white text -->
	<code class="text-gray-100 font-mono"></code>
</div>
```

### Alerts/Callouts

```html
<!-- Info -->
<div class="bg-blue-50 border-l-4 border-brand-blue p-6">
	<p class="text-blue-800">
		<!-- Success -->
	</p>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<p class="text-green-700">
			<!-- Warning -->
		</p>

		<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
			<p class="text-yellow-700"></p>
		</div>
	</div>
</div>
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

All interactive elements have global focus styles defined in `app.css`:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
	outline: 2px solid #008cff;
	outline-offset: 2px;
	border-radius: 4px;
}
```

For custom focus styles on specific components:

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

## Configuration

### Tailwind v4 Setup

Project uses Tailwind v4 via Vite plugin configured in `vite.config.ts`:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

### Brand Colors

Define custom colors in `src/app.css` using `@theme` directive:

```css
@import 'tailwindcss';

@theme {
	--color-brand-blue: #008cff;
	--color-brand-navy: #0a0f1f;
	--color-brand-gray: #e0e0e0;
}
```

Use in components as Tailwind classes:

- `bg-brand-blue`, `text-brand-blue`, `border-brand-blue`
- `bg-brand-navy`, `text-brand-navy`
- `bg-brand-gray`, `text-brand-gray`

### Global Styles

`src/app.css` includes base styles:

- Font family: Inter with system fallbacks
- Accessibility: 44px min touch targets
- Focus styles: 2px brand-blue outline with offset
- Smooth scrolling enabled

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

**Don't hardcode colors**: Use Tailwind classes (e.g., `bg-brand-blue`, `text-gray-900`)

**Don't skip responsive**: Always consider mobile-first design

**Don't forget accessibility**: Global focus states are set, but test interactivity

**Don't use inline styles**: Use Tailwind classes (exceptions: dynamic heights, specific overrides with clear comments)

---

_This guide is the authoritative source for all styling decisions. Reference before making any UI changes._
