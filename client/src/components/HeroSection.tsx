import { Hand, Keyboard, MousePointer2, Piano, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  loaded: boolean;
  isMobile?: boolean;
}

const DESKTOP_STEPS = [
  { icon: Sparkles, text: 'Click Load Module' },
  { icon: MousePointer2, text: 'Tap keys or use keyboard' },
  { icon: Piano, text: 'Play harmonium online' },
];

const MOBILE_STEPS = [
  { icon: Sparkles, text: 'Tap Load Module' },
  { icon: Hand, text: 'Tap piano keys below' },
  { icon: Piano, text: 'Play anywhere' },
];

export function HeroSection({ loaded, isMobile }: HeroSectionProps) {
  const steps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS;

  if (loaded && isMobile) {
    return (
      <section className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400 ring-1 ring-emerald-500/20">
          <Hand className="h-3.5 w-3.5" />
          Tap the keys at the bottom to play
        </p>
      </section>
    );
  }

  return (
    <section className="text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-harmony-500/20 bg-harmony-500/10 px-3 py-1.5 text-[11px] font-medium text-harmony-300 sm:px-4 sm:text-xs">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-harmony-400" />
        Free · No download · {isMobile ? 'Works on phone' : 'Real harmonium sound'}
      </div>

      <h1 className="font-display text-2xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
        Web Harmonium
        <span className="mt-1 block bg-gradient-to-r from-harmony-300 via-harmony-400 to-harmony-500 bg-clip-text text-base font-sans font-medium text-transparent sm:text-2xl">
          Play Harmonium Online — Harmonium Web
        </span>
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-400 sm:mt-4 sm:text-base">
        {isMobile ? (
          <>
            Play <strong className="font-medium text-stone-300">harmonium online</strong> on your
            phone — tap the on-screen keys to practice bhajans and ragas anywhere.
          </>
        ) : (
          <>
            The best <strong className="font-medium text-stone-300">harmonium online</strong>{' '}
            experience. Use keyboard, mouse, or MIDI to practice ragas, bhajans, and scales.
          </>
        )}
      </p>

      {!loaded && (
        <div className="mt-5 flex flex-col items-stretch gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          {steps.map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-stone-400 ring-1 ring-white/8 sm:py-2"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-harmony-500/20 text-[10px] font-bold text-harmony-400">
                {i + 1}
              </span>
              <Icon className="h-3.5 w-3.5 shrink-0 text-harmony-500" />
              {text}
            </div>
          ))}
        </div>
      )}

      {loaded && !isMobile && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400 ring-1 ring-emerald-500/20">
          <Keyboard className="h-3.5 w-3.5" />
          Press <kbd className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-emerald-300">e r t y u i o</kbd> for C D E F G A B
        </div>
      )}
    </section>
  );
}
