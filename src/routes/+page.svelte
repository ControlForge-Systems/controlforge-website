<script>
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
  <link rel="canonical" href="https://controlforge.dev/" />

  <script type="application/ld+json">
    {`
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
    `}
  </script>
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen">
  <!-- Hero Section -->
  <section class="text-center mb-12 px-4 sm:mb-16">
    <h1 class="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Welcome to ControlForge Systems</h1>
    <p class="text-base xs:text-lg sm:text-xl mb-2 sm:mb-4">Bringing Industrial Control Programming into the Modern Era</p>
    <p class="text-sm xs:text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-3xl mx-auto">
      We build tools that modernize how automation engineers write, test, and manage control logic starting with our flagship Visual Studio Code extension for Structured Text.
    </p>
  </section>

  <!-- Product Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-12 sm:mb-16">
    <div class="text-center mb-8 sm:mb-12">
      <img
        src="/controlforge_ST_icon_1024x1024.png"
        alt="Structured Text by ControlForge Logo"
        class="mx-auto mb-4 sm:mb-6 w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-contain"
        loading="lazy"
        decoding="async"
      />
      <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Structured Text by ControlForge</h2>
      <p class="text-base xs:text-lg sm:text-xl text-gray-600 mb-1 sm:mb-2">VS Code Extension for IEC 61131-3</p>
      <p class="text-sm xs:text-base sm:text-lg max-w-md sm:max-w-2xl mx-auto">
        The ControlForge Structured Text extension brings modern IDE features to industrial programming. Whether you're writing logic for PLCs or edge devices, our tool enhances your development workflow.
      </p>
    </div>

    <div class="mb-8 sm:mb-12">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">🔧 Key Features</h3>
      <ul class="space-y-2 xs:space-y-3 text-sm xs:text-base sm:text-lg">
        <li class="flex items-start">
          <span class="mr-2 xs:mr-3">✓</span>
          <span>Syntax highlighting for Structured Text (IEC 61131-3)</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2 xs:mr-3">✓</span>
          <span>Intelligent code snippets for faster programming</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2 xs:mr-3">✓</span>
          <span>Linting for syntax and logic errors</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2 xs:mr-3">✓</span>
          <span>Seamless integration with modern dev tools</span>
        </li>
      </ul>
    </div>

    <div class="text-center mb-8 sm:mb-12">
      <h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">📦 Install via VS Code:</h3>
      <div class="relative max-w-full sm:max-w-2xl mx-auto">
        <pre class="bg-gray-100 p-2 xs:p-3 sm:p-4 rounded-lg text-xs xs:text-sm sm:text-base overflow-x-auto pr-20 sm:pr-32">code --install-extension controlforge.controlforge-structured-text</pre>
        <button
          id="copy-button"
          on:click={copyToClipboard}
          class="absolute top-1 right-1 xs:top-1.5 xs:right-1.5 sm:top-2 sm:right-2 bg-brand-blue hover:bg-blue-700 text-white px-2 py-1 xs:px-3 xs:py-1.5 sm:px-5 sm:py-2 rounded text-xs xs:text-sm sm:text-base transition-colors shadow flex items-center justify-center disabled:opacity-60"
          style="margin:0;"
          disabled={isCopying}
        >
          {#if copied}
            <svg class="h-4 w-4 mr-2 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Copied!
          {:else if isCopying}
            <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
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
  </section>

  <!-- About Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-12 sm:mb-16">
    <h2 class="text-lg xs:text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">About ControlForge</h2>
    <p class="text-sm xs:text-base sm:text-lg max-w-md sm:max-w-3xl mx-auto text-center">
      At ControlForge Systems, our mission is to bring industrial control programming into the modern era. We aim to equip engineers and developers with modern, intuitive tools that match the sophistication of today’s software development workflows all while respecting the rigor and standards of automation systems.      
    </p>
  </section>

  <!-- Contact Section -->
  <section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-12 sm:mt-16 mb-8">
    <div class="text-center">
      <h2 class="text-lg xs:text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Us</h2>
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