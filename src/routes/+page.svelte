<script lang="ts">
  import VSCodeDemo from '$lib/components/VSCodeDemo.svelte';
  let isCopying = false;
  let copied = false;

  function copyToClipboard() {
    if (isCopying) return;
    isCopying = true;
    copied = false;
    const text = 'code --install-extension controlforge.controlforge-structured-text';
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => {
        isCopying = false;
        copied = false;
      }, 500);
    }).catch(() => {
      isCopying = false;
      copied = false;
    });
  }

  // Fallback handler for image load errors
  function handleImgError(event: Event) {
    const target = event.target as HTMLElement;
    target.style.display = 'none';
    if (target.nextElementSibling) {
      (target.nextElementSibling as HTMLElement).style.display = 'inline-flex';
    }
  }
</script>

<svelte:head>
  <title>ControlForge Systems - Structured Text VS Code Extension | IEC 61131-3 Support</title>
  <meta name="description" content="ControlForge Systems develops modern developer tools for automation and control systems. Our Structured Text VS Code extension supports IEC 61131-3 standard with syntax highlighting, code snippets, and error checking." />
  <meta name="keywords" content="structured text, IEC 61131-3, VS Code extension, PLC programming, automation, control systems, ControlForge" />
  <meta name="author" content="ControlForge Systems" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://controlforge.dev/" />
  <meta property="og:title" content="ControlForge Systems - Structured Text VS Code Extension" />
  <meta property="og:description" content="Modern developer tools for automation and control systems. Structured Text extension with IEC 61131-3 support." />
  <meta property="og:image" content="/controlforge_logo_1024x1024.png" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://controlforge.dev/" />
  <meta property="twitter:title" content="ControlForge Systems - Structured Text VS Code Extension" />
  <meta property="twitter:description" content="Modern developer tools for automation and control systems. Structured Text extension with IEC 61131-3 support." />
  <meta property="twitter:image" content="/controlforge_logo_1024x1024.png" />
  
  <!-- Additional SEO -->
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="canonical" href="https://controlforge.dev/" />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ControlForge Structured Text VS Code Extension",
      "operatingSystem": "Windows, macOS, Linux",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "10"
      },
      "description": "Structured Text extension for VS Code supporting IEC 61131-3 with syntax highlighting, code snippets, and error checking.",
      "url": "https://controlforge.dev/",
      "image": "https://controlforge.dev/controlforge_ST_icon_512x512.png",
      "author": {
        "@type": "Organization",
        "name": "ControlForge Systems",
        "url": "https://controlforge.dev/"
      }
    }
  </script>
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen">
  <!-- Product Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8">
    <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="md:w-1/3 flex justify-center">
        <img
          src="/controlforge_ST_icon_1024x1024.png"
          alt="Structured Text by ControlForge Logo"
          class="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="md:w-2/3 text-center md:text-left">
        <h1 class="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Structured Text VS Code Extension</h1>
        <p class="text-sm xs:text-base text-gray-600 mb-1 sm:mb-2">Professional IEC 61131-3 Support</p>
        <p class="text-xs xs:text-sm sm:text-base max-w-xl mx-auto md:mx-0">
          The ControlForge Structured Text extension brings modern IDE features to industrial programming, enhancing your PLC and edge device development workflow.
        </p>
      </div>
    </div>

    <!-- Extension Stats -->
    <div class="mb-4 sm:mb-6 text-center">
      <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <!-- Downloads -->
        <img 
          src="https://img.shields.io/visual-studio-marketplace/d/ControlForgeSystems.controlforge-structured-text?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=Downloads&color=007ACC&cacheSeconds=3600"
          alt="Extension Download Count"
          class="h-6 xs:h-7 sm:h-8"
          loading="lazy"
          on:error={handleImgError}
        />
        <!-- Fallback for Downloads -->
        <a 
          href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden h-6 xs:h-7 sm:h-8 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded items-center hover:bg-blue-700 transition-colors"
          style="display: none;"
        >
          📥 Downloads
        </a>
        
        <!-- GitHub Stars -->
        <img 
          src="https://img.shields.io/github/stars/ControlForge-Systems/controlforge-structured-text?style=for-the-badge&logo=github&logoColor=white&label=Stars&color=yellow&cacheSeconds=3600"
          alt="GitHub Stars"
          class="h-6 xs:h-7 sm:h-8"
          loading="lazy"
          on:error={handleImgError}
        />
        <!-- Fallback for Stars -->
        <a 
          href="https://github.com/ControlForge-Systems/controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden h-6 xs:h-7 sm:h-8 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded items-center hover:bg-yellow-600 transition-colors"
          style="display: none;"
        >
          ⭐ Stars
        </a>
        
        <!-- Version -->
        <img 
          src="https://img.shields.io/visual-studio-marketplace/v/ControlForgeSystems.controlforge-structured-text?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=Version&color=brightgreen&cacheSeconds=3600"
          alt="Extension Version"
          class="h-6 xs:h-7 sm:h-8"
          loading="lazy"
          on:error={handleImgError}
        />
        <!-- Fallback for Version -->
        <a 
          href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden h-6 xs:h-7 sm:h-8 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded items-center hover:bg-green-700 transition-colors"
          style="display: none;"
        >
          📦 Latest
        </a>
        
        <!-- Last Updated -->
        <img 
          src="https://img.shields.io/visual-studio-marketplace/last-updated/ControlForgeSystems.controlforge-structured-text?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=Updated&color=orange&cacheSeconds=3600"
          alt="Last Updated"
          class="h-6 xs:h-7 sm:h-8"
          loading="lazy"
          on:error={handleImgError}
        />
        <!-- Fallback for Last Updated -->
        <a 
          href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden h-6 xs:h-7 sm:h-8 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded items-center hover:bg-orange-600 transition-colors"
          style="display: none;"
        >
          🔄 Updated
        </a>
      </div>
    </div>

    <!-- Interactive VS Code Demo -->
    <div class="mb-6 sm:mb-8">
      <VSCodeDemo height="450px" />
    </div>

    <!-- Command Line Installation -->
    <div class="text-center mb-6 sm:mb-8">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Installation</h3>
      
      <!-- VS Code Marketplace Buttons -->
      <div class="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <!-- Direct VS Code Link -->
        <div>
          <a 
            href="vscode:extension/ControlForgeSystems.controlforge-structured-text"
            class="inline-flex items-center bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
            </svg>
            Open in VS Code
          </a>
        </div>
        
        <!-- Web Marketplace Link -->
        <div>
          <a 
            href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors text-xs sm:text-sm shadow hover:shadow-lg"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            View in Web Browser
          </a>
        </div>
      </div>
      
      <p class="text-sm xs:text-base text-gray-600 mb-3">Or install via command line:</p>
      <div class="max-w-full mx-auto">
        <pre class="bg-gray-100 p-3 xs:p-4 sm:p-5 rounded-t-lg text-xs xs:text-sm sm:text-base overflow-x-auto">code --install-extension controlforge.controlforge-structured-text</pre>
        <div class="flex justify-end bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button
            id="copy-button"
            on:click={copyToClipboard}
            class="bg-brand-blue hover:bg-blue-700 text-white px-3 py-1 m-2 rounded text-xs sm:text-sm transition-colors shadow flex items-center justify-center disabled:opacity-60"
            disabled={isCopying}
          >
            {#if copied}
              <svg class="h-4 w-4 mr-1 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Copied!
            {:else if isCopying}
              <svg class="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Copy
            {:else}
              Copy
            {/if}
          </button>
        </div>
      </div>
    </div>

    <div class="mb-6 sm:mb-8">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Key Features</h3>
      <ul class="space-y-3 xs:space-y-4 text-sm xs:text-base sm:text-lg">
        <li class="flex items-start">
          <div>
            <span class="font-semibold">Function Block IntelliSense</span>: Auto-complete for FB outputs (<code>myTimer.Q</code>, <code>upCounter.CV</code>)
          </div>
        </li>
        <li class="flex items-start">
          <div>
            <span class="font-semibold">Rich Syntax Highlighting</span>: Complete IEC 61131-3 language support
          </div>
        </li>
        <li class="flex items-start">
          <div>
            <span class="font-semibold">Smart Code Completion</span>: Context-aware suggestions for keywords, types, and variables
          </div>
        </li>
        <li class="flex items-start">
          <div>
            <span class="font-semibold">Code Validation</span>: Built-in syntax validation and error detection
          </div>
        </li>
        <li class="flex items-start">
          <div>
            <span class="font-semibold">Code Snippets</span>: Pre-built templates for common PLC patterns
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Developer Resources -->
    <div class="space-y-4 sm:space-y-6">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Developer Resources</h3>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <!-- GitHub Repository -->
        <a 
          href="https://github.com/ControlForge-Systems/controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span class="text-xs xs:text-sm font-medium text-gray-700">Source Code</span>
        </a>

        <!-- Project Roadmap -->
        <a 
          href="https://github.com/orgs/ControlForge-Systems/projects/1"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
          <span class="text-xs xs:text-sm font-medium text-gray-700">Roadmap</span>
        </a>

        <!-- Bug Reports -->
        <a 
          href="https://github.com/ControlForge-Systems/controlforge-structured-text/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <span class="text-xs xs:text-sm font-medium text-gray-700">Report Bug</span>
        </a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10">
    <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">About ControlForge</h3>
    <p class="text-sm xs:text-base sm:text-lg max-w-md sm:max-w-3xl mx-auto text-center">
      At ControlForge Systems, our mission is to bring industrial control programming into the modern era. We aim to equip engineers and developers with modern, intuitive tools that match the sophistication of today’s software development workflows all while respecting the rigor and standards of automation systems.      
    </p>
  </section>

  <!-- Contact Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8 sm:mt-10 mb-6">
    <div class="text-center">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Contact Us</h3>
      <p class="text-sm xs:text-base sm:text-lg mb-2 sm:mb-4">
        Have questions or need support? We'd love to hear from you.
      </p>
      <a 
        href="mailto:hello@controlforge.dev" 
        class="inline-flex items-center bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 px-3 xs:py-3 xs:px-4 sm:px-6 rounded-lg transition-colors text-xs xs:text-sm sm:text-base"
      >
        📧 hello@controlforge.dev
      </a>
    </div>
  </section>
</main>