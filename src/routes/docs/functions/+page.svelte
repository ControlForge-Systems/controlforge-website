<script>
  import CanonicalLink from "$lib/components/CanonicalLink.svelte";
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
  <title>Functions & Function Blocks - Structured Text Documentation</title>
  <meta name="description" content="Learn how to create and use functions and function blocks in IEC 61131-3 Structured Text. Master modular programming for industrial automation." />
  <CanonicalLink path="/docs/functions" />
</svelte:head>

<article class="prose prose-lg max-w-none">
  <h1 class="text-3xl font-bold text-gray-900 mb-6">Functions & Function Blocks</h1>
  
  <p class="text-gray-700 mb-6">
    Modular programming with functions and function blocks for code reuse and maintainability.
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

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Functions</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`// Function definition
FUNCTION CalculateArea : REAL
VAR_INPUT
    Length : REAL;
    Width : REAL;
END_VAR

CalculateArea := Length * Width;
END_FUNCTION

// Function with validation
FUNCTION ConvertTemperature : REAL
VAR_INPUT
    Temperature : REAL;
    FromUnit : STRING;
    ToUnit : STRING;
END_VAR

IF FromUnit = 'F' AND ToUnit = 'C' THEN
    ConvertTemperature := (Temperature - 32.0) * 5.0 / 9.0;
ELSIF FromUnit = 'C' AND ToUnit = 'F' THEN
    ConvertTemperature := Temperature * 9.0 / 5.0 + 32.0;
ELSE
    ConvertTemperature := Temperature;  // No conversion
END_IF;
END_FUNCTION

// Using functions
VAR
    RoomArea : REAL;
    TempC : REAL;
END_VAR

RoomArea := CalculateArea(Length := 12.5, Width := 8.0);
TempC := ConvertTemperature(75.0, 'F', 'C');`}
      height="500px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Function Blocks</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`// Function block definition
FUNCTION_BLOCK MotorController
VAR_INPUT
    Start : BOOL;
    Stop : BOOL;
    Speed : REAL;
END_VAR
VAR_OUTPUT
    Running : BOOL;
    Fault : BOOL;
    ActualSpeed : REAL;
END_VAR
VAR
    _internalState : INT;
    _startTimer : TON;
END_VAR

// Start/stop logic
_startTimer(IN := Start, PT := T#500ms);

IF _startTimer.Q AND NOT Stop AND NOT Fault THEN
    Running := TRUE;
    ActualSpeed := Speed;
ELSE
    Running := FALSE;
    ActualSpeed := 0.0;
END_IF;

// Fault detection
IF Speed > 100.0 OR Speed < 0.0 THEN
    Fault := TRUE;
    Running := FALSE;
END_IF;

END_FUNCTION_BLOCK

// Using function blocks
VAR
    Motor1 : MotorController;
    Motor2 : MotorController;
END_VAR

// Call function blocks
Motor1(Start := StartButton1, Stop := StopButton1, Speed := SpeedSetpoint1);
Motor2(Start := StartButton2, Stop := StopButton2, Speed := SpeedSetpoint2);

// Use outputs
Conveyor1Running := Motor1.Running;
Conveyor2Running := Motor2.Running;`}
      height="600px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Variable Declarations</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`FUNCTION_BLOCK AdvancedController
VAR_INPUT
    Enable : BOOL;          // Input from external source
    Setpoint : REAL;        // Target value
END_VAR
VAR_OUTPUT
    Output : REAL;          // Controlled output
    Ready : BOOL;           // Status indication
END_VAR
VAR_IN_OUT
    Settings : ControlSettings;  // Bidirectional data
END_VAR
VAR
    _internalValue : REAL;  // Private internal variable
    _timer : TON;           // Internal timer
END_VAR
VAR_TEMP
    TempCalc : REAL;        // Temporary calculation
END_VAR

// Function block logic
IF Enable THEN
    TempCalc := Setpoint * Settings.GainFactor;
    Output := TempCalc;
    Ready := TRUE;
ELSE
    Output := 0.0;
    Ready := FALSE;
END_IF;

END_FUNCTION_BLOCK`}
      height="500px"
    />
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Practical Example</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`// Complete example: Tank level controller
FUNCTION_BLOCK TankController
VAR_INPUT
    LevelSensor : REAL;     // Tank level 0-100%
    FillEnable : BOOL;      // Allow filling
    EmptyEnable : BOOL;     // Allow emptying
END_VAR
VAR_OUTPUT
    FillValve : BOOL;       // Fill valve control
    EmptyValve : BOOL;      // Empty valve control
    HighAlarm : BOOL;       // High level alarm
    LowAlarm : BOOL;        // Low level alarm
END_VAR
VAR
    HighLevel : REAL := 90.0;    // High alarm setpoint
    LowLevel : REAL := 10.0;     // Low alarm setpoint
    FillLevel : REAL := 75.0;    // Stop filling
    EmptyLevel : REAL := 25.0;   // Stop emptying
END_VAR

// Alarm logic
HighAlarm := LevelSensor > HighLevel;
LowAlarm := LevelSensor < LowLevel;

// Fill control
IF FillEnable AND NOT HighAlarm THEN
    FillValve := LevelSensor < FillLevel;
ELSE
    FillValve := FALSE;
END_IF;

// Empty control
IF EmptyEnable AND NOT LowAlarm THEN
    EmptyValve := LevelSensor > EmptyLevel;
ELSE
    EmptyValve := FALSE;
END_IF;

END_FUNCTION_BLOCK

// Implementation
VAR
    Tank1 : TankController;
    Tank2 : TankController;
END_VAR

Tank1(LevelSensor := AnalogInput1, 
      FillEnable := AutoMode, 
      EmptyEnable := AutoMode);
      
Tank2(LevelSensor := AnalogInput2, 
      FillEnable := AutoMode, 
      EmptyEnable := AutoMode);`}
      height="600px"
    />
  </div>

  <div class="bg-green-50 border border-green-200 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-green-800 mb-3">🚀 Next Steps</h3>
    <div class="space-y-2">
      <a href="/docs/standard-function-blocks" class="block text-sm text-brand-blue hover:text-blue-800 transition-colors">
        → Standard Function Blocks (Timers, Counters)
      </a>
      <a href="/docs/best-practices" class="block text-sm text-brand-blue hover:text-blue-800 transition-colors">
        → Best Practices for Professional Development
      </a>
    </div>
  </div>
</article>
