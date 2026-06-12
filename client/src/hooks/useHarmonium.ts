import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { harmoniumEngine } from '../audio/harmoniumEngine';
import { buildKeyboardLayout, getMidiNoteForKey, getRootKeyFromTranspose } from '../audio/keyboardLayout';
import { loadSettings as readStoredSettings, saveSettings } from '../storage/presets';
import type { HarmoniumSettings } from '../types';

export function useHarmonium() {
  const [settings, setSettings] = useState<HarmoniumSettings>(() => readStoredSettings());
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const pressedBindings = useRef<Set<string>>(new Set());

  const keyboardLayout = useMemo(() => buildKeyboardLayout(), []);

  const bindingMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const key of keyboardLayout) {
      map.set(key.keyBinding.toLowerCase(), key.midiNote);
    }
    return map;
  }, [keyboardLayout]);

  const rootKey = useMemo(
    () => getRootKeyFromTranspose(settings.transpose),
    [settings.transpose]
  );

  const syncEngineSettings = useCallback((s: HarmoniumSettings) => {
    harmoniumEngine.setVolume(s.volume);
    harmoniumEngine.setReverb(s.reverb);
    harmoniumEngine.setTranspose(s.transpose);
    harmoniumEngine.setOctave(s.octave);
    harmoniumEngine.setStackCount(s.additionalReeds);
  }, []);

  const loadHarmonium = useCallback(async () => {
    if (loaded || loading) return;
    setLoading(true);
    setLoadError(null);
    try {
      await harmoniumEngine.load();
      syncEngineSettings(settings);
      setLoaded(true);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load harmonium samples');
    } finally {
      setLoading(false);
    }
  }, [loaded, loading, settings, syncEngineSettings]);

  const playNote = useCallback((midiNote: number) => {
    if (!loaded) return;
    harmoniumEngine.noteOn(midiNote);
    setActiveNotes((prev) => new Set(prev).add(midiNote));
  }, [loaded]);

  const stopNote = useCallback((midiNote: number) => {
    if (!loaded) return;
    harmoniumEngine.noteOff(midiNote);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midiNote);
      return next;
    });
  }, [loaded]);

  useEffect(() => {
    if (loaded) syncEngineSettings(settings);
  }, [settings, loaded, syncEngineSettings]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!loaded || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const midiNote = getMidiNoteForKey(e.key) ?? bindingMap.get(e.key.toLowerCase());
      if (midiNote == null) return;
      if (pressedBindings.current.has(e.key)) return;

      e.preventDefault();
      pressedBindings.current.add(e.key);
      playNote(midiNote);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedBindings.current.delete(e.key);

      const midiNote = getMidiNoteForKey(e.key) ?? bindingMap.get(e.key.toLowerCase());
      if (midiNote != null) stopNote(midiNote);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [bindingMap, playNote, stopNote, loaded]);

  const updateSetting = useCallback(<K extends keyof HarmoniumSettings>(
    key: K,
    value: HarmoniumSettings[K]
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'octave' && next.additionalReeds + (value as number) > 6) {
        next.additionalReeds = 6 - (value as number);
      }
      if (key === 'additionalReeds' && (value as number) + next.octave > 6) {
        next.additionalReeds = 6 - next.octave;
      }
      return next;
    });
  }, []);

  const loadSettings = useCallback((next: HarmoniumSettings) => {
    setSettings(next);
  }, []);

  return {
    settings,
    updateSetting,
    loadSettings,
    keyboardLayout,
    activeNotes,
    loaded,
    loading,
    loadError,
    rootKey,
    playNote,
    stopNote,
    loadHarmonium,
  };
}
