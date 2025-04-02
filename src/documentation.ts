// Documentation for filter types
export const filterTypes: Record<string, string> = {
  PK: `**Peaking Filter (Parametric EQ)**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required
- Q: Q value - Required

Example: \`ON PK Fc 50.0 Hz Gain -10.0 dB Q 2.50\`

Creates a bell-shaped boost or cut at the specified frequency.`,

  Modal: `**Modal Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required
- Q: Q value - Required
- T60 target: Decay time (ms) - Optional

Example: \`ON Modal Fc 100 Hz Gain 3.0 dB Q 5.41 T60 target 100 ms\`

Special type of peaking filter for modal resonance control.`,

  PEQ: `**Parametric EQ Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required
- BW Oct: Bandwidth in octaves - Required

Example: \`ON PEQ Fc 100 Hz Gain 1.0 dB BW Oct 0.167\`

Parametric EQ using bandwidth instead of Q factor.`,

  LP: `**Low-Pass Filter**

Parameters:
- Fc: Cutoff frequency (Hz) - Required

Example: \`ON LP Fc 8000 Hz\`

Attenuates frequencies above the cutoff frequency.`,

  LPQ: `**Low-Pass Filter with Q**

Parameters:
- Fc: Cutoff frequency (Hz) - Required
- Q: Q value - Required

Example: \`ON LPQ Fc 10000 Hz Q 0.400\`

Low-pass filter with adjustable Q factor.`,

  HP: `**High-Pass Filter**

Parameters:
- Fc: Cutoff frequency (Hz) - Required

Example: \`ON HP Fc 30.0 Hz\`

Attenuates frequencies below the cutoff frequency.`,

  HPQ: `**High-Pass Filter with Q**

Parameters:
- Fc: Cutoff frequency (Hz) - Required
- Q: Q value - Required

Example: \`ON HPQ Fc 20.0 Hz Q 0.500\`

High-pass filter with adjustable Q factor.`,

  BP: `**Band-Pass Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Q: Q value - Optional

Example: \`ON BP Fc 1000 Hz Q 0.100\`

Passes frequencies within a certain range and attenuates frequencies outside that range.`,

  LS: `**Low-Shelf Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON LS Fc 300 Hz Gain 5.0 dB\`

Boosts or cuts frequencies below the center frequency.`,

  LSC: `**Low-Shelf Filter with Center Frequency**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required
- Q: Q value - Optional

Example: \`ON LSC Fc 300 Hz Gain 5.0 dB Q 0.6473\`

Low-shelf filter with adjustable Q factor.`,

  HS: `**High-Shelf Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON HS Fc 1000 Hz Gain -3.0 dB\`

Boosts or cuts frequencies above the center frequency.`,

  HSC: `**High-Shelf Filter with Center Frequency**

Parameters:
- Fc: Center frequency (Hz) - Required
- Gain: Gain value (dB) - Required
- Q: Q value - Optional

Example: \`ON HSC Fc 100 Hz Gain -6.0 dB Q 0.4272\`

High-shelf filter with adjustable Q factor.`,

  "LS 6dB": `**Low-Shelf Filter (6 dB/octave)**

Parameters:
- Fc: Corner frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON LS 6dB Fc 50.0 Hz Gain 7.2 dB\`

Low-shelf filter with 6 dB per octave slope.`,

  "LS 12dB": `**Low-Shelf Filter (12 dB/octave)**

Parameters:
- Fc: Corner frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON LS 12dB Fc 2000 Hz Gain -5.0 dB\`

Low-shelf filter with 12 dB per octave slope.`,

  "HS 6dB": `**High-Shelf Filter (6 dB/octave)**

Parameters:
- Fc: Corner frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON HS 6dB Fc 12000 Hz Gain 10.0 dB\`

High-shelf filter with 6 dB per octave slope.`,

  "HS 12dB": `**High-Shelf Filter (12 dB/octave)**

Parameters:
- Fc: Corner frequency (Hz) - Required
- Gain: Gain value (dB) - Required

Example: \`ON HS 12dB Fc 500 Hz Gain 5.0 dB\`

High-shelf filter with 12 dB per octave slope.`,

  NO: `**Notch Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Q: Q value - Optional

Example: \`ON NO Fc 800 Hz\`

Rejects a narrow band of frequencies.`,

  AP: `**All-Pass Filter**

Parameters:
- Fc: Center frequency (Hz) - Required
- Q: Q value - Required

Example: \`ON AP Fc 900 Hz Q 0.707\`

Passes all frequencies but changes the phase relationship.`,

  IIR: `**IIR Filter with Custom Coefficients**

Parameters:
- Order: Filter order - Required
- Coefficients: Filter coefficients - Required

Example: \`ON IIR Order 2 Coefficients 0.0380602 0.0761205 0.0380602 1.2706 -1.84776 0.729402\`

Generic IIR filter with custom coefficients. The number of coefficients must be 2*(order+1).`,
};

