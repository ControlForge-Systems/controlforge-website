<script>
  import CanonicalLink from "$lib/components/CanonicalLink.svelte";
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
  <title>Variables & Data Types - Structured Text Documentation</title>
  <meta name="description" content="Learn about variable declarations, initialization, and data types in IEC 61131-3 Structured Text including BOOL, INT, REAL, STRING, and more." />
  <CanonicalLink path="/docs/variables" />
</svelte:head>

<article class="prose prose-lg max-w-none">
  <h1 class="text-3xl font-bold text-gray-900 mb-6">Variables & Data Types</h1>
  
  <p class="text-gray-700 mb-6">
    Variables are the foundation of any Structured Text program. Understanding how to declare, 
    initialize, and use different data types is essential for effective ST programming.
  </p>

  <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
    <h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Enhance Your Development Experience</h3>
    <p class="text-green-700 text-sm mb-3">
      Get syntax highlighting, IntelliSense, and debugging support for Structured Text:
    </p>
    <a 
      href="https://marketplace.visualstudio.com/items?itemName=controlforge.controlforge-structured-text"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
    >
      Install VS Code Extension →
    </a>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Variable Declaration</h2>
  
  <p class="text-gray-700 mb-4">
    Variables must be declared before use within <code>VAR</code> blocks. The basic syntax is:
  </p>

  <div class="mb-6">
    <CodeExample 
      code={`VAR
    VariableName : DataType;
    AnotherVariable : DataType := InitialValue;
END_VAR`}
      title="Variable Declaration Syntax"
      height="90px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Basic Data Types</h2>
  
  <div class="mb-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Boolean Types</h3>
      <CodeExample 
        code={`VAR
    IsRunning : BOOL := FALSE;
    StartButton : BOOL;
    SafetyOK : BOOL := TRUE;
END_VAR`}
        height="110px"
      />
      <p class="text-sm text-gray-600 mt-3">
        <strong>Values:</strong> TRUE, FALSE<br>
        <strong>Size:</strong> 1 bit<br>
        <strong>Use:</strong> Digital signals, flags, conditions
      </p>
    </div>
    
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Integer Types</h3>
      <CodeExample 
        code={`VAR
    Counter : INT := 0;
    LargeNumber : DINT := 100000;
    SmallValue : SINT := -50;
    PositiveOnly : UINT := 65000;
END_VAR`}
        height="120px"
      />
      <div class="text-sm text-gray-600 mt-3">
        <div><strong>SINT:</strong> -128 to 127 (8-bit)</div>
        <div><strong>INT:</strong> -32,768 to 32,767 (16-bit)</div>
        <div><strong>DINT:</strong> -2³¹ to 2³¹-1 (32-bit)</div>
        <div><strong>UINT:</strong> 0 to 65,535 (16-bit unsigned)</div>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Real (Floating Point) Types</h3>
      <CodeExample 
        code={`VAR
    Temperature : REAL := 25.5;
    PreciseValue : LREAL := 3.14159265359;
    Percentage : REAL := 75.0;
END_VAR`}
        height="100px"
      />
      <div class="text-sm text-gray-600 mt-3">
        <div><strong>REAL:</strong> 32-bit floating point</div>
        <div><strong>LREAL:</strong> 64-bit floating point</div>
        <div><strong>Range:</strong> ±1.175e-38 to ±3.402e+38 (REAL)</div>
      </div>
    </div>
    
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">String Types</h3>
      <CodeExample 
        code={`VAR
    Message : STRING := 'Hello World';
    PartNumber : STRING(20) := 'ABC-123';
    ErrorText : STRING(100);
END_VAR`}
        height="110px"
      />
      <div class="text-sm text-gray-600 mt-3">
        <div><strong>STRING:</strong> Variable-length text</div>
        <div><strong>STRING(n):</strong> Fixed maximum length</div>
        <div><strong>Default length:</strong> Usually 80 characters</div>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Time Data Types</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`VAR
    DelayTime : TIME := T#5s;           // 5 seconds
    CycleTime : TIME := T#100ms;        // 100 milliseconds
    LongDelay : TIME := T#2h30m15s;     // 2 hours, 30 minutes, 15 seconds
    
    CurrentTime : DATE_AND_TIME;
    StartDate : DATE := D#2024-01-15;
    StartTime : TIME_OF_DAY := TOD#08:30:00;
END_VAR`}
      title="Time Data Types"
      height="200px"
    />
  </div>

  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
    <h3 class="text-lg font-semibold text-blue-800 mb-3">Time Format Examples</h3>
    <div class="text-sm text-blue-700 space-y-1">
      <div><code>T#5s</code> or <code>TIME#5s</code> - 5 seconds</div>
      <div><code>T#1m30s</code> - 1 minute 30 seconds</div>
      <div><code>T#2h15m</code> - 2 hours 15 minutes</div>
      <div><code>T#100ms</code> - 100 milliseconds</div>
      <div><code>D#2024-12-25</code> - December 25, 2024</div>
      <div><code>TOD#14:30:45</code> - 2:30:45 PM</div>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Variable Initialization</h2>
  
  <div class="mb-6">
    <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-green-800 mb-3">✅ Good Practices</h3>
      <CodeExample 
        code={`VAR
    // Initialize critical values
    SafetyEnabled : BOOL := TRUE;
    MaxTemp : REAL := 100.0;
    
    // Clear initial states
    AlarmActive : BOOL := FALSE;
    ErrorCount : INT := 0;
END_VAR`}
        height="180px"
      />
    </div>
    
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-red-800 mb-3">❌ Potential Issues</h3>
      <CodeExample 
        code={`VAR
    // Uninitialized variables may have
    // unpredictable values
    Temperature : REAL;
    Counter : INT;
    Status : BOOL;
    Speed : REAL;
END_VAR`}
        height="180px"
      />
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Arrays</h2>
  
  <p class="text-gray-700 mb-4">
    Arrays allow you to store multiple values of the same type:
  </p>

  <div class="mb-6">
    <CodeExample 
      code={`VAR
    // One-dimensional arrays
    Temperatures : ARRAY[1..10] OF REAL;
    InputStates : ARRAY[0..15] OF BOOL;
    Messages : ARRAY[1..5] OF STRING(50);
    
    // Two-dimensional arrays
    Matrix : ARRAY[1..3, 1..3] OF INT;
    
    // Array with initialization
    DefaultValues : ARRAY[1..3] OF INT := [10, 20, 30];
END_VAR

// Using arrays
Temperatures[1] := 25.5;
InputStates[0] := TRUE;
Matrix[2,3] := 42;`}
      title="Array Declaration and Usage"
      height="300px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Structures (User-Defined Types)</h2>
  
  <p class="text-gray-700 mb-4">
    Structures allow you to group related data together:
  </p>

  <div class="mb-6">
    <CodeExample 
      code={`// Type definition (usually in a separate section)
TYPE
    MotorData : STRUCT
        Speed : REAL;
        Current : REAL;
        Temperature : REAL;
        IsRunning : BOOL;
        FaultCode : INT;
    END_STRUCT;
END_TYPE

// Variable declaration using the structure
VAR
    Motor1 : MotorData;
    Motor2 : MotorData;
END_VAR

// Using structure members
Motor1.Speed := 1500.0;
Motor1.IsRunning := TRUE;

IF Motor1.Temperature > 80.0 THEN
    Motor1.IsRunning := FALSE;
END_IF;`}
      title="Structure Definition and Usage"
      height="400px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Variable Scope and Storage Classes</h2>
  
  <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b">
          <th class="text-left py-3">Declaration</th>
          <th class="text-left py-3">Scope</th>
          <th class="text-left py-3">Persistence</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr class="border-b">
          <td class="py-2 font-mono">VAR</td>
          <td>Local to program/function</td>
          <td>Lost on power cycle</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-mono">VAR_GLOBAL</td>
          <td>Accessible from anywhere</td>
          <td>Lost on power cycle</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-mono">VAR_RETAIN</td>
          <td>Local to program/function</td>
          <td>Retained through power cycle</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-mono">VAR_INPUT</td>
          <td>Function/FB input parameter</td>
          <td>Parameter passing</td>
        </tr>
        <tr>
          <td class="py-2 font-mono">VAR_OUTPUT</td>
          <td>Function/FB output parameter</td>
          <td>Parameter passing</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="bg-gray-50 rounded-lg p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">Example of Different Variable Scopes</h3>
    <CodeExample 
      code={`VAR_GLOBAL
    SystemStatus : INT := 0;        // Available everywhere
END_VAR

VAR_GLOBAL RETAIN
    TotalRunTime : TIME := T#0s;    // Survives power cycles
END_VAR

PROGRAM MainProgram
VAR
    LocalCounter : INT := 0;        // Only in this program
END_VAR

VAR_RETAIN
    LastStopTime : DATE_AND_TIME;   // Local but retained
END_VAR`}
      title="Variable Scopes Example"
      height="280px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Type Conversion</h2>
  
  <p class="text-gray-700 mb-4">
    ST provides explicit type conversion functions for safe data type changes:
  </p>

  <div class="mb-6">
    <CodeExample 
      code={`VAR
    IntValue : INT := 42;
    RealValue : REAL;
    StringValue : STRING;
    BoolValue : BOOL;
END_VAR

// Numeric conversions
RealValue := INT_TO_REAL(IntValue);     // 42 → 42.0
IntValue := REAL_TO_INT(25.7);          // 25.7 → 25

// String conversions
StringValue := INT_TO_STRING(IntValue); // 42 → '42'
IntValue := STRING_TO_INT('123');       // '123' → 123

// Boolean conversions
BoolValue := INT_TO_BOOL(1);            // 1 → TRUE
IntValue := BOOL_TO_INT(TRUE);          // TRUE → 1`}
      title="Type Conversion Examples"
      height="300px"
    />
  </div>

  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
    <div class="flex">
      <div class="flex-shrink-0">
        <span class="text-2xl">⚠️</span>
      </div>
      <div class="ml-3">
        <h3 class="text-lg font-semibold text-yellow-800 mb-2">Type Conversion Safety</h3>
        <p class="text-yellow-700 text-sm mb-3">
          Always use explicit type conversion functions rather than relying on implicit conversions:
        </p>
        <ul class="text-yellow-700 text-sm space-y-1">
          <li>• Check for potential data loss (e.g., REAL to INT truncates)</li>
          <li>• Validate string-to-number conversions for invalid input</li>
          <li>• Consider range limits when converting between integer types</li>
        </ul>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Common Patterns and Best Practices</h2>
  
  <div class="mb-6">
    <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-green-800 mb-3">✅ Naming Conventions</h3>
      <CodeExample 
        code={`// Clear, descriptive names
MotorSpeed : REAL;
IsSystemReady : BOOL;
ErrorMessage : STRING;

// Consistent prefixes
bStartButton : BOOL;    // Boolean
iCounter : INT;         // Integer  
rTemperature : REAL;    // Real
sPartNumber : STRING;   // String`}
        height="200px"
      />
    </div>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 Initialization Tips</h3>
      <CodeExample 
        code={`// Group related variables
VAR
    // Temperature control
    SetPoint : REAL := 25.0;
    Hysteresis : REAL := 2.0;
    
    // Safety limits
    MaxTemp : REAL := 100.0;
    MinTemp : REAL := -10.0;
END_VAR`}
        height="200px"
      />
    </div>
  </div>

  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-blue-800 mb-3">🚀 Next Steps</h3>
    <p class="text-blue-700 text-sm mb-3">
      Now that you understand variables and data types, explore:
    </p>
    <div class="space-y-2">
      <a href="/docs/data-types" class="block text-sm text-brand-blue hover:text-blue-800 transition-colors">
        → Complete Data Types Reference (BYTE, WORD, DWORD, LWORD, POINTER, etc.)
      </a>
      <a href="/docs/control" class="block text-sm text-brand-blue hover:text-blue-800 transition-colors">
        → Control Structures (IF, CASE, FOR, WHILE)
      </a>
      <a href="/docs/standard-functions" class="block text-sm text-brand-blue hover:text-blue-800 transition-colors">
        → Standard Functions (Type Conversion, Math, String)
      </a>
    </div>
  </div>
</article>
