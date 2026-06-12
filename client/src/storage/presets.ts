import type { HarmoniumSettings, Preset } from '../types';

const PRESETS_KEY = 'web-harmonium:presets';

export const DEFAULT_SETTINGS: HarmoniumSettings = {
  volume: 0.3,
  reverb: false,
  transpose: 0,
  octave: 3,
  additionalReeds: 0,
};

/** Read settings using the same localStorage keys as the original Web Harmonium */
export function loadSettings(): HarmoniumSettings {
  try {
    const volume = localStorage.getItem('webharmonium.volume');
    const useReverb = localStorage.getItem('webharmonium.useReverb');
    const octave = localStorage.getItem('webharmonium.octave');
    const transpose = localStorage.getItem('webharmonium.transpose');
    const stack = localStorage.getItem('webharmonium.stack');

    return {
      volume: volume != null ? Number(volume) / 100 : DEFAULT_SETTINGS.volume,
      reverb: useReverb != null ? useReverb === 'true' : DEFAULT_SETTINGS.reverb,
      octave: octave != null ? parseInt(octave, 10) : DEFAULT_SETTINGS.octave,
      transpose: transpose != null ? parseInt(transpose, 10) : DEFAULT_SETTINGS.transpose,
      additionalReeds: stack != null ? parseInt(stack, 10) : DEFAULT_SETTINGS.additionalReeds,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Save settings using the same localStorage keys as the original Web Harmonium */
export function saveSettings(settings: HarmoniumSettings): void {
  localStorage.setItem('webharmonium.volume', String(Math.round(settings.volume * 100)));
  localStorage.setItem('webharmonium.useReverb', settings.reverb ? 'true' : 'false');
  localStorage.setItem('webharmonium.octave', String(settings.octave));
  localStorage.setItem('webharmonium.transpose', String(settings.transpose));
  localStorage.setItem('webharmonium.stack', String(settings.additionalReeds));
}

export function loadPresets(): Preset[] {
  try {
    const raw = localStorage.getItem(PRESETS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Preset[];
  } catch {
    return [];
  }
}

export function savePreset(name: string, settings: HarmoniumSettings): Preset {
  const presets = loadPresets();
  const preset: Preset = {
    id: crypto.randomUUID(),
    name: name.trim(),
    ...settings,
    savedAt: Date.now(),
  };
  presets.unshift(preset);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets.slice(0, 50)));
  return preset;
}

export function deletePreset(id: string): void {
  const presets = loadPresets().filter((p) => p.id !== id);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}
