import { useEffect } from 'react';
import { ADSENSE_CLIENT, adsEnabled } from './config';

const SCRIPT_ID = 'adsbygoogle-script';

export function AdSenseScript() {
  useEffect(() => {
    if (!adsEnabled || !ADSENSE_CLIENT) return;
    if (document.getElementById(SCRIPT_ID)) return;
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}
