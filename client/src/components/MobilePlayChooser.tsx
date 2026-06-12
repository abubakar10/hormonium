import { Keyboard, Piano } from 'lucide-react';

export type MobilePlayMode = 'phone-keyboard' | 'touch-piano';

interface MobilePlayChooserProps {
  onSelect: (mode: MobilePlayMode) => void;
}

export function MobilePlayChooser({ onSelect }: MobilePlayChooserProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-harmony-600/15 to-stone-900 p-1 ring-1 ring-harmony-500/25">
      <div className="rounded-[14px] bg-stone-950/90 p-5">
        <h2 className="text-center text-lg font-semibold text-white">How do you want to play?</h2>
        <p className="mt-1 text-center text-xs text-stone-400">
          Harmonium is loaded — pick the easiest option for your phone
        </p>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={() => onSelect('phone-keyboard')}
            className="flex w-full items-center gap-4 rounded-xl bg-gradient-to-r from-harmony-500 to-harmony-600 p-4 text-left shadow-lg shadow-harmony-600/25 active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-950/30">
              <Keyboard className="h-6 w-6 text-stone-950" />
            </div>
            <div>
              <p className="font-semibold text-stone-950">Phone Keyboard</p>
              <p className="text-xs text-stone-900/80">Recommended — use keys e r t y u i o like a laptop</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelect('touch-piano')}
            className="flex w-full items-center gap-4 rounded-xl bg-stone-800 p-4 text-left ring-1 ring-white/10 active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-700">
              <Piano className="h-6 w-6 text-harmony-400" />
            </div>
            <div>
              <p className="font-semibold text-white">On-Screen Piano</p>
              <p className="text-xs text-stone-400">Tap the piano keys at the bottom of the screen</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
