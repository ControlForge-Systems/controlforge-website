<script>
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import ArticleSchema from '$lib/components/ArticleSchema.svelte';
	import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<svelte:head>
	<title>Standard Functions Reference - Structured Text Documentation</title>
	<meta
		name="description"
		content="Complete reference for IEC 61131-3 standard functions including type conversion, mathematical functions, string functions, and date/time functions."
	/>
	<CanonicalLink path="/docs/standard-functions" />
	<ArticleSchema
		headline="Standard Functions Reference"
		description="Complete reference for IEC 61131-3 standard functions including type conversion, mathematical functions, string functions, and date/time functions."
		url="/docs/standard-functions"
	/>
</svelte:head>

<article class="prose prose-lg max-w-none">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Standard Functions Reference</h1>

	<p class="text-gray-700 mb-6">
		IEC 61131-3 defines a comprehensive library of standard functions for type conversion,
		mathematical operations, string manipulation, and date/time handling essential for industrial
		automation applications.
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

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Type Conversion Functions</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    // Source values
    BoolVal : BOOL := TRUE;
    IntVal : INT := 42;
    DIntVal : DINT := 123456;
    RealVal : REAL := 25.75;
    StringVal : STRING := '3.14159';
    
    // Conversion results
    ConvertedInt : INT;
    ConvertedReal : REAL;
    ConvertedString : STRING;
    ConvertedBool : BOOL;
END_VAR

// Boolean conversions
ConvertedInt := BOOL_TO_INT(BoolVal);        // TRUE → 1, FALSE → 0
ConvertedReal := BOOL_TO_REAL(BoolVal);      // TRUE → 1.0, FALSE → 0.0
ConvertedString := BOOL_TO_STRING(BoolVal);  // TRUE → 'TRUE', FALSE → 'FALSE'

// Integer conversions  
ConvertedBool := INT_TO_BOOL(IntVal);        // 0 → FALSE, ≠0 → TRUE
ConvertedReal := INT_TO_REAL(IntVal);        // 42 → 42.0
ConvertedString := INT_TO_STRING(IntVal);    // 42 → '42'

// Real conversions
ConvertedInt := REAL_TO_INT(RealVal);        // 25.75 → 25 (truncated)
ConvertedString := REAL_TO_STRING(RealVal);  // 25.75 → '25.75'

// String conversions (with error handling)
ConvertedReal := STRING_TO_REAL(StringVal);  // '3.14159' → 3.14159
ConvertedInt := STRING_TO_INT('100');        // '100' → 100
ConvertedBool := STRING_TO_BOOL('TRUE');     // 'TRUE' → TRUE

