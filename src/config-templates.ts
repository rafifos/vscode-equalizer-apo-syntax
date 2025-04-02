export interface ConfigTemplate {
  name: string;
  description: string;
  content: string;
}

export const templates: ConfigTemplate[] = [
  {
    name: "Basic Configuration",
    description: "A simple configuration with preamp and basic filters",
    content: `# Equalizer APO Configuration File
# Created: {{date}}

# Global preamp to prevent clipping
Preamp: -6 dB

# Channel selection
Channel: all

# Example filters
Filter 1: ON PK Fc 1000 Hz Gain 0.0 dB Q 1.41
Filter 2: ON HP Fc 20 Hz

# Add your configuration below
`,
  },
  {
    name: "Stereo Configuration",
    description: "Configuration for stereo setup with channel-specific filters",
    content: `# Equalizer APO Stereo Configuration
# Created: {{date}}

# Global preamp to prevent clipping
Preamp: -6 dB

# Left channel configuration
Channel: L
Filter 1: ON PK Fc 100 Hz Gain 2.0 dB Q 1.0
Filter 2: ON HS Fc 10000 Hz Gain -1.5 dB

# Right channel configuration
Channel: R
Filter 1: ON PK Fc 100 Hz Gain 2.0 dB Q 1.0
Filter 2: ON HS Fc 10000 Hz Gain -1.5 dB

# Add your configuration below
`,
  },
  {
    name: "Surround Configuration",
    description: "Configuration for 5.1 surround setup",
    content: `# Equalizer APO 5.1 Surround Configuration
# Created: {{date}}

# Global preamp to prevent clipping
Preamp: -6 dB

# Front speakers
Channel: L R
Filter 1: ON HP Fc 80 Hz
Filter 2: ON PK Fc 1000 Hz Gain 0.0 dB Q 1.41

# Center channel
Channel: C
Filter 1: ON HP Fc 80 Hz
Filter 2: ON PK Fc 2000 Hz Gain -1.0 dB Q 1.0

# Subwoofer
Channel: LFE
Filter 1: ON LP Fc 120 Hz

# Surround speakers
Channel: RL RR
Filter 1: ON HP Fc 80 Hz

# Add your configuration below
`,
  },
  {
    name: "Advanced Configuration",
    description: "Advanced configuration with conditional processing",
    content: `# Equalizer APO Advanced Configuration
# Created: {{date}}

# Global preamp to prevent clipping
Preamp: -6 dB

# Sample rate dependent processing
If: sampleRate == 44100
  # Settings for 44.1 kHz
  Eval: maxFreq = 20000
ElseIf: sampleRate == 48000
  # Settings for 48 kHz
  Eval: maxFreq = 22000
ElseIf: sampleRate == 96000
  # Settings for 96 kHz
  Eval: maxFreq = 40000
Else:
  # Default settings
  Eval: maxFreq = 20000
EndIf:

# Apply filters based on sample rate
Filter 1: ON HP Fc 20 Hz
Filter 2: ON LP Fc \`maxFreq * 0.9\` Hz

# Channel-specific processing
Channel: all
GraphicEQ: 20 0; 50 0; 100 0; 200 0; 500 0; 1000 0; 2000 0; 5000 0; 10000 0; 20000 0

# Add your configuration below
`,
  },
];

export function getTemplateContent(
  templateName: string,
  customizations: Record<string, string> = {},
): string {
  const template = templates.find((t) => t.name === templateName) || templates[0];
  let content = template?.content;

  // Replace date placeholder
  content = content?.replace(/{{date}}/g, new Date().toLocaleString());

  // Replace any custom placeholders
  for (const [key, value] of Object.entries(customizations)) {
    content = content?.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return content as string;
}
