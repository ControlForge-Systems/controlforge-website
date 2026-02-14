<script>
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
	import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
	<title>Data Types Reference - Structured Text Documentation</title>
	<meta
		name="description"
		content="Guide to IEC 61131-3 data types including elementary, generic, and derived types. Learn about BYTE, WORD, DWORD, POINTER and reference types."
	/>
	<CanonicalLink path="/docs/data-types" />
	<ArticleSchema
		headline="Data Types Reference"
		description="Guide to IEC 61131-3 data types including elementary, generic, and derived types. Learn about BYTE, WORD, DWORD, POINTER and reference types."
		url="/docs/data-types"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Data Types Reference</h1>

	<p class="text-gray-700 mb-6">
		Essential IEC 61131-3 data types including elementary types, generic types, and advanced
		constructs.
	</p>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
		<h3 class="text-lg font-semibold text-green-800 mb-3">
			🚀 Enhance Your Development Experience
		</h3>
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

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Bit String Data Types</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    StatusByte : BYTE := 16#FF;         // 8-bit: 0 to 255
    StatusWord : WORD := 16#ABCD;       // 16-bit: 0 to 65,535  
    StatusDWord : DWORD := 16#12345678; // 32-bit: 0 to 4,294,967,295
    StatusLWord : LWORD := 16#123456789ABCDEF0; // 64-bit

    // Bit manipulation
    StatusByte.0 := TRUE;     // Set bit 0
    StatusByte.7 := FALSE;    // Clear bit 7
    Config := 16#A5;          // Hexadecimal (165 decimal)
    Mask := 2#10101010;       // Binary notation
END_VAR`}
			title="Bit String Data Types"
			height="300px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Extended Integer Types</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    // 64-bit signed integer
    PrecisionCounter : LINT := 1234567890123456789;
    
    // 64-bit unsigned integer 
    LargeFileSize : ULINT := 18446744073709551615;
    
    // High-precision calculations
    TotalProductionCount : LINT;
    MachineRunTime : ULINT;      // Microseconds since startup
END_VAR

// Usage examples
TotalProductionCount := TotalProductionCount + 1;
IF MachineRunTime > 86400000000 THEN  // 24 hours in microseconds
    DailyReset := TRUE;
END_IF;`}
			title="64-bit Integer Types"
			height="300px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Wide Character & Extended Time Types</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    // Wide character (Unicode support)
    UnicodeChar : WCHAR := "A";
    MultiLanguageMessage : WSTRING := "Hello 世界 мир";
    
    // Extended time with nanosecond precision
    PreciseDelay : LTIME := LTIME#1d2h3m4s567ms890us123ns;
    FutureDate : LDATE := LDATE#2100-12-31;
    
    // High-resolution timing
    ProcessStartTime : LTIME;
    ProcessDuration : LTIME;
END_VAR

// Unicode and timing operations
InternationalName := CONCAT_WSTR(FirstName, " ", LastName);
ProcessStartTime := GetCurrentLTime();
ProcessDuration := GetCurrentLTime() - ProcessStartTime;`}
			title="Wide Character and Extended Time Types"
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Generic Data Types</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Generic function accepting any numeric type
FUNCTION ProcessAnyNumber : BOOL
VAR_INPUT
    Input : ANY_NUM;        // Accepts any numeric type
    Threshold : ANY_NUM;    // Same here
END_VAR
    ProcessAnyNumber := Input > Threshold;
END_FUNCTION

// Usage with different types
VAR
    TempValue : REAL := 25.5;
    CountValue : INT := 100;
END_VAR

Success1 := ProcessAnyNumber(TempValue, 30.0);
Success2 := ProcessAnyNumber(CountValue, 150);`}
			title="Generic Data Types for Flexible Functions"
			height="400px"
		/>
	</div>

	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-yellow-800 mb-3">Generic Type Categories</h3>
		<ul class="text-yellow-700 text-sm space-y-1">
			<li>• <strong>ANY:</strong> Any data type</li>
			<li>• <strong>ANY_NUM:</strong> All numeric types</li>
			<li>• <strong>ANY_REAL:</strong> REAL, LREAL</li>
			<li>• <strong>ANY_INT:</strong> All integer types</li>
			<li>• <strong>ANY_BIT:</strong> BOOL and bit strings</li>
			<li>• <strong>ANY_STRING:</strong> STRING, WSTRING</li>
			<li>• <strong>ANY_DATE:</strong> All date/time types</li>
		</ul>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Pointer and Reference Types</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    // Pointer to REAL variable
    TempPointer : POINTER TO REAL;
    Temperature : REAL := 25.5;
    
    // Reference to function block
    MotorRef : REFERENCE TO MotorController;
    Motor1 : MotorController;
END_VAR

// Pointer assignment and dereferencing
TempPointer := ADR(Temperature);        // Get address
NewValue := TempPointer^;               // Dereference pointer
TempPointer^ := 30.0;                   // Assign through pointer

// Reference assignment
MotorRef REF= Motor1;                   // Create reference
MotorRef.Start := TRUE;                 // Use through reference`}
			title="Pointer and Reference Types"
			height="400px"
		/>
	</div>

	<div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-red-800 mb-3">⚠️ Pointer Safety</h3>
		<ul class="text-red-700 text-sm space-y-1">
			<li>• Always check for NULL pointers before dereferencing</li>
			<li>• Ensure pointer targets remain valid during use</li>
			<li>• Use references when possible - they're safer than pointers</li>
			<li>• Consider memory layout in real-time systems</li>
		</ul>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Next Steps</h3>
		<div class="space-y-2">
			<a
				href="/docs/standard-functions"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Standard Functions (Type Conversion, Math, String)
			</a>
			<a
				href="/docs/standard-function-blocks"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Standard Function Blocks (Timers, Counters, Edge Detection)
			</a>
			<a
				href="/docs/advanced-constructs"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Advanced Language Constructs (Interfaces, Methods, Properties)
			</a>
		</div>
	</div>
</article>
