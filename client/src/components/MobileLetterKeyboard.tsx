import { useCallback, useRef } from 'react';
import type { KeyDefinition } from '../types';

interface MobileLetterKeyboardProps {
  keys: KeyDefinition[];
  activeNotes: Set<number>;
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
}

export function MobileLetterKeyboard({
  keys,
  activeNotes,
  onNoteOn,
  onNoteOff,
}: MobileLetterKeyboardProps) {
  const activePointers = useRef<Set<number>>(new Set());

  const blackKeys = keys.filter((k) => k.isBlack);
  const whiteKeys = keys.filter((k) => !k.isBlack);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, midiNote: number) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointers.current.add(e.pointerId);
      onNoteOn(midiNote);
    },
    [onNoteOn]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, midiNote: number) => {
      if (activePointers.current.has(e.pointerId)) {
        activePointers.current.delete(e.pointerId);
        onNoteOff(midiNote);
      }
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    },
    [onNoteOff]
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, midiNote: number) => {
      activePointers.current.delete(e.pointerId);
      onNoteOff(midiNote);
    },
    [onNoteOff]
  );

  const renderKey = (key: KeyDefinition, variant: 'black' | 'white') => {
    const isActive = activeNotes.has(key.midiNote);
    const isBlack = variant === 'black';

    return (
      <button
        key={key.keyBinding}
        type="button"
        aria-label={`Play ${key.label || key.keyBinding}`}
        className={`piano-key flex min-h-[44px] flex-col items-center justify-center rounded-lg border transition-all duration-75 select-none ${
          isBlack
            ? `border-stone-600 bg-stone-800 text-stone-200 ${
                isActive
                  ? 'translate-y-0.5 border-harmony-500 bg-harmony-900 shadow-inner shadow-harmony-600/40 ring-1 ring-harmony-400'
                  : 'active:translate-y-0.5 active:bg-harmony-950'
              }`
            : `border-stone-300/30 bg-stone-100 text-stone-800 ${
                isActive
                  ? 'translate-y-0.5 border-harmony-400 bg-harmony-200 shadow-inner shadow-harmony-500/30 ring-1 ring-harmony-500'
                  : 'active:translate-y-0.5 active:bg-harmony-100'
              }`
        }`}
        onPointerDown={(e) => handlePointerDown(e, key.midiNote)}
        onPointerUp={(e) => handlePointerUp(e, key.midiNote)}
        onPointerCancel={(e) => handlePointerCancel(e, key.midiNote)}
        onContextMenu={(e) => e.preventDefault()}
      >
        {key.label && (
          <span className={`text-[10px] font-bold ${isBlack ? 'text-harmony-400' : 'text-blue-600'}`}>
            {key.label}
          </span>
        )}
        <span className={`font-mono font-semibold ${isBlack ? 'text-sm' : 'text-base'}`}>
          {key.keyBinding}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-1.5">
      <p className="text-center text-[10px] text-stone-500">
        Tap letters to play — same keys as laptop keyboard
      </p>

      {/* Black / sharp keys row */}
      <div className="grid grid-cols-9 gap-1">
        {blackKeys.map((key) => renderKey(key, 'black'))}
      </div>

      {/* White / main keys row */}
      <div className="grid grid-cols-7 gap-1 sm:grid-cols-14">
        {whiteKeys.map((key) => renderKey(key, 'white'))}
      </div>
    </div>
  );
}
