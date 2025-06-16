<script>
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
  <title>Standard Function Blocks - Structured Text Documentation</title>
  <meta name="description" content="Complete reference for IEC 61131-3 standard function blocks including timers (TON, TOF, TP), counters (CTU, CTD, CTUD), edge detection (R_TRIG, F_TRIG), and bistable elements (RS, SR)." />
</svelte:head>

<article class="prose prose-lg max-w-none">
  <h1 class="text-3xl font-bold text-gray-900 mb-6">Standard Function Blocks</h1>
  
  <p class="text-gray-700 mb-6">
    IEC 61131-3 defines a comprehensive set of standard function blocks that provide essential 
    timing, counting, and logic functions for industrial automation applications.
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

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Timer Function Blocks</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`VAR
    OnDelayTimer : TON;     // Timer On Delay
    OffDelayTimer : TOF;    // Timer Off Delay  
    PulseTimer : TP;        // Timer Pulse
    
    StartSignal : BOOL := FALSE;
    StopSignal : BOOL := FALSE;
    TriggerPulse : BOOL := FALSE;
    
    MotorRunning : BOOL;
    AlarmActive : BOOL;
    PulseOutput : BOOL;
END_VAR

// TON - Timer On Delay
// Output goes TRUE after input has been TRUE for preset time
OnDelayTimer(
    IN := StartSignal,
    PT := T#5s
);
MotorRunning := OnDelayTimer.Q;

// TOF - Timer Off Delay  
// Output goes FALSE after input has been FALSE for preset time
OffDelayTimer(
    IN := NOT StopSignal,
    PT := T#3s
);
AlarmActive := OffDelayTimer.Q;

// TP - Timer Pulse
// Output pulse for preset duration when input goes TRUE
PulseTimer(
    IN := TriggerPulse,
    PT := T#500ms
);
PulseOutput := PulseTimer.Q;`}
      title="Timer Function Blocks (TON, TOF, TP)"
      height="600px"
    />
  </div>

  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 mb-3">TON - Timer On Delay</h3>
      <p class="text-blue-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-blue-700 text-sm space-y-1">
        <li>• <strong>IN:</strong> Start input (BOOL)</li>
        <li>• <strong>PT:</strong> Preset time (TIME)</li>
        <li>• <strong>Q:</strong> Timer output (BOOL)</li>
        <li>• <strong>ET:</strong> Elapsed time (TIME)</li>
      </ul>
      <p class="text-blue-700 text-sm mt-3">
        Delays the TRUE signal by the preset time.
      </p>
    </div>
    
    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-green-800 mb-3">TOF - Timer Off Delay</h3>
      <p class="text-green-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-green-700 text-sm space-y-1">
        <li>• <strong>IN:</strong> Input signal (BOOL)</li>
        <li>• <strong>PT:</strong> Preset time (TIME)</li>
        <li>• <strong>Q:</strong> Timer output (BOOL)</li>
        <li>• <strong>ET:</strong> Elapsed time (TIME)</li>
      </ul>
      <p class="text-green-700 text-sm mt-3">
        Delays the FALSE signal by the preset time.
      </p>
    </div>
    
    <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-purple-800 mb-3">TP - Timer Pulse</h3>
      <p class="text-purple-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-purple-700 text-sm space-y-1">
        <li>• <strong>IN:</strong> Trigger input (BOOL)</li>
        <li>• <strong>PT:</strong> Pulse duration (TIME)</li>
        <li>• <strong>Q:</strong> Pulse output (BOOL)</li>
        <li>• <strong>ET:</strong> Elapsed time (TIME)</li>
      </ul>
      <p class="text-purple-700 text-sm mt-3">
        Generates a pulse of fixed duration.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Counter Function Blocks</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`VAR
    UpCounter : CTU;        // Count Up
    DownCounter : CTD;      // Count Down
    UpDownCounter : CTUD;   // Count Up/Down
    
    CountPulse : BOOL := FALSE;
    ResetCounter : BOOL := FALSE;
    LoadCounter : BOOL := FALSE;
    CountDownPulse : BOOL := FALSE;
    
    PartCount : INT;
    RemainingParts : INT;
    TotalParts : INT;
    BatchComplete : BOOL;
    BatchEmpty : BOOL;
END_VAR

// CTU - Counter Up
UpCounter(
    CU := CountPulse,       // Count up on rising edge
    R := ResetCounter,      // Reset to 0
    PV := 100              // Preset value (limit)
);
PartCount := UpCounter.CV;        // Current value
BatchComplete := UpCounter.Q;     // TRUE when CV >= PV

// CTD - Counter Down  
DownCounter(
    CD := CountDownPulse,   // Count down on rising edge
    LD := LoadCounter,      // Load preset value
    PV := 50               // Preset value (start value)
);
RemainingParts := DownCounter.CV; // Current value
BatchEmpty := DownCounter.Q;      // TRUE when CV <= 0

// CTUD - Counter Up/Down
UpDownCounter(
    CU := CountPulse,       // Count up input
    CD := CountDownPulse,   // Count down input
    R := ResetCounter,      // Reset to 0
    LD := LoadCounter,      // Load preset value
    PV := 200              // Preset value
);
TotalParts := UpDownCounter.CV;   // Current value
// QU = TRUE when CV >= PV, QD = TRUE when CV <= 0`}
      title="Counter Function Blocks (CTU, CTD, CTUD)"
      height="700px"
    />
  </div>

  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-orange-800 mb-3">CTU - Count Up</h3>
      <p class="text-orange-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-orange-700 text-sm space-y-1">
        <li>• <strong>CU:</strong> Count up input (BOOL)</li>
        <li>• <strong>R:</strong> Reset input (BOOL)</li>
        <li>• <strong>PV:</strong> Preset value (INT)</li>
        <li>• <strong>Q:</strong> Output (CV ≥ PV)</li>
        <li>• <strong>CV:</strong> Current value (INT)</li>
      </ul>
    </div>
    
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-800 mb-3">CTD - Count Down</h3>
      <p class="text-red-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-red-700 text-sm space-y-1">
        <li>• <strong>CD:</strong> Count down input (BOOL)</li>
        <li>• <strong>LD:</strong> Load input (BOOL)</li>
        <li>• <strong>PV:</strong> Preset value (INT)</li>
        <li>• <strong>Q:</strong> Output (CV ≤ 0)</li>
        <li>• <strong>CV:</strong> Current value (INT)</li>
      </ul>
    </div>
    
    <div class="bg-teal-50 border border-teal-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-teal-800 mb-3">CTUD - Count Up/Down</h3>
      <p class="text-teal-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-teal-700 text-sm space-y-1">
        <li>• <strong>CU:</strong> Count up input (BOOL)</li>
        <li>• <strong>CD:</strong> Count down input (BOOL)</li>
        <li>• <strong>R:</strong> Reset input (BOOL)</li>
        <li>• <strong>LD:</strong> Load input (BOOL)</li>
        <li>• <strong>PV:</strong> Preset value (INT)</li>
        <li>• <strong>QU:</strong> Up output (CV ≥ PV)</li>
        <li>• <strong>QD:</strong> Down output (CV ≤ 0)</li>
        <li>• <strong>CV:</strong> Current value (INT)</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Edge Detection Function Blocks</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`VAR
    RisingEdge : R_TRIG;    // Rising edge detection
    FallingEdge : F_TRIG;   // Falling edge detection
    
    StartButton : BOOL := FALSE;
    StopButton : BOOL := FALSE;
    EmergencyStop : BOOL := TRUE;
    
    StartPulse : BOOL;
    StopPulse : BOOL;
    EmergencyPulse : BOOL;
    MotorRunning : BOOL := FALSE;
    
    // Edge trigger counters for diagnostics
    StartButtonPresses : INT := 0;
    EmergencyActivations : INT := 0;
END_VAR

// R_TRIG - Rising Edge Trigger
// Output pulse on FALSE to TRUE transition
RisingEdge(CLK := StartButton);
StartPulse := RisingEdge.Q;

// F_TRIG - Falling Edge Trigger  
// Output pulse on TRUE to FALSE transition
FallingEdge(CLK := EmergencyStop);
EmergencyPulse := FallingEdge.Q;

// Application logic using edge detection
IF StartPulse THEN
    MotorRunning := TRUE;
    StartButtonPresses := StartButtonPresses + 1;
END_IF;

IF StopButton OR EmergencyPulse THEN
    MotorRunning := FALSE;
    IF EmergencyPulse THEN
        EmergencyActivations := EmergencyActivations + 1;
    END_IF;
END_IF;`}
      title="Edge Detection Function Blocks (R_TRIG, F_TRIG)"
      height="550px"
    />
  </div>

  <div class="mb-6">
    <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
      <h3 class="text-lg font-semibold text-green-800 mb-3">R_TRIG - Rising Edge</h3>
      <p class="text-green-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-green-700 text-sm space-y-1">
        <li>• <strong>CLK:</strong> Input signal (BOOL)</li>
        <li>• <strong>Q:</strong> Edge output (BOOL)</li>
      </ul>
      <p class="text-green-700 text-sm mt-3">
        Q is TRUE for one scan when CLK changes from FALSE to TRUE.
      </p>
    </div>
    
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-800 mb-3">F_TRIG - Falling Edge</h3>
      <p class="text-red-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-red-700 text-sm space-y-1">
        <li>• <strong>CLK:</strong> Input signal (BOOL)</li>
        <li>• <strong>Q:</strong> Edge output (BOOL)</li>
      </ul>
      <p class="text-red-700 text-sm mt-3">
        Q is TRUE for one scan when CLK changes from TRUE to FALSE.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bistable Function Blocks</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`VAR
    SetResetLatch : RS;     // Set dominant bistable
    ResetSetLatch : SR;     // Reset dominant bistable
    
    SetSignal : BOOL := FALSE;
    ResetSignal : BOOL := FALSE;
    
    MotorEnabled : BOOL;
    AlarmLatch : BOOL;
    SystemReady : BOOL;
    MaintenanceMode : BOOL;
END_VAR

// RS - Set Reset Bistable (Set dominant)
// If both S and R1 are TRUE, Q1 = TRUE (Set wins)
SetResetLatch(
    S := SetSignal,         // Set input
    R1 := ResetSignal      // Reset input
);
MotorEnabled := SetResetLatch.Q1;

// SR - Set Reset Bistable (Reset dominant)  
// If both S1 and R are TRUE, Q1 = FALSE (Reset wins)
ResetSetLatch(
    S1 := SetSignal,       // Set input
    R := ResetSignal       // Reset input
);
SystemReady := ResetSetLatch.Q1;

// Practical alarm latch example
VAR
    AlarmRS : RS;
    OverTemperature : BOOL;
    AckButton : BOOL;
    AlarmAcknowledged : BOOL;
END_VAR

AlarmRS(
    S := OverTemperature,   // Set on alarm condition
    R1 := AckButton        // Reset when acknowledged
);
AlarmLatch := AlarmRS.Q1;

// Combined logic
AlarmAcknowledged := AckButton AND AlarmLatch;`}
      title="Bistable Function Blocks (RS, SR)"
      height="650px"
    />
  </div>

  <div class="mb-6">
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
      <h3 class="text-lg font-semibold text-yellow-800 mb-3">RS - Set Dominant</h3>
      <p class="text-yellow-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-yellow-700 text-sm space-y-1">
        <li>• <strong>S:</strong> Set input (BOOL)</li>
        <li>• <strong>R1:</strong> Reset input (BOOL)</li>
        <li>• <strong>Q1:</strong> Output (BOOL)</li>
      </ul>
      <p class="text-yellow-700 text-sm mt-3">
        When both S and R1 are TRUE, Q1 = TRUE (Set wins).
      </p>
    </div>
    
    <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-indigo-800 mb-3">SR - Reset Dominant</h3>
      <p class="text-indigo-700 text-sm mb-3"><strong>Members:</strong></p>
      <ul class="text-indigo-700 text-sm space-y-1">
        <li>• <strong>S1:</strong> Set input (BOOL)</li>
        <li>• <strong>R:</strong> Reset input (BOOL)</li>
        <li>• <strong>Q1:</strong> Output (BOOL)</li>
      </ul>
      <p class="text-indigo-700 text-sm mt-3">
        When both S1 and R are TRUE, Q1 = FALSE (Reset wins).
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Practical Application Example</h2>
  
  <div class="mb-6">
    <CodeExample 
      code={`PROGRAM ConveyorControl
VAR
    // Inputs
    StartButton : BOOL;
    StopButton : BOOL;
    EmergencyStop : BOOL;
    PartSensor : BOOL;
    PhotoEye : BOOL;
    
    // Standard function blocks
    StartButtonEdge : R_TRIG;
    StopButtonEdge : R_TRIG;
    EStopEdge : F_TRIG;
    PartCounterEdge : R_TRIG;
    
    StartupTimer : TON;
    RunTimer : TON;
    PartCounter : CTU;
    SystemLatch : SR;
    
    // Outputs
    ConveyorMotor : BOOL;
    StatusLight : BOOL;
    AlarmBuzzer : BOOL;
    
    // Variables
    SystemRunning : BOOL;
    PartCount : INT;
    OperationTime : TIME;
END_VAR

// Edge detection for buttons
StartButtonEdge(CLK := StartButton);
StopButtonEdge(CLK := StopButton);
EStopEdge(CLK := EmergencyStop);
PartCounterEdge(CLK := PartSensor);

// System control latch (Reset dominant for safety)
SystemLatch(
    S1 := StartButtonEdge.Q,
    R := StopButtonEdge.Q OR EStopEdge.Q
);
SystemRunning := SystemLatch.Q1;

// Startup delay
StartupTimer(
    IN := SystemRunning,
    PT := T#3s
);

// Run timer for operation tracking
RunTimer(
    IN := StartupTimer.Q,
    PT := T#999h  // Long time for continuous operation
);
OperationTime := RunTimer.ET;

// Part counting
PartCounter(
    CU := PartCounterEdge.Q,
    R := NOT SystemRunning,
    PV := 1000
);
PartCount := PartCounter.CV;

// Output control
ConveyorMotor := StartupTimer.Q AND NOT EmergencyStop;
StatusLight := SystemRunning;
AlarmBuzzer := EStopEdge.Q OR PartCounter.Q;

END_PROGRAM`}
      title="Complete Conveyor Control Example"
      height="800px"
    />
  </div>

  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-blue-800 mb-3">🚀 Key Benefits of Standard Function Blocks</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• <strong>Standardization:</strong> Consistent behavior across different PLC platforms</li>
      <li>• <strong>Reliability:</strong> Well-tested implementations with predictable timing</li>
      <li>• <strong>Efficiency:</strong> Optimized performance for real-time control systems</li>
      <li>• <strong>Maintainability:</strong> Familiar interfaces for all automation engineers</li>
      <li>• <strong>Safety:</strong> Proven components for safety-critical applications</li>
    </ul>
  </div>
</article>
