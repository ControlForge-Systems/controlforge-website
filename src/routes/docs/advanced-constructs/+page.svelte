<script>
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
	import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
	<title>Advanced Language Constructs - Structured Text Documentation</title>
	<meta
		name="description"
		content="Advanced IEC 61131-3 features including CONFIGURATION, RESOURCE, TASK, INTERFACE, METHOD, PROPERTY, NAMESPACE, and object-oriented programming constructs."
	/>
	<CanonicalLink path="/docs/advanced-constructs" />
	<ArticleSchema
		headline="Advanced Language Constructs"
		description="Advanced IEC 61131-3 features including CONFIGURATION, RESOURCE, TASK, INTERFACE, METHOD, PROPERTY, NAMESPACE, and object-oriented programming constructs."
		url="/docs/advanced-constructs"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Advanced Language Constructs</h1>

	<p class="text-gray-700 mb-6">
		Advanced IEC 61131-3 features for complex system organization and object-oriented programming.
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

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">System Organization</h2>

	<div class="mb-6">
		<CodeExample
			code={`// CONFIGURATION - Top level system organization
CONFIGURATION MainSystem
    VAR_GLOBAL
        SystemMode : INT := 1;        // 1=Auto, 2=Manual, 3=Maintenance
        EmergencyStop : BOOL := FALSE;
    END_VAR
    
    // Resource declaration - Processing unit assignment
    RESOURCE CPU_1 ON PLC_Unit
        // Task scheduling
        TASK MainTask(INTERVAL := T#10ms, PRIORITY := 1);
        TASK SlowTask(INTERVAL := T#100ms, PRIORITY := 5);
        
        // Program assignment to tasks
        PROGRAM MainControl WITH MainTask : ControlProgram;
        PROGRAM DataLogging WITH SlowTask : LoggingProgram;
    END_RESOURCE
END_CONFIGURATION`}
			title="Configuration and Resource Management"
			height="400px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Object-Oriented Programming</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Interface definition
INTERFACE IMotor
    METHOD Start : BOOL
    METHOD Stop : BOOL
    PROPERTY Speed : REAL
    PROPERTY IsRunning : BOOL
END_INTERFACE

// Function block implementing interface
FUNCTION_BLOCK ServoMotor IMPLEMENTS IMotor
VAR
    _speed : REAL;
    _isRunning : BOOL;
END_VAR

METHOD Start : BOOL
    _isRunning := TRUE;
    Start := TRUE;
END_METHOD

METHOD Stop : BOOL
    _isRunning := FALSE;
    _speed := 0.0;
    Stop := TRUE;
END_METHOD

PROPERTY Speed : REAL
    GET
        Speed := _speed;
    END_GET
    SET
        _speed := Speed;
    END_SET
END_PROPERTY`}
			title="Interfaces, Methods, and Properties"
			height="500px"
		/>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Namespaces</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Namespace declaration
NAMESPACE Motors
    // Motor-related function blocks and functions
    FUNCTION_BLOCK StepperMotor
        // Implementation
    END_FUNCTION_BLOCK
    
    FUNCTION CalculateSteps : DINT
        // Implementation
    END_FUNCTION
END_NAMESPACE

NAMESPACE Sensors
    FUNCTION_BLOCK TemperatureSensor
        // Implementation
    END_FUNCTION_BLOCK
END_NAMESPACE

// Using namespace elements
USING Motors;
USING Sensors;

VAR
    Motor1 : Motors.StepperMotor;
    TempSensor : TemperatureSensor;    // Available through USING
END_VAR`}
			title="Namespace Organization"
			height="400px"
		/>
	</div>

	<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-blue-800 mb-3">Key Advanced Features</h3>
		<ul class="text-blue-700 text-sm space-y-1">
			<li>• <strong>CONFIGURATION/RESOURCE:</strong> System-level organization</li>
			<li>• <strong>TASK:</strong> Scheduling and priority management</li>
			<li>• <strong>INTERFACE:</strong> Contract definitions for function blocks</li>
			<li>• <strong>METHOD:</strong> Object-oriented behavior implementation</li>
			<li>• <strong>PROPERTY:</strong> Controlled access to internal data</li>
			<li>• <strong>NAMESPACE:</strong> Code organization and modularity</li>
		</ul>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Next Steps</h3>
		<div class="space-y-2">
			<a
				href="/docs/best-practices"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Best Practices for Professional Development
			</a>
			<a
				href="/docs/examples"
				class="block text-sm text-brand-blue hover:text-blue-800 transition-colors"
			>
				→ Practical Examples and Patterns
			</a>
		</div>
	</div>
</article>
