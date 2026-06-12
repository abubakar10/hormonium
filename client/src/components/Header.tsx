import { Loader2, Music2, Waves } from 'lucide-react';

interface HeaderProps {
  loaded: boolean;
  loading: boolean;
  compact?: boolean;
}

export function Header({ loaded, loading, compact }: HeaderProps) {

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-stone-950/80 pt-safe backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-harmony-600/5 via-transparent to-harmony-400/5" />
      <div className={`relative mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-6 ${compact ? 'py-2' : 'py-3.5 sm:py-4'}`}>
        <a href="/" className="flex items-center gap-2.5" aria-label="Web Harmonium home">
          <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-harmony-400 to-harmony-600 shadow-md shadow-harmony-600/20 ${compact ? 'h-8 w-8' : 'h-10 w-10 rounded-xl sm:h-11 sm:w-11'}`}>
            <Music2 className={`text-stone-950 ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} strokeWidth={2.5} />
          </div>
          <p className={`font-display leading-none text-white ${compact ? 'text-base' : 'text-lg sm:text-xl'}`}>
            Web Harmonium
          </p>
        </a>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:py-1.5 sm:text-xs ${
              loaded
                ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25'
                : loading
                  ? 'bg-harmony-500/15 text-harmony-400 ring-1 ring-harmony-500/25'
                  : 'bg-stone-800 text-stone-400 ring-1 ring-white/8'
            }`}
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Waves className="h-3.5 w-3.5" />
            )}
            {loaded ? 'Ready' : loading ? 'Loading…' : 'Load first'}
          </div>
        </div>
      </div>

    </header>
  );
}
