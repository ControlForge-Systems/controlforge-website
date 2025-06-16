<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let code: string = '';
  export let title: string = '';
  export let height: string = '300px';
  export let readonly: boolean = true;
  
  let container: HTMLDivElement;
  let editor: any;
  let monaco: any;
  
  onMount(() => {
    if (!browser) return;
    
    const initEditor = async () => {
      try {
        // Dynamically import Monaco Editor
        monaco = await import('monaco-editor');
        
        // Configure Structured Text language
        monaco.languages.register({ id: 'st' });
        
        // Define Structured Text syntax highlighting
        monaco.languages.setMonarchTokensProvider('st', {
          tokenizer: {
            root: [
              // Comments
              [/\/\*/, 'comment', '@comment'],
              [/\/\/.*$/, 'comment'],
              [/\(\*/, 'comment', '@comment_paren'],
              
              // Keywords
              [/\b(IF|THEN|ELSE|ELSIF|END_IF|CASE|OF|END_CASE|FOR|TO|BY|DO|END_FOR|WHILE|END_WHILE|REPEAT|UNTIL|END_REPEAT)\b/, 'keyword'],
              [/\b(VAR|VAR_INPUT|VAR_OUTPUT|VAR_IN_OUT|VAR_GLOBAL|VAR_EXTERNAL|END_VAR)\b/, 'keyword'],
              [/\b(FUNCTION|FUNCTION_BLOCK|PROGRAM|END_FUNCTION|END_FUNCTION_BLOCK|END_PROGRAM)\b/, 'keyword'],
              [/\b(AND|OR|NOT|XOR|MOD|DIV)\b/, 'keyword'],
              [/\b(TRUE|FALSE)\b/, 'keyword'],
              
              // Data types
              [/\b(BOOL|BYTE|WORD|DWORD|LWORD|SINT|USINT|INT|UINT|DINT|UDINT|LINT|ULINT|REAL|LREAL|TIME|DATE|TIME_OF_DAY|DATE_AND_TIME|STRING|WSTRING)\b/, 'type'],
              [/\b(AT|ARRAY|STRUCT|END_STRUCT)\b/, 'type'],
              
              // Numbers
              [/\b\d+\.\d*([eE][\-+]?\d+)?\b/, 'number.float'],
              [/\b\d+[eE][\-+]?\d+\b/, 'number.float'],
              [/\b\d+\b/, 'number'],
              [/\b16#[0-9A-Fa-f]+\b/, 'number.hex'],
              [/\b2#[01]+\b/, 'number.binary'],
              
              // Strings
              [/'([^'\\\\]|\\\\.)*'/, 'string'],
              [/"([^"\\\\]|\\\\.)*"/, 'string'],
              
              // Operators
              [/:=/, 'operator'],
              [/[=<>!]=?/, 'operator'],
              [/[+\-*\/]/, 'operator'],
              [/[&|^~]/, 'operator'],
              
              // Delimiters
              [/[{}()\[\]]/, '@brackets'],
              [/[;,.]/, 'delimiter'],
              
              // Identifiers
              [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
            ],
            
            comment: [
              [/[^\/*]+/, 'comment'],
              [/\*\//, 'comment', '@pop'],
              [/[\/*]/, 'comment']
            ],
            
            comment_paren: [
              [/[^(*]+/, 'comment'],
              [/\*\)/, 'comment', '@pop'],
              [/[(*]/, 'comment']
            ]
          }
        });
        
        // Set theme
        monaco.editor.defineTheme('st-theme', {
          base: 'vs',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
            { token: 'type', foreground: '2B91AF', fontStyle: 'bold' },
            { token: 'comment', foreground: '008000', fontStyle: 'italic' },
            { token: 'string', foreground: 'A31515' },
            { token: 'number', foreground: '098658' },
            { token: 'operator', foreground: '000000' },
          ],
          colors: {
            'editor.background': '#FAFAFA',
            'editor.lineHighlightBackground': '#F0F0F0',
            'editorLineNumber.foreground': '#237893',
          }
        });
        
        // Create editor
        editor = monaco.editor.create(container, {
          language: 'st',
          theme: 'st-theme',
          value: code,
          readOnly: readonly,
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbersMinChars: 3, // Reduce space for line numbers
          glyphMargin: false, // Disable the glyph margin
          lineDecorationsWidth: 1, // Minimize space for line decorations
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto'
          },
          wordWrap: 'on',
          contextmenu: false,
        });
        
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
      }
    };
    
    initEditor();
    
    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  });

  // Reactive statement to update editor content when 'code' prop changes
  $: if (browser && editor && code !== editor.getValue()) {
    editor.setValue(code);
  }
</script>

{#if title}
  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
    <h4 class="text-sm font-medium text-gray-700">{title}</h4>
  </div>
{/if}

<div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
  <div bind:this={container} style="height: {height}; width: 100%;"></div>
</div>

<style>
  /* Ensure Monaco Editor styles don't conflict */
  :global(.monaco-editor) {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
  }
</style>
