<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  import { configureMonacoEnvironment, cleanupMonacoEnvironment } from '$lib/monaco-config';

  // Declare types for Monaco editor, to be populated after dynamic import
  type Monaco = typeof import('monaco-editor');
  type IStandaloneCodeEditor = import('monaco-editor').editor.IStandaloneCodeEditor;

  export let code: string = '';
  export let title: string = '';
  export let height: string = '300px';
  export let readonly: boolean = true;

  let container: HTMLDivElement;
  let editor: IStandaloneCodeEditor | undefined;
  let monacoInstance: Monaco | undefined;
  let editorInitialized = false;
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  let shouldInitialize = false;

  const initEditor = async () => {
    if (editorInitialized || !container) return; // Prevent double initialization

    try {
      // Configure Monaco environment to prevent 404 errors
      configureMonacoEnvironment();

      // Dynamically import Monaco Editor on the client side
      const monacoModule = await import('monaco-editor');
      
      // Assign the full Monaco module
      monacoInstance = monacoModule;
      
      if (!monacoInstance?.editor) {
        console.error('Failed to load Monaco Editor module.');
        return;
      }

      // Clear any existing content to prevent HTML rendering issues
      if (container) {
        container.innerHTML = '';
      }

      // Ensure code is clean text without HTML entities
      const cleanCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

      // Configure Structured Text language (only if not already registered)
      if (!monacoInstance.languages.getLanguages().some((lang: any) => lang.id === 'st')) {
        monacoInstance.languages.register({ id: 'st' });
        monacoInstance.languages.setMonarchTokensProvider('st', {
          tokenizer: {
            root: [
              // Comments
              [/\/\*/, 'comment', '@comment'],
              [/\/\/.*$/, 'comment'],
              [/\(\*/, 'comment', '@comment_paren'], 

              // Keywords (case-insensitive)
              [/\b(IF|THEN|ELSE|ELSIF|END_IF|CASE|OF|END_CASE|FOR|TO|BY|DO|END_FOR|WHILE|END_WHILE|REPEAT|UNTIL|END_REPEAT)\b/i, 'keyword'],
              [/\b(VAR|VAR_INPUT|VAR_OUTPUT|VAR_IN_OUT|VAR_GLOBAL|VAR_EXTERNAL|END_VAR)\b/i, 'keyword'],
              [/\b(FUNCTION|FUNCTION_BLOCK|PROGRAM|END_FUNCTION|END_FUNCTION_BLOCK|END_PROGRAM)\b/i, 'keyword'],
              [/\b(AND|OR|NOT|XOR|MOD|DIV)\b/i, 'keyword'],
              [/\b(TRUE|FALSE)\b/i, 'keyword'],

              // Data types (case-insensitive)
              [/\b(BOOL|BYTE|WORD|DWORD|LWORD|SINT|USINT|INT|UINT|DINT|UDINT|LINT|ULINT|REAL|LREAL|TIME|DATE|TIME_OF_DAY|DATE_AND_TIME|STRING|WSTRING)\b/i, 'type'],
              [/\b(AT|ARRAY|STRUCT|END_STRUCT)\b/i, 'type'],

              // Numbers
              [/\b\d+\.\d*([eE][\-+]?\d+)?\b/, 'number.float'],
              [/\b\d+[eE][\-+]?\d+\b/, 'number.float'],
              [/\b\d+\b/, 'number'],
              [/\b16#[0-9A-Fa-f]+\b/i, 'number.hex'],
              [/\b2#[01]+\b/, 'number.binary'],

              // Strings
              [/'([^'\\]|\\.)*'/, 'string'], 
              [/"([^"\\]|\\.)*"/, 'string'], 

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
              [/[^(*)]+/, 'comment'], 
              [/\*\)/, 'comment', '@pop'], 
              [/[(*)]/, 'comment']
            ]
          }
        });

        monacoInstance.editor.defineTheme('st-theme', {
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
      }

      // Create the editor with the configured language and theme
      try {      editor = monacoInstance.editor.create(container, {
        language: 'st',
        theme: 'st-theme',
        value: cleanCode,
        readOnly: readonly,
        automaticLayout: false, // We'll handle layout manually
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbersMinChars: 4, // Increased from 3 to 4 for more space
        glyphMargin: false,
        lineDecorationsWidth: 10, // Increased from 0 to 10 for spacing
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        },
        wordWrap: 'on',
        contextmenu: false,
        // Performance optimizations
        renderLineHighlight: 'none',
        renderValidationDecorations: 'off',
        renderWhitespace: 'none',
        renderControlCharacters: false,
        cursorBlinking: 'solid',
        cursorSmoothCaretAnimation: "off",
        smoothScrolling: false,
        // Disable unused features
        codeLens: false,
        colorDecorators: false,
        folding: false,
        foldingHighlight: false,
        links: false,
        mouseWheelZoom: false,
        multiCursorModifier: 'alt',
        occurrencesHighlight: "off",
        quickSuggestions: false,
        parameterHints: { enabled: false },
        autoIndent: 'none',
        formatOnPaste: false,
        formatOnType: false,
        suggestOnTriggerCharacters: false,
        acceptSuggestionOnEnter: 'off',
        hover: { enabled: false }
      });

        if (!editor) {
          throw new Error('Failed to create Monaco editor instance');
        }

        editorInitialized = true;

        // Hide fallback content when editor is ready
        const fallback = container.querySelector('.fallback-editor') as HTMLElement;
        if (fallback) {
          fallback.style.display = 'none';
        }

        // Force initial layout
        setTimeout(() => {
          if (editor && container) {
            const rect = container.getBoundingClientRect();
            editor.layout({ width: rect.width, height: rect.height });
          }
        }, 50);

      } catch (editorError) {
        console.error('Failed to create Monaco editor:', editorError);
        // Fallback to simple textarea or pre element
        if (container) {
          container.innerHTML = `<pre style="margin: 0; padding: 12px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.4; background: #fafafa; border: none; width: 100%; height: 100%; box-sizing: border-box; overflow: auto;">${cleanCode}</pre>`;
        }
        return;
      }

      // Manual layout handling to replace automaticLayout
      resizeObserver = new ResizeObserver((entries) => {
        if (editor && entries.length > 0) {
          // Throttle resize updates for better performance
          const entry = entries[0];
          const { width, height } = entry.contentRect;
          
          // Only update if size actually changed significantly
          if (Math.abs(width - (editor.getLayoutInfo().width || 0)) > 5 || 
              Math.abs(height - (editor.getLayoutInfo().height || 0)) > 5) {
            
            // Use requestIdleCallback if available, otherwise requestAnimationFrame
            if (window.requestIdleCallback) {
              window.requestIdleCallback(() => {
                editor?.layout({ width, height });
              }, { timeout: 100 });
            } else {
              requestAnimationFrame(() => {
                editor?.layout({ width, height });
              });
            }
          }
        }
      });
      
      if (container) {
        resizeObserver.observe(container);
      }

    } catch (error) {
      console.error('Failed to initialize Monaco Editor:', error);
    }
  };

  onMount(() => {
    if (!browser) return; // Only run in browser

    // Use Intersection Observer to only load Monaco when the component is visible
    intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !shouldInitialize) {
        shouldInitialize = true;
        // Add small delay to ensure DOM is ready
        setTimeout(initEditor, 100);
      }
    }, {
      threshold: 0.1, // Load when 10% visible
      rootMargin: '100px 0px' // Start loading 100px before element is visible
    });

    if (container) {
      intersectionObserver.observe(container);
    }

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
        intersectionObserver = undefined;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = undefined;
      }
      if (editor) {
        editor.dispose();
        editorInitialized = false;
        editor = undefined;
      }
      // Cleanup is handled globally by the monaco-config module
    };
  });

  afterUpdate(() => {
    if (browser && editorInitialized && editor && monacoInstance) {
      const cleanCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      if (cleanCode !== editor.getValue()) {
        editor.setValue(cleanCode);
      }
    }
  });