// Documentation for commands
export const commands: Record<string, string> = {
  Preamp: `**Preamp Command**

Syntax: \`Preamp: <Negative number> dB\`

Sets a preamplification value in decibels. This is useful when you are using filters with positive gain, to make sure that no clipping occurs. When multiple preamps apply to the same channel, the resulting preamp is the sum in dB.

Example: \`Preamp: -6.5 dB\``,

  Filter: `**Filter Command**

Syntax:
\`Filter <n>: ON <Type> Fc <Frequency> Hz Gain <Gain value> dB Q <Q value>\`
\`Filter <n>: ON <Type> Fc <Frequency> Hz Gain <Gain value> dB BW Oct <Bandwidth value>\`

Adds a filter of the specified type with the specified frequency, gain and Q / bandwidth. The filter number (n) is not interpreted and can be omitted.

Example: \`Filter 1: ON PK Fc 1000 Hz Gain -3.0 dB Q 1.41\``,

  Delay: `**Delay Command**

Syntax:
\`Delay: <t> ms\`
\`Delay: <n> samples\`

Delays the audio on the selected channels by t milliseconds or n samples. Milliseconds should be preferred because they will give equal delay independent of the sample rate.

Example: \`Delay: 50.5 ms\``,

  Copy: `**Copy Command**

Syntax:
\`Copy: <Target channel>=<Factor>*<Source channel>+...\`
\`Copy: <Target channel>=<Source channel>+...\`
\`Copy: <Target channel>=<Constant value>+...\`

Replaces the audio on the target channel by the sum of the given source channels with optional factors. To add instead of replace the audio on the target channel, the target channel itself can also be a source channel.

Example: \`Copy: L=L+0.5*R\``,

  GraphicEQ: `**GraphicEQ Command**

Syntax:
\`GraphicEQ: <Frequency> <Gain (dB)>; <Frequency> <Gain (dB)>; ...\`

Adds a graphic equalizer with the specified number of bands and corresponding gain values. The gain values are interpolated linearly in the logarithmic frequency spectrum between the specified bands.

Example: \`GraphicEQ: 25 6; 40 4.5; 63 3; 100 1.5; 160 0; 250 0; 400 0\``,

  Convolution: `**Convolution Command**

Syntax:
\`Convolution: <File name>\`

Adds a convolver that processes the signal using the impulse response contained in the specified file. The file must be in one of the formats supported by libsndfile (e.g. wav, flac or ogg).

Example: \`Convolution: church.wav\``,

  Include: `**Include Command**

Syntax:
\`Include: <File name>\`

Loads the given file as a configuration file. Instead of directly replacing config.txt, it can be better to load the actual filter definition from a separate file.

Example: \`Include: example.txt\``,

  Device: `**Device Command**

Syntax:
\`Device: <Device pattern 1>; <Device pattern 2>; ...\`

Matches the given pattern to the connection name, device name and GUID of the current output device. If the pattern does not match, all following commands except Device commands are ignored.

Example: \`Device: High Definition Audio Device Speakers; Benchmark\``,

  Channel: `**Channel Command**

Syntax:
\`Channel: <Channel position 1> <Channel position 2> ...\`

Selects the channels to which the following Filter and Preamp commands will be applied. Channel positions can be given by identifier (acronym of 1 up to 3 characters) or by number (counted from 1).

Example: \`Channel: L R\``,

  Stage: `**Stage Command**

Syntax:
\`Stage: <stage 1> <stage 2>\`

Specifies on which stage(s) the following filtering commands will be executed. For output devices, there are two stages: pre-mix and post-mix.

Example: \`Stage: pre-mix\``,

  If: `**If Command**

Syntax:
\`If: <expression>\`

Conditionally executes the commands between If and EndIf. When the command If is encountered, its expression is evaluated and converted to a boolean value. If the result is true, the following commands are executed, otherwise they are skipped.

Example: \`If: sampleRate == 48000\``,

  ElseIf: `**ElseIf Command**

Syntax:
\`ElseIf: <expression>\`

Alternative condition for If command. If the previous If or ElseIf command evaluated to false, the expression of the ElseIf command is evaluated and the following commands are executed if the expression evaluated to true.

Example: \`ElseIf: sampleRate == 44100\``,

  Else: `**Else Command**

Syntax:
\`Else:\`

Executed if all previous conditions in an If/ElseIf block were false.

Example: \`Else:\``,

  EndIf: `**EndIf Command**

Syntax:
\`EndIf:\`

Ends a conditional execution block started with If.

Example: \`EndIf:\``,

  Eval: `**Eval Command**

Syntax:
\`Eval: <expression>\`

Evaluates the expression without using its result any further. It is mainly useful to define variables or for testing purposes.

Example: \`Eval: a=0; b=pi\``,
};

