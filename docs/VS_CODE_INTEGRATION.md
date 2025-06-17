# VS Code Integration Components

> Guide for using VS Code-like components in the ControlForge documentation

## Available Components

### 1. CodeExample Component (`CodeExample.svelte`)
Monaco Editor-based component for syntax highlighting:
- Structured Text syntax highlighting
- Custom theme matching the extension
- Lightweight and fast loading

**Usage:**
```svelte
<CodeExample 
  title="Timer Example"
  code={`PROGRAM Main
VAR
  Timer1: TON;
END_VAR
Timer1(IN := TRUE, PT := T#5s);
END_PROGRAM`}
  height="200px"
/>
```

### 2. VSCodeDemo Component (`VSCodeDemo.svelte`)
Complete VS Code interface simulation:
- VS Code-style window with controls
- Multiple file tabs
- Status bar with extension info

**Usage:**
```svelte
<VSCodeDemo 
  title="ControlForge Extension Demo"
  height="500px"
  files={[
    {name: 'main.st', content: '...', active: true},
    {name: 'functions.st', content: '...'}
  ]}
---

## Implementation Setup

### Dependencies
```bash
npm install monaco-editor
```

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['monaco-editor']
  },
  define: {
    global: 'globalThis'
  }
});
```

### Usage in Pages
```svelte
<script lang="ts">
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<CodeExample 
  title="Your Example"
  code="// Your Structured Text code here"
  height="300px"
/>
```

---

## Language Features

### Structured Text Support
- **Keywords**: `IF`, `THEN`, `ELSE`, `FOR`, `WHILE`, `FUNCTION`, etc.
- **Data types**: `BOOL`, `INT`, `REAL`, `STRING`, etc.
- **Operators**: `:=`, `AND`, `OR`, `NOT`, etc.
- **Comments**: `//` and `(* ... *)`
- **Number formats**: decimal, hexadecimal (`16#`), binary (`2#`)

### Custom Theme
- Blue keywords
- Green comments  
- Red strings
- Matches ControlForge extension appearance

---

## Usage Guidelines

### When to Use Each Component
- **CodeExample**: Most code snippets (lightweight and reliable)
- **VSCodeDemo**: Feature showcases and extension capabilities

### Best Practices
- Keep code examples concise and focused
- Provide clear titles for examples
- Use appropriate heights for visibility
- Focus on specific concepts per example

---

*These components provide interactive code examples that enhance the documentation experience.*
