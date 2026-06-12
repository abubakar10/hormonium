import { Bug, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { LegalPageLayout } from '../components/LegalPageLayout';
import { CONTACT_EMAIL } from '../components/SiteFooter';

const TOPICS = [
  {
    icon: HelpCircle,
    label: 'General question',
    subject: 'Question about Web Harmonium',
    description: 'How to play, keyboard keys, mobile use',
  },
  {
    icon: Bug,
    label: 'Report a problem',
    subject: 'Bug report — Web Harmonium',
    description: 'Something not working? Tell us what happened',
  },
  {
    icon: MessageCircle,
    label: 'Feedback & ideas',
    subject: 'Feedback for Web Harmonium',
    description: 'Suggestions to make the site better',
  },
] as const;

export function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="We're a small free project — happy to help"
    >
      <p>
        Need help playing harmonium online, found a bug, or have a suggestion? Send us a message.
        We usually reply within a few days.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-harmony-500 to-harmony-600 px-6 py-4 text-center text-base font-semibold text-stone-950 shadow-lg shadow-harmony-600/25 transition hover:from-harmony-400 hover:to-harmony-500"
      >
        <Mail className="h-5 w-5" />
        Email {CONTACT_EMAIL}
      </a>

      <section>
        <h2>Quick topics</h2>
        <p className="mb-4">Tap a topic — your email app will open with the subject filled in.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TOPICS.map(({ icon: Icon, label, subject, description }) => (
            <a
              key={label}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
              className="flex flex-col gap-2 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/[0.07] hover:ring-harmony-500/30"
            >
              <Icon className="h-5 w-5 text-harmony-400" />
              <span className="font-medium text-white">{label}</span>
              <span className="text-xs text-stone-500">{description}</span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>Before you write</h2>
        <ul>
          <li>
            <strong className="text-stone-300">Can&apos;t hear sound?</strong> Tap &quot;Load
            Module&quot; first, then turn up volume in controls and your device.
          </li>
          <li>
            <strong className="text-stone-300">On mobile?</strong> Use the piano keys or switch to
            Letter Keys at the bottom.
          </li>
          <li>
            <strong className="text-stone-300">Privacy questions?</strong> See our{' '}
            <a href="/privacy" className="text-harmony-400 hover:underline">
              Privacy Policy
            </a>
            .
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
