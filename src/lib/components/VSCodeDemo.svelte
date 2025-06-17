<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { configureMonacoEnvironment } from '$lib/monaco-config';
  import CodeExample from './CodeExample.svelte';
  
  export let title: string = 'VS Code with ControlForge Extension';
  export let files: Array<{name: string, content: string, active?: boolean}> = [];
  export let height: string = '500px';
  
  let activeFileIndex = 0;
  
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
  
  $: currentFiles = files.length > 0 ? files : defaultFiles;
  $: activeFile = currentFiles[activeFileIndex];
  
  // Initialize Monaco configuration when component loads
  if (browser) {
    configureMonacoEnvironment();
  }
  
  function switchFile(index: number) {
    activeFileIndex = index;
  }
</script>

<div class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
  <!-- VS Code-style header -->
  <div class="bg-gray-800 text-white px-4 py-2">
    <div class="flex items-center space-x-2">
      <div class="flex space-x-1">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span class="text-sm font-medium">{title}</span>
    </div>
  </div>
  
  <!-- File tabs -->
  <div class="bg-gray-700 border-b border-gray-600">
    <div class="flex">
      {#each currentFiles as file, index}
        <button
          class="px-4 py-2 text-sm font-medium border-r border-gray-600 transition-colors {
            index === activeFileIndex 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }"
          on:click={() => switchFile(index)}
        >
          <span class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>{file.name}</span>
          </span>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Editor area -->
  <div class="relative pl-0"> <!-- Attempt to reduce left padding -->
    {#if activeFile}
      <CodeExample 
        code={activeFile.content}
        {height}
        readonly={true}
      />
    {/if}
  </div>
  
  <!-- Status bar -->
  <div class="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <span>Structured Text</span>
      <span>UTF-8</span>
      <span>CRLF</span>
    </div>
    <div class="flex items-center space-x-4">
      <span>ControlForge Structured Text Extension v1.1.0</span>
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
