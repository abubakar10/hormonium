export interface HarmoniumSettings {
  volume: number;
  reverb: boolean;
  transpose: number;
  /** Octave index 0–6 (maps to -36…+36 semitone offset) */
  octave: number;
  additionalReeds: number;
}

export interface Preset extends HarmoniumSettings {
  id: string;
  name: string;
  savedAt?: number;
}

export interface KeyDefinition {
  keyBinding: string;
  midiNote: number;
  isBlack: boolean;
  label?: string;
  position?: number;
}

export interface MidiDevice {
  id: string;
  name: string;
}
