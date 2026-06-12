import type { ReactNode } from 'react';
import { AD_SLOTS, adsEnabled } from './config';
import { AdPlaceholder, AdUnit } from './AdUnit';

interface PageAdLayoutProps {
  children: ReactNode;
}

/** Desktop: left ad | content | right ad. Mobile: content only (ads placed inside). */
export function PageAdLayout({ children }: PageAdLayoutProps) {
  return (
    <div className="page-with-ads">
      <aside className="ad-column ad-column-left" aria-label="Left advertisement">
        <div className="ad-sticky">
          {adsEnabled ? (
            <AdUnit slot={AD_SLOTS.left} format="sidebar" label="Left sidebar ad" />
          ) : import.meta.env.DEV ? (
            <AdPlaceholder format="sidebar" />
          ) : null}
        </div>
      </aside>

      <div className="ad-center-content">{children}</div>

      <aside className="ad-column ad-column-right" aria-label="Right advertisement">
        <div className="ad-sticky">
          {adsEnabled ? (
            <AdUnit slot={AD_SLOTS.right} format="sidebar" label="Right sidebar ad" />
          ) : import.meta.env.DEV ? (
            <AdPlaceholder format="sidebar" />
          ) : null}
        </div>
      </aside>
    </div>
  );
}
