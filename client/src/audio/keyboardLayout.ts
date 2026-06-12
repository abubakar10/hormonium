import { BASE_KEY_NAMES, KEYBOARD_MAP } from './constants';
import type { KeyDefinition } from '../types';

/** Visual keyboard layout matching the original SVG key order */
const VISUAL_LAYOUT: Omit<KeyDefinition, 'midiNote'>[] = [
  { keyBinding: '`', isBlack: false },
  { keyBinding: '1', isBlack: true, position: 0.5 },
  { keyBinding: 'q', isBlack: false },
  { keyBinding: '2', isBlack: true, position: 1.5 },
  { keyBinding: 'w', isBlack: false },
  { keyBinding: 'e', isBlack: false, label: 'C' },
  { keyBinding: '4', isBlack: true, position: 3.5 },
  { keyBinding: 'r', isBlack: false, label: 'D' },
  { keyBinding: '5', isBlack: true, position: 4.5 },
  { keyBinding: 't', isBlack: false, label: 'E' },
  { keyBinding: 'y', isBlack: false, label: 'F' },
  { keyBinding: '7', isBlack: true, position: 6.5 },
  { keyBinding: 'u', isBlack: false, label: 'G' },
  { keyBinding: '8', isBlack: true, position: 7.5 },
  { keyBinding: 'i', isBlack: false, label: 'A' },
  { keyBinding: '9', isBlack: true, position: 8.5 },
  { keyBinding: 'o', isBlack: false, label: 'B' },
  { keyBinding: 'p', isBlack: false },
  { keyBinding: '-', isBlack: true, position: 10.5 },
  { keyBinding: '[', isBlack: false },
  { keyBinding: '=', isBlack: true, position: 11.5 },
  { keyBinding: ']', isBlack: false },
  { keyBinding: '\\', isBlack: false },
];

export function buildKeyboardLayout(): KeyDefinition[] {
  return VISUAL_LAYOUT.map((key) => ({
    ...key,
    midiNote: KEYBOARD_MAP[key.keyBinding] ?? 60,
  }));
}

export function getRootKeyFromTranspose(semitones: number): string {
  const index = semitones >= 0 ? semitones % 12 : semitones + 12;
  return BASE_KEY_NAMES[index].replace('#', '♯');
}

export function getMidiNoteForKey(key: string): number | undefined {
  return KEYBOARD_MAP[key];
}
