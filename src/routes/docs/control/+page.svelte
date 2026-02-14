<script lang="ts">
	import CodeExample from '$lib/components/CodeExample.svelte';
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
</script>

<svelte:head>
	<title>Control Structures - Structured Text Documentation</title>
	<meta
		name="description"
		content="Master control flow in IEC 61131-3 Structured Text with IF, CASE, FOR, WHILE, and REPEAT statements. Learn conditional logic and loops with practical examples."
	/>
	<CanonicalLink path="/docs/control" />
	<ArticleSchema
		headline="Control Structures"
		description="Master control flow in IEC 61131-3 Structured Text with IF, CASE, FOR, WHILE, and REPEAT statements. Learn conditional logic and loops with practical examples."
		url="/docs/control"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Control Structures</h1>

	<p class="text-gray-700 mb-6">
		Control structures enable conditional logic and loops for responsive automation programs.
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

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">IF Statement</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Simple IF statement
IF Temperature > 80.0 THEN
    CoolingFan := TRUE;
    OverheatAlarm := TRUE;
END_IF;

// IF-ELSE statement
IF StartButton THEN
    MotorRunning := TRUE;
ELSE
    MotorRunning := FALSE;
END_IF;

// IF-ELSIF-ELSE statement
IF Temperature > 90.0 THEN
    EmergencyShutdown := TRUE;
    AlarmLevel := 3;
ELSIF Temperature > 75.0 THEN
    CoolingFan := TRUE;
    AlarmLevel := 1;
ELSE
    CoolingFan := FALSE;
    AlarmLevel := 0;
END_IF;`}
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">CASE Statement</h2>

	<div class="mb-6">
		<CodeExample
			code={`CASE ErrorCode OF
    0:      // No error
        ErrorMessage := 'System OK';
        AlarmActive := FALSE;
        
    1..10:  // Minor errors
        ErrorMessage := 'Minor fault';
        AlarmActive := TRUE;
        AutoRestart := TRUE;
        
    11..50: // Major errors
        ErrorMessage := 'Major fault';
        AlarmActive := TRUE;
        AutoRestart := FALSE;
        
ELSE
    ErrorMessage := 'Unknown error';
    AlarmActive := TRUE;
END_CASE;`}
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">FOR Loop</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    I : INT;
    SensorValues : ARRAY[1..10] OF REAL;
    Sum : REAL := 0.0;
END_VAR

// Basic FOR loop
FOR I := 1 TO 10 DO
    Sum := Sum + SensorValues[I];
END_FOR;

// FOR loop with step
FOR I := 1 TO 10 BY 2 DO  // Steps: 1, 3, 5, 7, 9
    ProcessSensor(SensorValues[I]);
END_FOR;

// Countdown loop
FOR I := 10 TO 1 BY -1 DO
    ShutdownSequence[I] := TRUE;
END_FOR;`}
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">WHILE Loop</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    Position : REAL;
    Target : REAL := 100.0;
    Speed : REAL := 5.0;
END_VAR

// WHILE loop - condition checked before execution
WHILE Position < Target DO
    Position := Position + Speed;
    MoveMotor(Speed);
    
    // Safety check
    IF Position > 120.0 THEN
        EXIT;  // Exit loop immediately
    END_IF;
END_WHILE;

// Process items until queue empty
WHILE NOT QueueEmpty DO
    Item := GetNextItem();
    ProcessItem(Item);
END_WHILE;`}
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">REPEAT Loop</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    Position : REAL;
    Attempts : INT := 0;
    MaxAttempts : INT := 5;
END_VAR

// REPEAT loop - condition checked after execution
REPEAT
    Position := ReadPosition();
    Attempts := Attempts + 1;
    
    IF Attempts > MaxAttempts THEN
        EXIT;  // Safety exit
    END_IF;
    
UNTIL Position > Target END_REPEAT;

// Retry logic
REPEAT
    Success := TryOperation();
    RetryCount := RetryCount + 1;
UNTIL Success OR (RetryCount >= 3) END_REPEAT;`}
			height="350px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Loop Control</h2>

	<div class="mb-6">
		<CodeExample
			code={`// EXIT - immediately exit the loop
FOR I := 1 TO 100 DO
    IF ErrorCondition THEN
        EXIT;  // Jump out of loop
    END_IF;
    ProcessStep(I);
END_FOR;

// CONTINUE - skip to next iteration
FOR I := 1 TO 10 DO
    IF SensorValues[I] < 0 THEN
        CONTINUE;  // Skip negative values
    END_IF;
    ValidSum := ValidSum + SensorValues[I];
END_FOR;

// RETURN - exit function/program
IF CriticalError THEN
    RETURN;  // Exit immediately
END_IF;`}
			height="400px"
		/>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Next Steps</h3>
		<div class="space-y-2">
			<a
				href="/docs/functions"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ User-Defined Functions and Function Blocks
			</a>
			<a
				href="/docs/standard-function-blocks"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Standard Function Blocks (Timers, Counters)
			</a>
		</div>
	</div>
</article>
