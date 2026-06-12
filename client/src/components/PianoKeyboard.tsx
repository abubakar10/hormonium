import { useCallback, useMemo, useRef } from 'react';
import type { KeyDefinition } from '../types';

interface PianoKeyboardProps {
  keys: KeyDefinition[];
  activeNotes: Set<number>;
  transpose: number;
  disabled?: boolean;
  isMobile?: boolean;
  fixed?: boolean;
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
}

export function PianoKeyboard({
  keys,
  activeNotes,
  transpose,
  disabled,
  isMobile,
  fixed,
  onNoteOn,
  onNoteOff,
}: PianoKeyboardProps) {
  const activePointers = useRef<Set<number>>(new Set());

  const { whiteKeys, blackKeys } = useMemo(() => {
    const white = keys.filter((k) => !k.isBlack);
    const black = keys.filter((k) => k.isBlack);
    return { whiteKeys: white, blackKeys: black };
  }, [keys]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, midiNote: number) => {
      if (disabled) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointers.current.add(e.pointerId);
      onNoteOn(midiNote);
    },
    [disabled, onNoteOn]
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

  const keyHeight = fixed ? 'h-[8.5rem]' : isMobile ? 'h-40' : 'h-48 sm:h-56';

  const keyboardInner = (
    <div className={`relative flex w-full ${keyHeight}`}>
      {whiteKeys.map((key) => {
        const isActive = activeNotes.has(key.midiNote);
        return (
          <button
            key={key.keyBinding}
            type="button"
            aria-label={`Play note ${key.label || key.keyBinding}`}
            className={`piano-key group relative z-0 min-w-0 flex-1 flex-col items-center justify-end rounded-b-lg border border-stone-300/25 bg-gradient-to-b from-stone-50 to-stone-200 shadow-sm transition-all duration-75 select-none ${
              fixed ? 'mx-px pb-2 pt-1' : isMobile ? 'mx-px pb-3 pt-1' : 'mx-px pb-3'
            } flex ${
              isActive
                ? 'z-10 -translate-y-0.5 from-harmony-50 to-harmony-200 shadow-md shadow-harmony-500/25'
                : 'active:from-harmony-50 active:to-harmony-100 sm:hover:from-white sm:hover:to-stone-100'
            }`}
            onPointerDown={(e) => handlePointerDown(e, key.midiNote)}
            onPointerUp={(e) => handlePointerUp(e, key.midiNote)}
            onPointerCancel={(e) => handlePointerCancel(e, key.midiNote)}
            onContextMenu={(e) => e.preventDefault()}
          >
            {key.label && (
              <span
                className={`font-bold leading-none text-blue-600 ${
                  fixed ? 'mb-0.5 text-[9px]' : isMobile ? 'mb-0.5 text-[10px]' : 'mb-1 text-xs sm:text-sm'
                }`}
              >
                {key.label}
              </span>
            )}
            {!isMobile && !fixed && (
              <kbd className="rounded bg-stone-900/10 px-1 py-0.5 font-mono text-[9px] text-stone-500 sm:text-[10px]">
                {key.keyBinding}
              </kbd>
            )}
          </button>
        );
      })}

      {blackKeys.map((key) => {
        const isActive = activeNotes.has(key.midiNote);
        const slot = key.position ?? 0;
        const leftPercent = ((slot + 0.5) / whiteKeys.length) * 100;

        return (
          <button
            key={key.keyBinding}
            type="button"
            aria-label={`Play sharp note ${key.keyBinding}`}
            style={{ left: `${leftPercent}%`, width: `${100 / whiteKeys.length * 0.55}%` }}
            className={`piano-key absolute top-0 z-20 max-w-[28px] -translate-x-1/2 rounded-b-md border border-black/50 bg-gradient-to-b from-stone-700 to-stone-950 shadow-lg transition-all duration-75 select-none ${
              fixed ? 'h-[55%]' : 'h-[58%]'
            } ${
              isActive
                ? 'from-harmony-700 to-harmony-950 shadow-harmony-600/40'
                : 'active:from-harmony-800 active:to-harmony-950 sm:hover:from-stone-600 sm:hover:to-stone-900'
            }`}
            onPointerDown={(e) => handlePointerDown(e, key.midiNote)}
            onPointerUp={(e) => handlePointerUp(e, key.midiNote)}
            onPointerCancel={(e) => handlePointerCancel(e, key.midiNote)}
            onContextMenu={(e) => e.preventDefault()}
          />
        );
      })}
    </div>
  );

  if (fixed) {
    return (
      <section
        id="play"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-harmony-600/20 bg-stone-950/98 px-2 pt-2 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        aria-label="Harmonium keyboard"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-1.5 flex items-center justify-between px-0.5">
            <span className="text-[11px] font-medium text-stone-400">Tap keys to play</span>
            <span className="rounded-md bg-stone-800 px-2 py-0.5 text-[10px] text-stone-500">
              T {transpose > 0 ? `+${transpose}` : transpose}
            </span>
          </div>
          <div
            className={`overflow-hidden rounded-xl bg-gradient-to-b from-stone-800 to-stone-950 p-2 ring-1 ring-white/10 ${
              disabled ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            {keyboardInner}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="play"
      className="relative mx-auto w-full scroll-mt-24"
      aria-label="Online harmonium keyboard"
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-0.5">
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Play Harmonium Online
          </h2>
          <p className="text-xs text-stone-500">
            {isMobile ? 'Tap keys to play' : 'Click keys or use your computer keyboard'}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-stone-800 px-2 py-1 text-xs text-stone-400">
          {transpose > 0 ? `+${transpose}` : transpose}
        </span>
      </div>

      <div
        className={`overflow-hidden rounded-2xl bg-gradient-to-b from-stone-800 to-stone-950 p-3 shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:rounded-3xl sm:p-5 ${
          disabled ? 'pointer-events-none opacity-45' : ''
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-harmony-600/40 to-transparent" />
        {keyboardInner}
      </div>
    </section>
  );
}
