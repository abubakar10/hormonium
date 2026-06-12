import { LegalPageLayout } from '../components/LegalPageLayout';
import { CONTACT_EMAIL } from '../components/SiteFooter';

export function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Simple and honest — last updated 12 June 2026"
    >
      <p>
        Web Harmonium at <strong className="text-stone-300">onlineharmonium.online</strong> is a
        free online harmonium you can use without creating an account. This page explains what
        little data is involved so you can play with confidence.
      </p>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong className="text-stone-300">Settings on your device</strong> — volume, transpose,
            octave, reverb, and saved presets are stored in your browser&apos;s local storage only.
            They never leave your device unless you clear browser data.
          </li>
          <li>
            <strong className="text-stone-300">No account</strong> — we do not ask for your name,
            email, or password to play the harmonium.
          </li>
          <li>
            <strong className="text-stone-300">Ads &amp; analytics</strong> — if ads are enabled, Google
            AdSense may use cookies or similar technologies. Google&apos;s policies apply to that
            data. See{' '}
            <a
              href="https://policies.google.com/privacy"
              className="text-harmony-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use information</h2>
        <p>
          Local settings are used only to remember your preferences next time you visit. We do not
          sell your personal information. We do not run our own user database or login system.
        </p>
      </section>

      <section>
        <h2>Cookies &amp; consent</h2>
        <p>
          In some regions, you may see a cookie/consent message from Google when ads are shown. You
          can manage those choices through the message Google displays. You can also control cookies
          in your browser settings at any time.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          The site is a general music tool. We do not knowingly collect personal information from
          children. If you are a parent with concerns, please contact us.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy occasionally. The date at the top will change when we do.
          Continued use of the site means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-harmony-400 hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          or visit our{' '}
          <a href="/contact" className="text-harmony-400 hover:underline">
            contact page
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