// Documentation for constants
export const constants: Record<string, string> = {
  e: `**Mathematical Constant e**

The base of the natural logarithm, approximately 2.71828.`,

  pi: `**Mathematical Constant π**

The ratio of a circle's circumference to its diameter, approximately 3.14159.`,

  inputChannelCount: `**Input Channel Count**

Number of channels that are input to the current APO stage.`,

  outputChannelCount: `**Output Channel Count**

Number of channels that are output from the current APO stage.`,

  sampleRate: `**Sample Rate**

Sample rate (in Hz) of the audio in process.`,

  deviceName: `**Device Name**

Name of the audio device.`,

  connectionName: `**Connection Name**

Name of the connection on the audio device.`,

  deviceGuid: `**Device GUID**

GUID of the audio device endpoint.`,

  stage: `**Current Stage**

Current APO stage (can be pre-mix, post-mix or capture).`,

  true: `**Boolean Constant true**

Boolean constant representing true value.`,

  false: `**Boolean Constant false**

Boolean constant representing false value.`,
};

// Documentation for operators
export const operators: Record<string, string> = {
  "+": `**Addition Operator**

Adds two values. Also used for string concatenation when at least one argument is a string.`,

  "-": `**Subtraction Operator**

Subtracts the right operand from the left operand.`,

  "*": `**Multiplication Operator**

Multiplies two values.`,

  "/": `**Division Operator**

Divides the left operand by the right operand.`,

  "^": `**Exponentiation Operator**

Raises the left operand to the power of the right operand.`,

  "=": `**Assignment Operator**

Assigns the value of the right operand to the left operand.`,

  "+=": `**Addition Assignment Operator**

Adds the right operand to the left operand and assigns the result to the left operand.`,

  "-=": `**Subtraction Assignment Operator**

Subtracts the right operand from the left operand and assigns the result to the left operand.`,

  "*=": `**Multiplication Assignment Operator**

Multiplies the left operand by the right operand and assigns the result to the left operand.`,

  "/=": `**Division Assignment Operator**

Divides the left operand by the right operand and assigns the result to the left operand.`,

  "==": `**Equality Operator**

Returns true if the operands are equal.`,

  "!=": `**Inequality Operator**

Returns true if the operands are not equal.`,

  "<": `**Less Than Operator**

Returns true if the left operand is less than the right operand.`,

  ">": `**Greater Than Operator**

Returns true if the left operand is greater than the right operand.`,

  "<=": `**Less Than or Equal Operator**

Returns true if the left operand is less than or equal to the right operand.`,

  ">=": `**Greater Than or Equal Operator**

Returns true if the left operand is greater than or equal to the right operand.`,

  and: `**Logical AND Operator**

Returns true if both operands are true.`,

  or: `**Logical OR Operator**

Returns true if either operand is true.`,

  xor: `**Logical XOR Operator**

Returns true if exactly one of the operands is true.`,

  "&": `**Bitwise AND Operator**

Performs a bitwise AND operation on the operands.`,

  "|": `**Bitwise OR Operator**

Performs a bitwise OR operation on the operands.`,

  "<<": `**Left Shift Operator**

Shifts the left operand left by the number of bits specified by the right operand.`,

  ">>": `**Right Shift Operator**

Shifts the left operand right by the number of bits specified by the right operand.`,

  "?:": `**Conditional (Ternary) Operator**

Evaluates a condition and returns one value if the condition is true and another value if the condition is false.
Syntax: \`condition ? value_if_true : value_if_false\``,
};

