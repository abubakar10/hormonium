import { useCallback, useState } from 'react';
import type { MobilePlayMode } from '../components/MobilePlayChooser';

const STORAGE_KEY = 'webharmonium.mobilePlayMode';

export function useMobilePlayMode(isMobile: boolean, loaded: boolean) {
  const [mode, setMode] = useState<MobilePlayMode | null>(() => {
    if (!isMobile) return null;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved === 'phone-keyboard' || saved === 'touch-piano') return saved;
    } catch {
      /* ignore */
    }
    return null;
  });

  const selectMode = useCallback((next: MobilePlayMode) => {
    setMode(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const clearMode = useCallback(() => {
    setMode(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const showChooser = isMobile && loaded && mode === null;

  return { mode, selectMode, clearMode, showChooser };
}
