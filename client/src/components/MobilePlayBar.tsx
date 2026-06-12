import { Keyboard, Piano, X } from 'lucide-react';
import type { KeyDefinition } from '../types';
import { HarmoniumKeyVisualizer } from './HarmoniumKeyVisualizer';
import { MobileLetterKeyboard } from './MobileLetterKeyboard';
import { PianoKeyboard } from './PianoKeyboard';

export type MobileInputMode = 'piano' | 'letters';

interface MobilePlayBarProps {
  mode: MobileInputMode;
  onModeChange: (mode: MobileInputMode) => void;
  keys: KeyDefinition[];
  activeNotes: Set<number>;
  transpose: number;
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
  onClose: () => void;
}

export function MobilePlayBar({
  mode,
  onModeChange,
  keys,
  activeNotes,
  transpose,
  onNoteOn,
  onNoteOff,
  onClose,
}: MobilePlayBarProps) {
  return (
    <section className="fixed bottom-0 left-0 right-0 z-40 border-t border-harmony-600/20 bg-stone-950/98 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="mx-auto max-w-lg px-3 pt-2">
        <div className="mb-2 flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex flex-1 rounded-xl bg-stone-900 p-1 ring-1 ring-white/10">
          <button
            type="button"
            onClick={() => onModeChange('piano')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
              mode === 'piano'
                ? 'bg-harmony-600 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            <Piano className="h-4 w-4" />
            Piano Keys
          </button>
          <button
            type="button"
            onClick={() => onModeChange('letters')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
              mode === 'letters'
                ? 'bg-harmony-600 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            <Keyboard className="h-4 w-4" />
            Letter Keys
          </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-stone-400 ring-1 ring-white/10 transition hover:bg-stone-800 hover:text-stone-200"
            aria-label="Close keyboard"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {mode === 'letters' && (
          <div className="mb-2">
            <HarmoniumKeyVisualizer keys={keys} activeNotes={activeNotes} />
          </div>
        )}

        <div className="overflow-hidden rounded-xl bg-gradient-to-b from-stone-800 to-stone-950 p-2 ring-1 ring-white/10">
          {mode === 'piano' ? (
            <PianoKeyboard
              keys={keys}
              activeNotes={activeNotes}
              transpose={transpose}
              isMobile
              embedded
              onNoteOn={onNoteOn}
              onNoteOff={onNoteOff}
            />
          ) : (
            <MobileLetterKeyboard
              keys={keys}
              activeNotes={activeNotes}
              onNoteOn={onNoteOn}
              onNoteOff={onNoteOff}
            />
          )}
        </div>
      </div>
    </section>
  );
}