// Documentation for functions
export const functions: Record<string, string> = {
  abs: `**Absolute Value Function**

Syntax: \`abs(x)\`

Returns the absolute value of x.`,

  sin: `**Sine Function**

Syntax: \`sin(x)\`

Returns the sine of x (x in radians).`,

  cos: `**Cosine Function**

Syntax: \`cos(x)\`

Returns the cosine of x (x in radians).`,

  tan: `**Tangent Function**

Syntax: \`tan(x)\`

Returns the tangent of x (x in radians).`,

  sinh: `**Hyperbolic Sine Function**

Syntax: \`sinh(x)\`

Returns the hyperbolic sine of x.`,

  cosh: `**Hyperbolic Cosine Function**

Syntax: \`cosh(x)\`

Returns the hyperbolic cosine of x.`,

  tanh: `**Hyperbolic Tangent Function**

Syntax: \`tanh(x)\`

Returns the hyperbolic tangent of x.`,

  ln: `**Natural Logarithm Function**

Syntax: \`ln(x)\`

Returns the natural logarithm (base e) of x.`,

  log: `**Logarithm Function**

Syntax: \`log(x)\`

Returns the natural logarithm (base e) of x. Alias for ln().`,

  log10: `**Base-10 Logarithm Function**

Syntax: \`log10(x)\`

Returns the base-10 logarithm of x.`,

  exp: `**Exponential Function**

Syntax: \`exp(x)\`

Returns e raised to the power of x.`,

  sqrt: `**Square Root Function**

Syntax: \`sqrt(x)\`

Returns the square root of x.`,

  min: `**Minimum Function**

Syntax: \`min(x, y, ...)\`

Returns the smallest of the provided values.`,

  max: `**Maximum Function**

Syntax: \`max(x, y, ...)\`

Returns the largest of the provided values.`,

  sum: `**Sum Function**

Syntax: \`sum(x, y, ...)\`

Returns the sum of the provided values.`,

  str2dbl: `**String to Double Function**

Syntax: \`str2dbl(str)\`

Converts a string to a floating-point number.`,

  strlen: `**String Length Function**

Syntax: \`strlen(str)\`

Returns the length of the string.`,

  tolower: `**To Lowercase Function**

Syntax: \`tolower(str)\`

Converts a string to lowercase.`,

  toupper: `**To Uppercase Function**

Syntax: \`toupper(str)\`

Converts a string to uppercase.`,

  sizeof: `**Size of Array Function**

Syntax: \`sizeof(array)\`

Returns the length of the array.`,

  regexSearch: `**Regular Expression Search Function**

Syntax: \`regexSearch(pattern, string)\`

Searches for the first match of pattern in string. Returns an array with the whole match as the first value and capturing groups as further values. Returns an empty array if no match is found.`,

  regexReplace: `**Regular Expression Replace Function**

Syntax: \`regexReplace(pattern, string, replacement)\`

Replaces all matches of pattern in string with replacement. Returns the resulting string.`,

  readRegString: `**Read Registry String Function**

Syntax: \`readRegString(key, value)\`

Reads a string value from the specified registry key. Automatically monitors the registry key for changes and initiates a configuration reload on any value change.`,

  readRegDWORD: `**Read Registry DWORD Function**

Syntax: \`readRegDWORD(key, value)\`

Reads a DWORD (32-bit integer) value from the specified registry key. Automatically monitors the registry key for changes and initiates a configuration reload on any value change.`,
};
