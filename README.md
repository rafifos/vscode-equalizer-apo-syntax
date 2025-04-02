# Equalizer APO Syntax Highlighter

This extension provides syntax highlighting for Equalizer APO configuration files, making it easier to read and edit your audio processing configurations.

![Syntax Highlighting Example](images/syntax-example.png)
> Theme: Cattpuccin Frappé, Font: Iosevka (Custom) 16

## Features

- Comprehensive syntax highlighting for all Equalizer APO commands
- Support for inline expressions with mathematical and logical operators
- Highlighting for filter types, parameters, and values
- Recognition of channel identifiers and stage names
- Support for conditional statements and expressions
- Automatic file association for common Equalizer APO configuration files
- Hover information for commands, filter types, and expressions
- Auto-completion with detailed documentation for commands, filter types, and parameters
- Multiple configuration templates for quick setup
- Automatic indentation for conditional blocks
- Highlighting of invalid lines as comments (matching Equalizer APO's behavior)

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install equalizer-apo-syntax` to find the extension
4. Click the Install button

### From VSIX File

1. Download the `.vsix` file from the [releases page](https://github.com/yourusername/equalizer-apo-syntax/releases)
2. In VS Code, go to the Extensions view (`Ctrl+Shift+X`)
3. Click the "..." menu in the top-right of the Extensions view
4. Select "Install from VSIX..." and choose the downloaded file

## Usage

### File Recognition

The extension automatically recognizes files with the following patterns:

- Any `.txt` file in a directory path containing `EqualizerAPO/config/`

For other files, you can manually set the language mode to "Equalizer APO" by:

1. Clicking on the language indicator in the bottom-right corner of VS Code
2. Selecting "Equalizer APO" from the list

### Creating New Configuration Files

You can create new Equalizer APO configuration files with predefined templates:

1. Right-click on a folder in the Explorer view
2. Select "Equalizer APO: Create New Configuration File"
3. Choose a template from the list
4. Enter a filename (default: `config.txt`)

Available templates:

- Basic Configuration
- Stereo Configuration
- Surround Configuration
- Advanced Configuration

### Editing Features

While editing Equalizer APO configuration files, you can:

- Hover over commands, filter types, and expression elements to see detailed documentation
- Use auto-completion for commands, filter types, parameters, and expression elements
- Format the document to properly indent conditional blocks
- See invalid lines highlighted as comments (matching Equalizer APO's behavior of silently ignoring them)

## Supported Commands

### Filtering Commands

- **Preamp**: Sets a preamplification value in decibels
- **Filter**: Adds various types of audio filters (PK, LP, HP, BP, LS, HS, etc.)
- **Delay**: Delays the audio by milliseconds or samples
- **Copy**: Copies and mixes audio between channels
- **GraphicEQ**: Creates a graphic equalizer with multiple bands
- **Convolution**: Processes audio using an impulse response file

### Control Commands

- **Include**: Loads another configuration file
- **Device**: Selects devices to which the following commands apply
- **Channel**: Selects channels to which the following commands apply
- **Stage**: Specifies on which stage(s) the following commands will be executed

### Expression Commands

- **If / ElseIf / Else / EndIf**: Conditionally executes commands
- **Eval**: Evaluates expressions and defines variables
- **Inline expressions**: Embeds expression results in command parameters using backticks

## Filter Types

Equalizer APO supports a wide range of filter types, all of which are highlighted and documented in this extension:

- **PK/Modal/PEQ**: Peaking/Parametric EQ filters
- **LP/LPQ**: Low-pass filters
- **HP/HPQ**: High-pass filters
- **BP**: Band-pass filter
- **LS/LSC**: Low-shelf filters
- **HS/HSC**: High-shelf filters
- **NO**: Notch filter
- **AP**: All-pass filter
- **IIR**: Custom IIR filter with coefficients
