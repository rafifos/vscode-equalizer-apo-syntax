# Change Log

All notable changes to the "equalizer-apo-syntax" extension will be documented in this file.

## [0.3.0] - 2025-04-02

### Added

- Support for semicolon (;) comments in addition to hash (#) comments
- Added support for the "S" parameter (slope) for shelf filters
- Enhanced filter parameter documentation and completions
- Improved parameter suggestions based on filter type context
- Added more detailed documentation for all filter parameters
- Added more examples in documentation showing different parameter formats

### Changed

- Updated syntax highlighting to better match real-world Equalizer APO configurations
- Improved filter parameter completions to avoid suggesting incompatible parameters
- Enhanced documentation for shelf filters to include slope parameter information
- Updated invalid line detection to recognize semicolon comments

### Fixed

- Fixed handling of shelf filter parameters in completions
- Fixed parameter suggestions to avoid duplicates and incompatible combinations

## [0.3.0] - 2025-04-02

### Added

- Enhanced documentation for all filter types, commands, constants, operators, and functions
- Improved completion provider with detailed documentation and context-aware suggestions
- Added snippets with placeholders for filter parameters
- Added semantic token provider to highlight invalid lines as comments (matching Equalizer APO's behavior)
- Added document formatting provider for proper indentation of conditional blocks
- Added expression completions for constants, functions, and operators
- Added hover documentation with markdown formatting
- Improved README with more detailed information

### Changed

- Enhanced syntax highlighting patterns for better matching of Equalizer APO configuration format
- Improved parameter recognition with specific highlighting for different parameter types
- Reorganized code with a separate documentation module
- Updated templates with more comprehensive examples

### Fixed

- Fixed handling of invalid lines to match Equalizer APO's behavior of silently ignoring them
- Fixed escape sequences in syntax highlighting patterns

## [0.1.0] - 2025-04-02

- Initial release
- Basic syntax highlighting for Equalizer APO configuration files
- Support for all commands documented in the configuration reference
- Support for inline expressions
