/** Google AdSense configuration — set in Netlify env vars or client/.env */
export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

export const AD_SLOTS = {
  /** Desktop left sidebar — create a "Display" vertical unit in AdSense */
  left: import.meta.env.VITE_ADSENSE_SLOT_LEFT as string | undefined,
  /** Desktop right sidebar */
  right: import.meta.env.VITE_ADSENSE_SLOT_RIGHT as string | undefined,
  /** Mobile / in-content horizontal banner */
  mobile: import.meta.env.VITE_ADSENSE_SLOT_MOBILE as string | undefined,
  /** Optional banner below keyboard area on desktop */
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER as string | undefined,
} as const;

export const adsEnabled = Boolean(ADSENSE_CLIENT);
