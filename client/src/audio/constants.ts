export const SAMPLE_URL = '/harmonium-kannan-orig.wav';
export const REVERB_URL = '/reverb.wav';

export const OCTAVE_MAP = [-36, -24, -12, 0, 12, 24, 36] as const;
export const MIDDLE_C = 60;
export const ROOT_KEY = 62;
export const LOOP_START = 0.5;
export const SLOT_COUNT = 128;

export const BASE_KEY_NAMES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
] as const;

/** Exact keyboard → MIDI note mapping from the original Web Harmonium */
export const KEYBOARD_MAP: Record<string, number> = {
  s: 53, S: 53,
  a: 54, A: 54,
  '`': 55,
  '1': 56,
  q: 57, Q: 57,
  '2': 58,
  w: 59, W: 59,
  e: 60, E: 60,
  '4': 61,
  r: 62, R: 62,
  '5': 63,
  t: 64, T: 64,
  y: 65, Y: 65,
  '7': 66,
  u: 67, U: 67,
  '8': 68,
  i: 69, I: 69,
  '9': 70,
  o: 71, O: 71,
  p: 72, P: 72,
  '-': 73,
  '[': 74,
  '=': 75,
  ']': 76,
  '\\': 77,
  "'": 78,
  ';': 79,
};
