import { ShieldCheck } from 'lucide-react';

interface SiteFooterProps {
  compact?: boolean;
}

const CONTACT_EMAIL = 'contact@onlineharmonium.online';

export function SiteFooter({ compact }: SiteFooterProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 text-center text-[11px] text-stone-500">
        <a href="/privacy" className="transition hover:text-harmony-400">
          Privacy
        </a>
        <span className="text-stone-700">·</span>
        <a href="/contact" className="transition hover:text-harmony-400">
          Contact
        </a>
        <span className="text-stone-700">·</span>
        <span>Free · No signup</span>
      </div>
    );
  }

  return (
    <footer className="border-t border-white/5 py-8 pb-safe sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400 ring-1 ring-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Free to use · No account needed · Safe &amp; simple
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <a href="/" className="text-stone-400 transition hover:text-white">
              Play Harmonium
            </a>
            <a href="/privacy" className="text-stone-400 transition hover:text-white">
              Privacy Policy
            </a>
            <a href="/contact" className="text-stone-400 transition hover:text-white">
              Contact
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-stone-400 transition hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </nav>

          <p className="max-w-md text-xs leading-relaxed text-stone-500">
            Web Harmonium — play harmonium online free. Your volume and preset settings are saved
            only on your device. We don&apos;t ask for login or personal details to play.
          </p>

          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} onlineharmonium.online
          </p>
        </div>
      </div>
    </footer>
  );
}

export { CONTACT_EMAIL };
