import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, adsEnabled } from './config';

type AdFormat = 'sidebar' | 'banner' | 'responsive';

interface AdUnitProps {
  slot?: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdUnit({ slot, format = 'responsive', className = '', label }: AdUnitProps) {
  const pushed = useRef(false);
  const showAd = adsEnabled && ADSENSE_CLIENT && slot;

  useEffect(() => {
    if (!showAd || pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not ready yet */
    }
  }, [showAd, slot]);

  if (!showAd) return null;

  const formatProps =
    format === 'sidebar'
      ? {
          style: { display: 'block', minWidth: 160, minHeight: 600 },
          'data-ad-format': 'vertical',
          'data-full-width-responsive': 'false',
        }
      : format === 'banner'
        ? {
            style: { display: 'block', minHeight: 90 },
            'data-ad-format': 'horizontal',
            'data-full-width-responsive': 'true',
          }
        : {
            style: { display: 'block' },
            'data-ad-format': 'auto',
            'data-full-width-responsive': 'true',
          };

  return (
    <div className={`ad-unit-wrap ${className}`} aria-label={label ?? 'Advertisement'}>
      <ins
        className="adsbygoogle"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        {...formatProps}
      />
    </div>
  );
}

/** Visible placeholder during development when AdSense is not configured */
export function AdPlaceholder({ format = 'sidebar' }: { format?: AdFormat }) {
  if (adsEnabled) return null;

  const heights: Record<AdFormat, string> = {
    sidebar: 'min-h-[600px]',
    banner: 'min-h-[90px]',
    responsive: 'min-h-[100px]',
  };

  return (
    <div
      className={`ad-placeholder flex items-center justify-center rounded-lg border border-dashed border-stone-700 bg-stone-900/50 text-[10px] text-stone-600 ${heights[format]}`}
      aria-hidden="true"
    >
      Ad space
    </div>
  );
}
