import { Loader2, Music2, Volume2 } from 'lucide-react';

interface LoadModuleProps {
  loading: boolean;
  error: string | null;
  onLoad: () => void;
}

export function LoadModule({ loading, error, onLoad }: LoadModuleProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-harmony-600/15 via-stone-900/80 to-stone-950 p-1 shadow-2xl shadow-harmony-900/20"
      aria-label="Load harmonium module"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-harmony-500)_0%,_transparent_50%)] opacity-10" />
      <div className="relative rounded-[22px] bg-stone-950/90 px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-harmony-400 to-harmony-600 shadow-lg shadow-harmony-600/30">
            <Music2 className="h-8 w-8 text-stone-950" strokeWidth={2.5} />
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Start Online Harmonium Play
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            Load the real Indian harmonium sample to begin. Takes just a few seconds —
            then play harmonium online instantly.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5">
              <Volume2 className="h-3.5 w-3.5 text-harmony-500" />
              Real harmonium WAV
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5">
              Free forever
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5">
              Works offline after load
            </span>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 ring-1 ring-red-500/20">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={onLoad}
            disabled={loading}
            className="group mt-6 w-full rounded-2xl bg-gradient-to-r from-harmony-500 to-harmony-600 px-8 py-4 text-base font-semibold text-stone-950 shadow-xl shadow-harmony-600/30 transition active:scale-[0.98] hover:from-harmony-400 hover:to-harmony-500 hover:shadow-harmony-500/40 disabled:opacity-60 sm:max-w-xs sm:w-auto"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading harmonium…
              </span>
            ) : (
              'Load Module & Play'
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
