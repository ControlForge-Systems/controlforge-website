<script>
  import VSCodeDemo from '$lib/components/VSCodeDemo.svelte';
</script>

<svelte:head>
  <title>Structured Text Overview - ControlForge Documentation</title>
  <meta name="description" content="Introduction to IEC 61131-3 Structured Text programming language for industrial automation and control systems." />
</svelte:head>

<article class="prose prose-lg max-w-none">
  <h1 class="text-3xl font-bold text-gray-900 mb-6">Structured Text Overview</h1>
  
  <div class="bg-blue-50 border-l-4 border-brand-blue p-6 mb-8">
    <div class="flex">
      <div class="flex-shrink-0">
        <span class="text-2xl">💡</span>
      </div>
      <div class="ml-3">
        <p class="text-sm text-blue-800">
          <strong>What is Structured Text?</strong> Structured Text (ST) is a high-level programming language defined in the IEC 61131-3 standard for programmable logic controllers (PLCs) and other industrial automation systems.
        </p>
      </div>
    </div>
  </div>

  <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
    <h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Enhance Your Development Experience</h3>
    <p class="text-green-700 text-sm mb-3">
      Get the most out of Structured Text programming with our VS Code extension:
    </p>
    <a 
      href="https://marketplace.visualstudio.com/items?itemName=controlforge.controlforge-structured-text"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-2 focus:outline-brand-blue focus:outline-offset-2"
    >
      Install VS Code Extension →
    </a>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Why Structured Text?</h2>
  
  <p class="text-gray-700 mb-6">
    Structured Text brings the power and flexibility of modern programming languages to industrial automation. 
    Unlike traditional ladder logic, ST offers:
  </p>

  <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
    <li><strong>Readability:</strong> Code that clearly expresses complex logic and algorithms</li>
    <li><strong>Maintainability:</strong> Easier debugging, testing, and code reuse</li>
    <li><strong>Scalability:</strong> Better suited for large, complex control applications</li>
    <li><strong>Modularity:</strong> Support for functions, function blocks, and structured programming</li>
    <li><strong>Standard Compliance:</strong> Follows IEC 61131-3 for cross-platform compatibility</li>
  </ul>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Modern Industrial Automation</h2>
  
  <p class="text-gray-700 mb-6">
    Today's industrial systems demand sophisticated control logic that can handle:
  </p>

  <div class="space-y-4 mb-8">
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">🏭 Complex Processes</h3>
      <p class="text-gray-600 text-sm">
        Multi-step manufacturing processes, batch control, and coordinated machine operations 
        require algorithmic thinking that ST naturally supports.
      </p>
    </div>
    
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">📊 Data Processing</h3>
      <p class="text-gray-600 text-sm">
        Modern automation involves significant data manipulation, calculations, and 
        communication with enterprise systems.
      </p>
    </div>
    
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">🔗 System Integration</h3>
      <p class="text-gray-600 text-sm">
        Integration with databases, web services, and IoT devices requires flexible 
        programming approaches.
      </p>
    </div>
    
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">🛠️ Code Reusability</h3>
      <p class="text-gray-600 text-sm">
        Structured Text's function and function block capabilities enable creating 
        reusable, tested code libraries.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">IEC 61131-3 Standard</h2>
  
  <p class="text-gray-700 mb-4">
    The IEC 61131-3 standard defines five programming languages for industrial automation:
  </p>

  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
    <h3 class="text-lg font-semibold text-yellow-800 mb-3">Structured Text in Context</h3>
    <p class="text-yellow-700 text-sm mb-3">
      While IEC 61131-3 includes Ladder Diagram (LD), Function Block Diagram (FBD), 
      Sequential Function Chart (SFC), and Instruction List (IL), Structured Text stands out for:
    </p>
    <ul class="list-disc list-inside space-y-1 text-yellow-700 text-sm">
      <li>Mathematical and algorithmic operations</li>
      <li>Complex conditional logic</li>
      <li>String manipulation and data processing</li>
      <li>Implementation of advanced control algorithms</li>
    </ul>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">See It In Action</h2>
  
  <p class="text-gray-700 mb-4">
    Experience Structured Text development with the ControlForge VS Code extension. 
    This interactive demo shows real syntax highlighting and features:
  </p>

  <div class="mb-8">
    <VSCodeDemo 
      title="ControlForge Structured Text Extension"
      height="600px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
  
  <p class="text-gray-700 mb-4">
    Ready to dive into Structured Text programming? This documentation covers everything you need:
  </p>

  <div class="grid md:grid-cols-3 gap-4 mb-8">
    <a href="/docs/syntax" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🔤</div>
      <h3 class="font-semibold text-gray-800">Syntax Basics</h3>
      <p class="text-sm text-gray-600 mt-1">Learn the fundamental syntax rules and structure</p>
    </a>
    
    <a href="/docs/variables" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">📦</div>
      <h3 class="font-semibold text-gray-800">Variables & Types</h3>
      <p class="text-sm text-gray-600 mt-1">Understand data types and variable declarations</p>
    </a>
    
    <a href="/docs/control" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🔀</div>
      <h3 class="font-semibold text-gray-800">Control Structures</h3>
      <p class="text-sm text-gray-600 mt-1">Master IF, CASE, FOR, WHILE, and REPEAT</p>
    </a>
  </div>

  <div class="grid md:grid-cols-3 gap-4 mb-8">
    <a href="/docs/functions" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">⚙️</div>
      <h3 class="font-semibold text-gray-800">Functions & Function Blocks</h3>
      <p class="text-sm text-gray-600 mt-1">Create modular, reusable code components</p>
    </a>
    
    <a href="/docs/standard-function-blocks" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🧱</div>
      <h3 class="font-semibold text-gray-800">Standard Function Blocks</h3>
      <p class="text-sm text-gray-600 mt-1">Timers, counters, edge detection, and bistable elements</p>
    </a>
    
    <a href="/docs/standard-functions" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🔧</div>
      <h3 class="font-semibold text-gray-800">Standard Functions</h3>
      <p class="text-sm text-gray-600 mt-1">Type conversion, math, string, and date/time functions</p>
    </a>
  </div>

  <div class="space-y-4 mb-8">
    <a href="/docs/data-types" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🔢</div>
      <h3 class="font-semibold text-gray-800">Complete Data Types</h3>
      <p class="text-sm text-gray-600 mt-1">All IEC 61131-3 data types including BYTE, WORD, POINTER, and generic types</p>
    </a>
    
    <a href="/docs/advanced-constructs" class="block p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors">
      <div class="text-lg mb-2">🏗️</div>
      <h3 class="font-semibold text-gray-800">Advanced Constructs</h3>
      <p class="text-sm text-gray-600 mt-1">CONFIGURATION, RESOURCE, TASK, INTERFACE, METHOD, and PROPERTY</p>
    </a>
  </div>
</article>
