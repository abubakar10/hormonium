import { Keyboard, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getMidiNoteForKey } from '../audio/keyboardLayout';

const MAIN_KEYS = [
  { key: 'e', note: 'C' },
  { key: 'r', note: 'D' },
  { key: 't', note: 'E' },
  { key: 'y', note: 'F' },
  { key: 'u', note: 'G' },
  { key: 'i', note: 'A' },
  { key: 'o', note: 'B' },
];

interface MobilePhoneKeyboardProps {
  activeNotes: Set<number>;
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
  onSwitchMode: () => void;
}

export function MobilePhoneKeyboard({
  activeNotes,
  onNoteOn,
  onNoteOff,
  onSwitchMode,
}: MobilePhoneKeyboardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const pressedKeys = useRef<Set<string>>(new Set());

  const openKeyboard = useCallback(() => {
    inputRef.current?.focus();
    setKeyboardOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.repeat) return;

      const midiNote = getMidiNoteForKey(e.key);
      if (midiNote == null) return;

      e.preventDefault();
      inputRef.current!.value = '';

      if (pressedKeys.current.has(e.key)) return;
      pressedKeys.current.add(e.key);
      onNoteOn(midiNote);
    },
    [onNoteOn]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const midiNote = getMidiNoteForKey(e.key);
      pressedKeys.current.delete(e.key);
      if (midiNote != null) onNoteOff(midiNote);
      inputRef.current!.value = '';
    },
    [onNoteOff]
  );

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const onBlur = () => setKeyboardOpen(false);
    input.addEventListener('blur', onBlur);
    return () => input.removeEventListener('blur', onBlur);
  }, []);

  const isKeyActive = (key: string) => {
    const midi = getMidiNoteForKey(key);
    return midi != null && activeNotes.has(midi);
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 z-40 border-t border-harmony-600/25 bg-stone-950/98 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="mx-auto max-w-lg px-3 pt-3">
        {/* Hidden input — must be focusable for mobile OS keyboard */}
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Phone keyboard input for playing harmonium"
          className="mobile-keyboard-input"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={(e) => {
            e.target.value = '';
          }}
        />

        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium text-stone-400">
            {keyboardOpen ? (
              <span className="text-emerald-400">● Keyboard open — start playing</span>
            ) : (
              'Tap button below to open your phone keyboard'
            )}
          </span>
          <button
            type="button"
            onClick={onSwitchMode}
            className="flex items-center gap-1 text-[10px] text-stone-500 underline"
          >
            <RefreshCw className="h-3 w-3" />
            Switch mode
          </button>
        </div>

        {/* Visual key guide */}
        <div className="mb-3 flex justify-center gap-1">
          {MAIN_KEYS.map(({ key, note }) => (
            <div
              key={key}
              className={`flex flex-1 flex-col items-center rounded-lg py-2 transition-all ${
                isKeyActive(key)
                  ? 'bg-harmony-500/30 ring-1 ring-harmony-400'
                  : 'bg-stone-800/80'
              }`}
            >
              <span className="text-[10px] font-bold text-blue-400">{note}</span>
              <kbd className="mt-0.5 font-mono text-xs text-stone-300">{key}</kbd>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={openKeyboard}
          className={`mb-3 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition active:scale-[0.98] ${
            keyboardOpen
              ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/40'
              : 'bg-gradient-to-r from-harmony-500 to-harmony-600 text-stone-950 shadow-lg shadow-harmony-600/25'
          }`}
        >
          <Keyboard className="h-5 w-5" />
          {keyboardOpen ? 'Keyboard Open — Tap here if it closed' : 'Open Phone Keyboard'}
        </button>

        <p className="mb-2 text-center text-[10px] text-stone-600">
          More keys: q w e r t y u i o p · Black notes: 1 2 4 5 7 8 9
        </p>
      </div>
    </section>
  );
}