// Extended type conversions
ConvertedLReal := DINT_TO_LREAL(DIntVal);    // 32-bit to 64-bit real
ConvertedWord := INT_TO_WORD(IntVal);        // Reinterpret as bit string`}
			title="Type Conversion Functions"
			height="600px"
		/>
	</div>

	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-yellow-800 mb-3">⚠️ Conversion Safety Guidelines</h3>
		<ul class="text-yellow-700 text-sm space-y-1">
			<li>• Always validate string-to-number conversions for invalid input</li>
			<li>• Check for overflow when converting to smaller data types</li>
			<li>• Real-to-integer conversion truncates (doesn't round)</li>
			<li>• Use exception handling for string conversion errors</li>
			<li>• Consider locale settings for decimal point formatting</li>
		</ul>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Mathematical Functions</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    InputValue : REAL := -15.7;
    Angle : REAL := 30.0;      // Degrees
    AngleRad : REAL;           // Radians
    
    // Results
    AbsResult : REAL;
    SqrtResult : REAL;
    TrigResults : REAL;
    LogResults : REAL;
    RoundResults : INT;
END_VAR

// Basic mathematical functions
AbsResult := ABS(InputValue);           // |-15.7| = 15.7
SqrtResult := SQRT(25.0);               // √25 = 5.0

// Trigonometric functions (angles in radians)
AngleRad := Angle * 3.14159 / 180.0;    // Convert degrees to radians
TrigResults := SIN(AngleRad);           // sin(30°) = 0.5
TrigResults := COS(AngleRad);           // cos(30°) = 0.866
TrigResults := TAN(AngleRad);           // tan(30°) = 0.577

// Inverse trigonometric functions
TrigResults := ASIN(0.5);               // arcsin(0.5) = 0.524 rad (30°)
TrigResults := ACOS(0.866);             // arccos(0.866) = 0.524 rad (30°)
TrigResults := ATAN(1.0);               // arctan(1.0) = 0.785 rad (45°)

// Logarithmic and exponential functions
LogResults := LN(2.71828);              // Natural log: ln(e) = 1.0
LogResults := LOG(100.0);               // Base-10 log: log₁₀(100) = 2.0
LogResults := EXP(1.0);                 // Exponential: e¹ = 2.71828

// Rounding functions
RoundResults := TRUNC(15.7);            // Truncate: 15.7 → 15
RoundResults := ROUND(15.7);            // Round: 15.7 → 16
RoundResults := CEIL(15.1);             // Ceiling: 15.1 → 16
RoundResults := FLOOR(15.9);            // Floor: 15.9 → 15

// Power function
LogResults := EXPT(2.0, 3.0);          // 2³ = 8.0

// Modulo operation
RoundResults := MOD(17, 5);             // 17 mod 5 = 2`}
			title="Mathematical Functions"
			height="650px"
		/>
	</div>

	<div class="mb-6">
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
			<h3 class="text-lg font-semibold text-blue-800 mb-3">Basic Math Functions</h3>
			<ul class="text-blue-700 text-sm space-y-1">
				<li>• <strong>ABS(x):</strong> Absolute value</li>
				<li>• <strong>SQRT(x):</strong> Square root</li>
				<li>• <strong>EXPT(x,y):</strong> x raised to power y</li>
				<li>• <strong>MOD(x,y):</strong> x modulo y</li>
			</ul>
		</div>

		<div class="bg-green-50 border border-green-200 rounded-lg p-6">
			<h3 class="text-lg font-semibold text-green-800 mb-3">Trigonometric Functions</h3>
			<ul class="text-green-700 text-sm space-y-1">
				<li>• <strong>SIN/COS/TAN:</strong> Basic trig functions</li>
				<li>• <strong>ASIN/ACOS/ATAN:</strong> Inverse functions</li>
				<li>• <strong>Note:</strong> All angles in radians</li>
				<li>• <strong>π ≈ 3.14159265359</strong></li>
			</ul>
		</div>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">String Functions</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    SourceString : STRING := 'Hello World Programming';
    SubString : STRING := 'World';
    NewString : STRING;
    Position : INT;
    StringLength : INT;
    
    FirstName : STRING := 'John';
    LastName : STRING := 'Smith';
    FullName : STRING;
    
    DataString : STRING := 'Temperature: 25.5°C';
    ExtractedValue : STRING;
END_VAR

// String length
StringLength := LEN(SourceString);      // Returns 21

// Extract substrings
NewString := LEFT(SourceString, 5);     // 'Hello'
NewString := RIGHT(SourceString, 11);   // 'Programming'  
NewString := MID(SourceString, 7, 5);   // 'World' (start at pos 7, length 5)

// String concatenation
FullName := CONCAT(FirstName, ' ', LastName);  // 'John Smith'
// Alternative syntax for multiple strings
FullName := CONCAT(CONCAT(FirstName, ' '), LastName);

// String search
Position := FIND(SourceString, SubString);     // Returns 7 (1-based index)
Position := FIND(SourceString, 'XYZ');         // Returns 0 (not found)

// String insertion
NewString := INSERT(SourceString, ' Beautiful', 6);  
// Result: 'Hello Beautiful World Programming'

// String deletion  
NewString := DELETE(SourceString, 6, 6);       // Remove 6 chars from pos 6
// Result: 'Hello Programming'

// String replacement
NewString := REPLACE(SourceString, 'World', 'Universe', 1);
// Result: 'Hello Universe Programming'

// Practical example: Extract numeric value from string
Position := FIND(DataString, ': ');            // Find ': ' position
IF Position > 0 THEN
    ExtractedValue := MID(DataString, Position + 2, 4);  // Extract '25.5'
END_IF;

// String comparison (case-sensitive)
IF SourceString = 'Hello World Programming' THEN
    // Strings match exactly
END_IF;`}
			title="String Manipulation Functions"
			height="700px"
		/>
	</div>

	<div class="mb-6">
		<div class="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
			<h3 class="text-lg font-semibold text-purple-800 mb-3">String Analysis Functions</h3>
			<ul class="text-purple-700 text-sm space-y-1">
				<li>• <strong>LEN(str):</strong> String length</li>
				<li>• <strong>FIND(str, sub):</strong> Find substring position</li>
				<li>• <strong>LEFT(str, n):</strong> First n characters</li>
				<li>• <strong>RIGHT(str, n):</strong> Last n characters</li>
				<li>• <strong>MID(str, pos, len):</strong> Substring</li>
			</ul>
		</div>

		<div class="bg-teal-50 border border-teal-200 rounded-lg p-6">
			<h3 class="text-lg font-semibold text-teal-800 mb-3">String Modification Functions</h3>
			<ul class="text-teal-700 text-sm space-y-1">
				<li>• <strong>CONCAT(str1, str2):</strong> Join strings</li>
				<li>• <strong>INSERT(str, sub, pos):</strong> Insert substring</li>
				<li>• <strong>DELETE(str, pos, len):</strong> Remove characters</li>
				<li>• <strong>REPLACE(str, old, new, n):</strong> Replace substring</li>
			</ul>
		</div>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Date and Time Functions</h2>

	<div class="mb-6">
		<CodeExample
			code={`VAR
    // Time values
    Duration1 : TIME := T#5h30m;
    Duration2 : TIME := T#2h15m;
    TotalTime : TIME;
    RemainingTime : TIME;
    
    // Date values
    StartDate : DATE := D#2024-01-15;
    EndDate : DATE := D#2024-06-15;
    ProjectDuration : TIME;
    
    // Date and time combination
    StartDateTime : DATE_AND_TIME := DT#2024-06-15-08:30:00;
    EndDateTime : DATE_AND_TIME;
    
    // Time of day
    StartTime : TIME_OF_DAY := TOD#08:30:00;
    EndTime : TIME_OF_DAY := TOD#17:00:00;
    WorkingHours : TIME;
END_VAR

// Time arithmetic
TotalTime := ADD_TIME(Duration1, Duration2);        // T#7h45m
RemainingTime := SUB_TIME(Duration1, Duration2);    // T#3h15m

// Date arithmetic (if supported by implementation)
ProjectDuration := SUB_DATE(EndDate, StartDate);    // Difference in days
EndDate := ADD_TIME_TO_DATE(StartDate, T#150d);     // Add 150 days

// Combining date and time
EndDateTime := CONCAT_DATE_TOD(EndDate, EndTime);   
// Result: DT#2024-06-15-17:00:00

// Extract components
VAR
    CurrentYear : INT;
    CurrentMonth : INT;
    CurrentDay : INT;
    CurrentHour : INT;
    CurrentMinute : INT;
END_VAR

// Extract date/time components (implementation-specific)
CurrentYear := YEAR(StartDateTime);         // 2024
CurrentMonth := MONTH(StartDateTime);       // 6
CurrentDay := DAY(StartDateTime);          // 15
CurrentHour := HOUR(StartDateTime);        // 8
CurrentMinute := MINUTE(StartDateTime);    // 30

// Time comparison
IF Duration1 > Duration2 THEN
    // Duration1 is longer
END_IF;

// Working time calculation
WorkingHours := SUB_TOD(EndTime, StartTime);        // T#8h30m

// Practical example: Shift timing
VAR
    ShiftStart : TIME_OF_DAY := TOD#06:00:00;
    ShiftEnd : TIME_OF_DAY := TOD#14:00:00;
    CurrentTime : TIME_OF_DAY;
    InShift : BOOL;
END_VAR

CurrentTime := GetCurrentTOD();  // System function
InShift := (CurrentTime >= ShiftStart) AND (CurrentTime <= ShiftEnd);`}
			title="Date and Time Functions"
			height="700px"
		/>
	</div>

	<div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
		<h3 class="text-lg font-semibold text-orange-800 mb-3">Date/Time Function Categories</h3>
		<div class="text-orange-700 text-sm">
			<div class="mb-4">
				<p class="font-medium mb-2">Arithmetic Functions:</p>
				<ul class="space-y-1">
					<li>• <strong>ADD_TIME:</strong> Add time durations</li>
					<li>• <strong>SUB_TIME:</strong> Subtract time durations</li>
					<li>• <strong>ADD_TIME_TO_DATE:</strong> Add time to date</li>
					<li>• <strong>SUB_DATE:</strong> Subtract dates</li>
				</ul>
			</div>
			<div>
				<p class="font-medium mb-2">Combination Functions:</p>
				<ul class="space-y-1">
					<li>• <strong>CONCAT_DATE_TOD:</strong> Combine date and time</li>
					<li>• <strong>SPLIT_DT:</strong> Split date/time</li>
					<li>• <strong>Various extractors:</strong> YEAR, MONTH, DAY, etc.</li>
				</ul>
			</div>
		</div>
	</div>

	<h2 class="text-2xl font-semibold text-gray-800 mb-4">Practical Application Examples</h2>

	<div class="mb-6">
		<CodeExample
			code={`// Process monitoring with data logging
FUNCTION_BLOCK ProcessMonitor
VAR_INPUT
    ProcessValue : REAL;
    Setpoint : REAL;
    ProcessName : STRING;
END_VAR

VAR_OUTPUT
    LogMessage : STRING;
    AlarmStatus : BOOL;
END_VAR

VAR
    Deviation : REAL;
    DeviationPercent : REAL;
    TimeStamp : STRING;
    ValueString : STRING;
END_VAR

// Calculate process deviation
Deviation := ProcessValue - Setpoint;
DeviationPercent := ABS(Deviation / Setpoint) * 100.0;

// Convert values to strings for logging
ValueString := REAL_TO_STRING(ProcessValue);
TimeStamp := DT_TO_STRING(GetCurrentDateTime());

// Build log message
LogMessage := CONCAT(TimeStamp, ': ');
LogMessage := CONCAT(LogMessage, ProcessName);
LogMessage := CONCAT(LogMessage, ' = ');
LogMessage := CONCAT(LogMessage, ValueString);

// Alarm check
AlarmStatus := DeviationPercent > 10.0;
IF AlarmStatus THEN
    LogMessage := CONCAT(LogMessage, ' [ALARM]');
END_IF;

END_FUNCTION_BLOCK

// Recipe calculation system
FUNCTION CalculateIngredientAmount : REAL
VAR_INPUT
    RecipeString : STRING;      // Format: "Ingredient:Percentage"
    BatchSize : REAL;
END_VAR

VAR
    ColonPos : INT;
    PercentString : STRING;
    PercentValue : REAL;
END_VAR

// Parse recipe string
ColonPos := FIND(RecipeString, ':');
IF ColonPos > 0 THEN
    PercentString := RIGHT(RecipeString, LEN(RecipeString) - ColonPos);
    PercentValue := STRING_TO_REAL(PercentString);
    CalculateIngredientAmount := BatchSize * PercentValue / 100.0;
ELSE
    CalculateIngredientAmount := 0.0;  // Error in format
END_IF;

END_FUNCTION`}
			title="Practical Applications of Standard Functions"
			height="600px"
		/>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-green-800 mb-3">🎯 Function Selection Guidelines</h3>
		<ul class="text-green-700 text-sm space-y-2">
			<li>
				• <strong>Type Conversion:</strong> Always validate inputs and handle errors gracefully
			</li>
			<li>
				• <strong>Mathematical:</strong> Consider precision requirements and valid input ranges
			</li>
			<li>
				• <strong>String Functions:</strong> Be aware of 1-based indexing and string length limits
			</li>
			<li>
				• <strong>Date/Time:</strong> Understand timezone handling and system clock synchronization
			</li>
			<li>• <strong>Performance:</strong> Cache results of expensive calculations when possible</li>
			<li>
				• <strong>Portability:</strong> Some advanced functions may be implementation-specific
			</li>
		</ul>
	</div>
</article>
