<script lang="ts">
	import CodeExample from './CodeExample.svelte';

	let {
		title = 'VS Code with ControlForge Extension',
		files = [],
		height = '500px'
	}: {
		title?: string;
		files?: Array<{ name: string; content: string; active?: boolean }>;
		height?: string;
	} = $props();

	let activeFileIndex = $state(0);

	// Default example files if none provided
	const defaultFiles = [
		{
			name: 'main.st',
			content: `PROGRAM MainProgram
VAR
    Counter: INT := 0;
    Timer1: TON;
    StartButton: BOOL;
    StopButton: BOOL;
    MotorRunning: BOOL;
END_VAR

// Main program logic
IF StartButton AND NOT StopButton THEN
    MotorRunning := TRUE;
    Counter := Counter + 1;
ELSIF StopButton THEN
    MotorRunning := FALSE;
    Counter := 0;
END_IF;

// Timer example
Timer1(IN := MotorRunning, PT := T#5s);
IF Timer1.Q THEN
    // Timer elapsed - perform action
    Counter := 0;
END_IF;

END_PROGRAM`,
			active: true
		},
		{
			name: 'functions.st',
			content: `FUNCTION CalculateTemperature : REAL
VAR_INPUT
    RawValue: INT;
    Offset: REAL := 0.0;
    Scale: REAL := 1.0;
END_VAR

// Convert raw sensor value to temperature
CalculateTemperature := (RawValue * Scale) + Offset;

END_FUNCTION

FUNCTION_BLOCK PIDController
VAR_INPUT
    Setpoint: REAL;
    ProcessValue: REAL;
    Kp, Ki, Kd: REAL;
END_VAR
VAR_OUTPUT
    Output: REAL;
END_VAR
VAR
    Error, LastError: REAL;
    Integral: REAL;
END_VAR

// Simple PID calculation
Error := Setpoint - ProcessValue;
Integral := Integral + Error;
Output := (Kp * Error) + (Ki * Integral) + (Kd * (Error - LastError));
LastError := Error;

END_FUNCTION_BLOCK`,
			active: false
		}
	];

	let currentFiles = $derived(files.length > 0 ? files : defaultFiles);
	let activeFile = $derived(currentFiles[activeFileIndex]);

	function switchFile(index: number) {
		activeFileIndex = index;
	}
</script>

<div class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg max-w-full">
	<!-- VS Code-style header -->
	<div class="bg-gray-800 text-white px-2 sm:px-4 py-2">
		<div class="flex items-center space-x-2">
			<div class="flex space-x-1">
				<div class="w-3 h-3 rounded-full bg-red-500"></div>
				<div class="w-3 h-3 rounded-full bg-yellow-500"></div>
				<div class="w-3 h-3 rounded-full bg-green-500"></div>
			</div>
			<span class="text-xs sm:text-sm font-medium truncate">{title}</span>
		</div>
	</div>

	<!-- File tabs -->
	<div class="bg-gray-700 border-b border-gray-600 overflow-x-auto">
		<div class="flex min-w-min">
			{#each currentFiles as file, index}
				<button
					class="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-r border-gray-600 transition-colors whitespace-nowrap {index ===
					activeFileIndex
						? 'bg-gray-800 text-white'
						: 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"
					onclick={() => switchFile(index)}
					aria-label="Switch to {file.name}"
					aria-current={index === activeFileIndex ? 'true' : undefined}
				>
					<span class="flex items-center space-x-1 sm:space-x-2">
						<span class="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></span>
						<span>{file.name}</span>
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Editor area -->
	<div class="relative w-full overflow-hidden">
		<CodeExample code={activeFile.content} {height} readonly={true} />
	</div>

	<!-- Status bar -->
	<div
		class="bg-blue-600 text-white px-2 sm:px-4 py-1 text-xs flex items-center justify-between overflow-hidden"
	>
		<div class="flex items-center space-x-2 sm:space-x-4">
			<span class="hidden sm:inline">Structured Text</span>
			<span class="hidden sm:inline">UTF-8</span>
			<span class="hidden md:inline">CRLF</span>
		</div>
		<div class="flex items-center space-x-2 sm:space-x-4 truncate">
			<span class="hidden sm:inline truncate">ControlForge Structured Text Extension v1.1.0</span>
			<span>Ln {activeFile ? activeFile.content.split('\n').length : 0}, Col 1</span>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for VS Code theme */
	:global(.monaco-editor .monaco-scrollable-element > .scrollbar > .slider) {
		background: rgba(121, 121, 121, 0.4) !important;
	}

	:global(.monaco-editor .monaco-scrollable-element > .scrollbar > .slider:hover) {
		background: rgba(100, 100, 100, 0.7) !important;
	}
</style>
