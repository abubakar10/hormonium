import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQ = [
  {
    q: 'How do I play harmonium online?',
    a: 'Click "Load Module" to load the harmonium samples, then play using your computer keyboard (keys e through o for C to B) or tap the on-screen piano keys. You can also connect a USB MIDI keyboard for online harmonium play.',
  },
  {
    q: 'Is this web harmonium free to use?',
    a: 'Yes! Web Harmonium is completely free. Play harmonium online without any download, registration, or subscription. It works directly in your browser.',
  },
  {
    q: 'What is the difference between web harmonium and harmonium web?',
    a: 'Both terms refer to playing harmonium in a web browser. This harmonium web app uses real recorded Indian harmonium samples for authentic sound — not synthetic tones.',
  },
  {
    q: 'Can I use this online harmonium on mobile?',
    a: 'Yes, tap the on-screen keys to play on mobile or tablet. For the best online harmonium experience with keyboard shortcuts, use a desktop or laptop.',
  },
  {
    q: 'Does it support MIDI keyboards?',
    a: 'Yes, connect any USB MIDI keyboard in Chrome or Edge. The app detects your device automatically and lets you play harmonium online with full velocity support.',
  },
];

export function SeoSection({ compact }: { compact?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(compact ? null : 0);

  return (
    <section
      id="about"
      className={`scroll-mt-8 border-t border-white/5 ${compact ? 'pt-6' : 'pt-10'}`}
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="about-heading" className={`font-display text-white ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
          About This Harmonium Online App
        </h2>
        {!compact && (
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              <strong className="text-slate-300">Web Harmonium</strong> is a free{' '}
              <strong className="text-slate-300">online harmonium</strong> for practicing
              Indian classical music, bhajans, and film songs. Real harmonium sound — search{' '}
              <em>web harmonium</em>, <em>harmonium web</em>, or <em>online harmonium play</em>.
            </p>
          </div>
        )}

        <h3 className={`font-semibold text-white ${compact ? 'mt-5 text-base' : 'mt-10 text-lg'}`}>
          Frequently Asked Questions
        </h3>
        <div className="mt-4 divide-y divide-white/5 rounded-2xl bg-white/[0.02] ring-1 ring-white/5">
          {FAQ.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-200 transition hover:text-harmony-300"
                aria-expanded={openIndex === i}
              >
                {item.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
