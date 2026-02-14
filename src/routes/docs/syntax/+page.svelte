<script>
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
	import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
	<title>Structured Text Syntax Basics - ControlForge Documentation</title>
	<meta
		name="description"
		content="Learn the fundamental syntax rules of IEC 61131-3 Structured Text including statements, comments, blocks, and formatting conventions."
	/>
	<CanonicalLink path="/docs/syntax" />
	<ArticleSchema
		headline="Structured Text Syntax Basics"
		description="Learn the fundamental syntax rules of IEC 61131-3 Structured Text including statements, comments, blocks, and formatting conventions."
		url="/docs/syntax"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Syntax Basics</h1>

	<p class="text-gray-700 mb-6">
		Structured Text follows a clear, readable syntax similar to Pascal or other high-level
		programming languages. Understanding these fundamental rules will help you write clean,
		maintainable ST code.
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

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Basic Statement Structure</h2>

	<div class="bg-gray-50 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-gray-800 mb-3">Semicolon Termination</h3>
		<p class="text-gray-700 mb-4">
			Every statement in Structured Text must end with a semicolon (;):
		</p>

		<CodeExample
			title="Basic Assignment Statements"
			code={`// Variable assignments
Counter := Counter + 1;
Temperature := 25.5;
IsRunning := TRUE;

// Function calls
Result := MyFunction(Input1, Input2);
Timer1(IN := StartSignal, PT := T#5s);`}
			height="170px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

	<p class="text-gray-700 mb-4">
		ST supports two types of comments for documenting your code. Good commenting is essential for
		maintaining industrial automation systems over their long operational lifespans.
	</p>

	<div class="mb-6">
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-blue-800 mb-3">Single-line Comments</h3>
			<p class="text-sm text-blue-700 mb-3">
				Use // for brief explanations and inline documentation:
			</p>
			<CodeExample
				code={`// Motor control initialization
MotorSpeed := 0.0;              // Start at zero speed
MotorDirection := FORWARD;      // Default direction
MotorEnabled := FALSE;          // Safety: start disabled

// Process variables
Temperature := SensorReading;   // Read from analog input
Pressure := ADC_Value * 0.1;    // Convert to bar (0.1 bar/unit)

// Safety interlocks
IF EmergencyStop THEN
    MotorEnabled := FALSE;      // Immediate stop
    AlarmActive := TRUE;        // Trigger alarm
END_IF;`}
				height="240px"
			/>
		</div>

		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-blue-800 mb-3">Multi-line Comments</h3>
			<p class="text-sm text-blue-700 mb-3">
				Use (* *) for detailed documentation and code blocks:
			</p>
			<CodeExample
				code={`(*
PID Controller Implementation
- Kp: Proportional gain = 2.0
- Ki: Integral gain = 0.5  
- Kd: Derivative gain = 0.1
- Output range: 0-100%
*)
Error := SetPoint - ProcessValue;
Integral := Integral + Error * ScanTime;
Derivative := (Error - LastError) / ScanTime;
Output := Kp * Error + Ki * Integral + Kd * Derivative;

(*
Temporarily disabled for testing
IF Pressure > MaxPressure THEN
    EmergencyShutdown := TRUE;
END_IF;
*)`}
				height="350px"
			/>
		</div>
	</div>

	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-yellow-800 mb-3">💡 Best Commenting Practices</h3>
		<div class="text-sm text-yellow-700">
			<div class="mb-4">
				<h4 class="font-semibold mb-2">✅ Good Comments:</h4>
				<ul class="space-y-1">
					<li>• Explain <em>why</em>, not just <em>what</em></li>
					<li>• Document safety-critical logic</li>
					<li>• Include units and ranges</li>
					<li>• Reference documentation sources</li>
					<li>• Explain complex calculations</li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold mb-2">❌ Avoid:</h4>
				<ul class="space-y-1">
					<li>• Obvious comments (Counter := Counter + 1; // Increment)</li>
					<li>• Outdated or incorrect comments</li>
					<li>• Commenting every single line</li>
					<li>• Using comments to fix bad code</li>
					<li>• Leaving TODO comments in production</li>
				</ul>
			</div>
		</div>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Code Blocks and Structure</h2>

	<p class="text-gray-700 mb-4">
		ST uses keywords to define code blocks. Blocks are always terminated with corresponding END
		keywords:
	</p>

	<div class="mb-6">
		<CodeExample
			code={`// IF block structure
IF Temperature > 80.0 THEN
    OverheatAlarm := TRUE;
    CoolingFan := TRUE;
ELSIF Temperature > 60.0 THEN
    OverheatAlarm := FALSE;
    CoolingFan := TRUE;
ELSE
    OverheatAlarm := FALSE;
    CoolingFan := FALSE;
END_IF;

// CASE block structure
CASE OperationMode OF
    1: SingleCycle();
    2: ContinuousMode();
    3: MaintenanceMode();
ELSE
    ErrorHandler();
END_CASE;`}
			title="Control Block Structures"
			height="380px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Operators and Expressions</h2>

	<div class="mb-6">
		<div class="mb-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-3">Arithmetic Operators</h3>
			<div class="bg-white border border-gray-200 rounded-lg p-4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b">
							<th class="text-left py-2">Operator</th>
							<th class="text-left py-2">Description</th>
						</tr>
					</thead>
					<tbody class="text-gray-700">
						<tr><td class="py-1 font-mono">+</td><td>Addition</td></tr>
						<tr><td class="py-1 font-mono">-</td><td>Subtraction</td></tr>
						<tr><td class="py-1 font-mono">*</td><td>Multiplication</td></tr>
						<tr><td class="py-1 font-mono">/</td><td>Division</td></tr>
						<tr><td class="py-1 font-mono">MOD</td><td>Modulo</td></tr>
						<tr><td class="py-1 font-mono">**</td><td>Exponentiation</td></tr>
					</tbody>
				</table>
			</div>
		</div>

		<div>
			<h3 class="text-lg font-semibold text-gray-800 mb-3">Comparison Operators</h3>
			<div class="bg-white border border-gray-200 rounded-lg p-4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b">
							<th class="text-left py-2">Operator</th>
							<th class="text-left py-2">Description</th>
						</tr>
					</thead>
					<tbody class="text-gray-700">
						<tr><td class="py-1 font-mono">=</td><td>Equal to</td></tr>
						<tr><td class="py-1 font-mono">&lt;&gt;</td><td>Not equal to</td></tr>
						<tr><td class="py-1 font-mono">&lt;</td><td>Less than</td></tr>
						<tr><td class="py-1 font-mono">&lt;=</td><td>Less than or equal</td></tr>
						<tr><td class="py-1 font-mono">&gt;</td><td>Greater than</td></tr>
						<tr><td class="py-1 font-mono">&gt;=</td><td>Greater than or equal</td></tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="mb-6">
		<h3 class="text-lg font-semibold text-gray-800 mb-3">Logical Operators</h3>
		<CodeExample
			code={`// Boolean operations
EnableOutput := InputA AND InputB;
AlarmCondition := HighTemp OR LowPressure;
SafetyOK := NOT EmergencyStop;

// Complex expressions with precedence
Result := (A AND B) OR (C AND NOT D);`}
			height="160px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Assignment vs. Comparison</h2>

	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
		<div class="flex items-start mb-4">
			<div class="flex-shrink-0">
				<span class="text-2xl">⚠️</span>
			</div>
			<div class="ml-3">
				<h3 class="text-lg font-semibold text-yellow-800 mb-2">Important Distinction</h3>
				<p class="text-yellow-700 text-sm">
					ST uses different operators for assignment and comparison:
				</p>
			</div>
		</div>

		<CodeExample
			code={`// Assignment uses :=
Counter := 10;
Temperature := SensorReading;

// Comparison uses =
IF Counter = 10 THEN
    // Do something
END_IF;`}
			height="160px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Case Sensitivity</h2>

	<p class="text-gray-700 mb-4">
		Structured Text is <strong>case-insensitive</strong> for keywords, identifiers, and operators:
	</p>

	<div class="mb-6">
		<CodeExample
			code={`// These are all equivalent
IF temperature > 80 THEN
if Temperature > 80 then
If TEMPERATURE > 80 Then

// Variable names are also case-insensitive
MyVariable := 10;
myvariable := 10;  // Same variable
MYVARIABLE := 10;  // Same variable`}
			title="Case Insensitivity Examples"
			height="200px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Formatting and Style</h2>

	<p class="text-gray-700 mb-4">
		While ST is flexible with formatting, following consistent style improves readability:
	</p>

	<div class="mb-6">
		<div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-red-800 mb-3">❌ Poor Formatting</h3>
			<CodeExample
				code={`if a>10 then b:=20;c:=30;end_if;
for i:=1 to 100 do sum:=sum+i;end_for;`}
				height="80px"
			/>
		</div>

		<div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-green-800 mb-3">✅ Good Formatting</h3>
			<CodeExample
				code={`IF A > 10 THEN
    B := 20;
    C := 30;
END_IF;

FOR I := 1 TO 100 DO
    Sum := Sum + I;
END_FOR;`}
				height="180px"
			/>
		</div>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Common Syntax Patterns</h2>

	<div class="bg-gray-50 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-gray-800 mb-3">Typical Program Structure</h3>
		<CodeExample
			code={`// Variable declarations (usually at the top)
VAR
    Counter : INT := 0;
    Temperature : REAL;
    IsRunning : BOOL := FALSE;
END_VAR

// Program logic
IF StartButton AND NOT StopButton THEN
    IsRunning := TRUE;
    Counter := Counter + 1;
END_IF;

// Read inputs
Temperature := TemperatureSensor.Value;

// Control logic
IF Temperature > SetPoint THEN
    CoolingValve := TRUE;
ELSE
    CoolingValve := FALSE;
END_IF;

// Safety checks
IF EmergencyStop THEN
    IsRunning := FALSE;
    AllOutputs := FALSE;
END_IF;`}
			title="Typical Program Structure"
			height="480px"
		/>
	</div>

	<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-blue-800 mb-3">💡 Next Steps</h3>
		<p class="text-blue-700 text-sm mb-3">
			Now that you understand the basic syntax, you're ready to learn about:
		</p>
		<div class="space-y-2">
			<a
				href="/docs/variables"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Variables & Data Types
			</a>
			<a
				href="/docs/control"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Control Structures (IF, FOR, WHILE)
			</a>
		</div>
	</div>
</article>
