# Interactive VS Code Examples for ControlForge Documentation

This project demonstrates several approaches to embedding VS Code-like experiences in your documentation to showcase the ControlForge Structured Text extension.

## Available Components

### 1. CodeExample Component (`CodeExample.svelte`)
A Monaco Editor-based component that provides:
- Structured Text syntax highlighting
- Custom theme matching your extension
- Lightweight and fast loading
- No external dependencies

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
A complete VS Code interface simulation featuring:
- VS Code-style window with controls
- Multiple file tabs
- Status bar with extension info
- Feature indicators overlay

**Usage:**
```svelte
<VSCodeDemo 
  title="ControlForge Extension Demo"
  height="500px"
  files={[
    {name: 'main.st', content: '...', active: true},
    {name: 'functions.st', content: '...'}
  ]}
/>
```

### 3. VSCodeEmbed Component (`VSCodeEmbed.svelte`)
Embeds actual VS Code for the Web (with limitations):
- Real VS Code interface
- Limited extension support
- Requires internet connection

**Usage:**
```svelte
<VSCodeEmbed 
  height="400px"
  file="example.st"
  content="PROGRAM Main\nEND_PROGRAM"
/>
```

## Implementation in Your Documentation

### Step 1: Install Dependencies
```bash
npm install monaco-editor
```

### Step 2: Configure Vite
Update `vite.config.ts`:
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

### Step 3: Use in Your Pages
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

## Features

### Structured Text Language Support
The Monaco Editor is configured with a custom language definition for Structured Text that includes:
- Keywords: `IF`, `THEN`, `ELSE`, `FOR`, `WHILE`, `FUNCTION`, etc.
- Data types: `BOOL`, `INT`, `REAL`, `STRING`, etc.
- Operators: `:=`, `AND`, `OR`, `NOT`, etc.
- Comments: `//` and `(* ... *)`
- Number formats: decimal, hexadecimal (`16#`), binary (`2#`)

### Custom Theme
Matches the ControlForge extension's appearance with:
- Blue keywords
- Green comments
- Red strings
- Proper syntax highlighting colors

## Benefits

1. **Professional Appearance**: Provides a familiar VS Code interface that users recognize
2. **Interactive Learning**: Users can see syntax highlighting in action
3. **No Setup Required**: Works immediately without installing VS Code locally
4. **Offline Capable**: Monaco Editor works without internet (unlike web-based VS Code)
5. **Customizable**: Full control over appearance and features

## Best Practices

1. **Use CodeExample for most code snippets** - it's lightweight and reliable
2. **Use VSCodeDemo for feature showcases** - when you want to highlight extension capabilities
3. **Keep code examples concise** - focus on specific concepts
4. **Provide clear titles** - help users understand what each example demonstrates
5. **Use appropriate heights** - balance visibility with page layout

## Advanced Usage

### Custom File Sets for VSCodeDemo
```svelte
<VSCodeDemo 
  files={[
    {
      name: 'main.st',
      content: `PROGRAM MainLogic
VAR
  StartButton: BOOL;
  Motor: BOOL;
END_VAR

Motor := StartButton;
END_PROGRAM`,
      active: true
    },
    {
      name: 'functions.st', 
      content: `FUNCTION Add : INT
VAR_INPUT
  A, B: INT;
END_VAR
Add := A + B;
END_FUNCTION`
    }
  ]}
/>
```

### Interactive Examples with Multiple Files
This approach allows you to show how your extension handles different file types and provides context switching between related code files.

## Troubleshooting

### Monaco Editor Not Loading
- Ensure `monaco-editor` is installed
- Check Vite configuration includes Monaco in `optimizeDeps`
- Verify browser console for JavaScript errors

### Syntax Highlighting Issues
- Check that the language ID is set to 'st'
- Verify the tokenizer rules in `CodeExample.svelte`
- Ensure the theme is properly defined

### Performance Issues
- Reduce the number of simultaneous Monaco instances
- Use `readonly={true}` for display-only examples
- Consider lazy loading for pages with many examples

This documentation provides everything needed to add professional, interactive code examples to your ControlForge documentation site.
