<script>
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
	import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
	<title>Best Practices - Structured Text Documentation</title>
	<meta
		name="description"
		content="Learn best practices for writing clean, maintainable, and efficient IEC 61131-3 Structured Text code. Professional coding standards for industrial automation."
	/>
	<CanonicalLink path="/docs/best-practices" />
	<ArticleSchema
		headline="Best Practices"
		description="Learn best practices for writing clean, maintainable, and efficient IEC 61131-3 Structured Text code. Professional coding standards for industrial automation."
		url="/docs/best-practices"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Best Practices</h1>

	<p class="text-gray-700 mb-6">
		Professional coding standards for reliable industrial automation systems.
	</p>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
		<h3 class="text-lg font-semibold text-green-800 mb-3">
			🚀 Enhance Your Development Experience
		</h3>
		<p class="text-green-700 text-sm mb-3">
			Get syntax highlighting, IntelliSense, and debugging support for Structured Text:
		</p>
		<a
			href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
		>
			Install VS Code Extension →
		</a>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Code Style and Formatting</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Good: Clear structure and indentation
IF SystemReady AND NOT EmergencyStop THEN
    StartMotor := TRUE;
    StatusLED := GREEN;
    
    // Check operating conditions
    IF Temperature > SafetyLimit THEN
        TriggerAlarm := TRUE;
        StartMotor := FALSE;
    END_IF;
ELSE
    StartMotor := FALSE;
    StatusLED := RED;
END_IF;

// Bad: Hard to read
if systemready and not emergencystop then startmotor:=true;statusled:=green;end_if;`}
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Naming Conventions</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Good naming conventions
VAR
    // Clear, descriptive names
    MotorRunning : BOOL;
    TemperatureSensor : REAL;
    ConveyorSpeed : REAL;
    StartButton : BOOL;
    
    // Function blocks with FB prefix
    FB_Motor : MotorController;
    FB_Timer : TON;
    
    // Constants in ALL_CAPS
    MAX_TEMPERATURE : REAL := 85.0;
    MIN_PRESSURE : REAL := 2.5;
END_VAR

// Bad naming
VAR
    x : BOOL;           // Unclear
    temp : REAL;        // Abbreviated
    motor1 : BOOL;      // Not descriptive
    M1 : MotorController; // Cryptic
END_VAR`}
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Error Handling</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Always check for error conditions
FUNCTION_BLOCK SafeMotorController
VAR_INPUT
    Start : BOOL;
    Speed : REAL;
END_VAR
VAR_OUTPUT
    Running : BOOL;
    Error : BOOL;
    ErrorMessage : STRING;
END_VAR

// Input validation
IF Speed < 0.0 OR Speed > 100.0 THEN
    Error := TRUE;
    ErrorMessage := 'Speed out of range (0-100)';
    Running := FALSE;
    RETURN;
END_IF;

// Safety checks
IF EmergencyStop OR NOT SafetyOK THEN
    Error := TRUE;
    ErrorMessage := 'Safety system fault';
    Running := FALSE;
    RETURN;
END_IF;

// Normal operation
IF Start AND NOT Error THEN
    Running := TRUE;
    ErrorMessage := '';
ELSE
    Running := FALSE;
END_IF;

END_FUNCTION_BLOCK`}
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>

	<div class="mb-6">
		<CodeExample
			code={`(*
    Function Block: ConveyorController
    Purpose: Controls conveyor belt speed and direction
    Author: Engineering Team
    Version: 1.2
    Date: 2024-06-15
*)
FUNCTION_BLOCK ConveyorController
VAR_INPUT
    Enable : BOOL;          (* TRUE to enable conveyor *)
    Speed : REAL;           (* Speed setpoint 0.0-100.0 % *)
    Direction : BOOL;       (* TRUE = Forward, FALSE = Reverse *)
END_VAR
VAR_OUTPUT
    Running : BOOL;         (* Conveyor is running *)
    ActualSpeed : REAL;     (* Current speed feedback *)
    Fault : BOOL;           (* Fault condition present *)
END_VAR

// Main control logic
IF Enable AND NOT Fault THEN
    // Start conveyor with specified parameters
    Running := TRUE;
    ActualSpeed := Speed;
ELSE
    // Safety shutdown
    Running := FALSE;
    ActualSpeed := 0.0;
END_IF;

END_FUNCTION_BLOCK`}
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Performance Tips</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Use efficient data types
VAR
    Counter : UINT;         // Use UINT instead of DINT for small counts
    Status : BYTE;          // Use BYTE for flags (8 bits)
    LargeValue : DINT;      // Use DINT only when needed
END_VAR

// Minimize function block calls
VAR
    Timer1 : TON;
    TimerResult : BOOL;
END_VAR

// Good: Call once, use result multiple times
Timer1(IN := StartCondition, PT := T#5s);
TimerResult := Timer1.Q;

IF TimerResult THEN
    Action1 := TRUE;
END_IF;
IF TimerResult THEN
    Action2 := TRUE;
END_IF;

// Avoid complex expressions in conditions
// Good: Break down complex logic
SafeToOperate := NOT EmergencyStop AND SafetyOK AND PowerOn;
IF SafeToOperate AND OperatorReady THEN
    StartSequence := TRUE;
END_IF;`}
		/>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-green-800 mb-3">Key Guidelines</h3>
		<ul class="text-green-700 text-sm space-y-1">
			<li>• Use clear, descriptive variable names</li>
			<li>• Implement proper error handling and safety checks</li>
			<li>• Comment complex logic and document function blocks</li>
			<li>• Use consistent indentation and formatting</li>
			<li>• Choose appropriate data types for efficiency</li>
			<li>• Test thoroughly with edge cases</li>
		</ul>
	</div>

	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-yellow-800 mb-3">🚀 Next Steps</h3>
		<div class="space-y-2">
			<a
				href="/docs/examples"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Practical Examples and Design Patterns
			</a>
			<a
				href="/docs/advanced-constructs"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Advanced Language Features
			</a>
		</div>
	</div>
</article>
