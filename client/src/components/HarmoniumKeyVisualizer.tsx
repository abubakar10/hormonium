import { useMemo } from 'react';
import type { KeyDefinition } from '../types';

interface HarmoniumKeyVisualizerProps {
  keys: KeyDefinition[];
  activeNotes: Set<number>;
}

/** Read-only mini harmonium keyboard — keys depress when notes are active */
export function HarmoniumKeyVisualizer({ keys, activeNotes }: HarmoniumKeyVisualizerProps) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const white = keys.filter((k) => !k.isBlack);
    const black = keys.filter((k) => k.isBlack);
    return { whiteKeys: white, blackKeys: black };
  }, [keys]);

  return (
    <div className="rounded-lg bg-gradient-to-b from-amber-950/80 to-stone-950 p-1.5 ring-1 ring-amber-900/40">
      <div className="relative flex h-14 w-full">
        {whiteKeys.map((key) => {
          const isPressed = activeNotes.has(key.midiNote);
          return (
            <div
              key={key.keyBinding}
              className={`relative z-0 mx-px flex min-w-0 flex-1 flex-col items-center justify-end rounded-b-md border border-stone-400/20 bg-gradient-to-b from-stone-100 to-stone-300 shadow-sm transition-all duration-75 ${
                isPressed
                  ? 'z-10 translate-y-1 from-harmony-100 to-harmony-300 shadow-inner shadow-harmony-600/30'
                  : ''
              }`}
            >
              {key.label && (
                <span
                  className={`mb-0.5 text-[8px] font-bold leading-none text-blue-600 transition-opacity ${
                    isPressed ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {key.label}
                </span>
              )}
            </div>
          );
        })}

        {blackKeys.map((key) => {
          const isPressed = activeNotes.has(key.midiNote);
          const slot = key.position ?? 0;
          const leftPercent = ((slot + 0.5) / whiteKeys.length) * 100;

          return (
            <div
              key={key.keyBinding}
              style={{ left: `${leftPercent}%`, width: `${(100 / whiteKeys.length) * 0.55}%` }}
              className={`absolute top-0 z-20 max-w-[22px] -translate-x-1/2 rounded-b-sm border border-black/60 bg-gradient-to-b from-stone-700 to-stone-950 shadow-md transition-all duration-75 ${
                isPressed
                  ? 'h-[62%] translate-y-0.5 from-harmony-700 to-harmony-950 shadow-inner shadow-harmony-500/40'
                  : 'h-[58%]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