</script>

{#if title}
  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
    <h4 class="text-sm font-medium text-gray-700">{title}</h4>
  </div>
{/if}

<div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
  <div bind:this={container} class="editor-container" style="height: {height}; width: 100%;">
    <!-- Fallback content while Monaco loads -->
    {#if !editorInitialized}
      <pre class="fallback-editor">{code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')}</pre>
    {/if}
  </div>
</div>

<style>
  /* Ensure Monaco Editor styles don't conflict and prevent layout shifts */
  :global(.monaco-editor) {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
  }
  
  /* Add proper spacing around line numbers */
  :global(.monaco-editor .margin) {
    background-color: #f8f8f8 !important;
  }
  
  :global(.monaco-editor .line-numbers) {
    padding-right: 8px !important;
    color: #237893 !important;
  }
  
  /* Ensure there's space between line numbers and content */
  :global(.monaco-editor .view-lines) {
    padding-left: 8px !important;
  }
  
  /* Prevent layout shifts during loading */
  .editor-container {
    contain: layout style paint;
    will-change: auto;
    position: relative;
  }
  
  /* Fallback editor styling */
  .fallback-editor {
    margin: 0;
    padding: 12px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
    background: #fafafa;
    border: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  /* Optimize scrollbar rendering */
  :global(.monaco-scrollable-element > .scrollbar) {
    transform: translateZ(0); /* Force GPU acceleration */
  }
  
  /* Prevent text selection layout shifts */
  :global(.monaco-editor .view-lines) {
    contain: layout;
  }
</style>
