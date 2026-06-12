import { useCallback, useEffect, useState } from 'react';

export type AppPage = 'home' | 'privacy' | 'contact';

function pageFromPath(pathname: string): AppPage {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/privacy') return 'privacy';
  if (path === '/contact') return 'contact';
  return 'home';
}

export function usePageRoute() {
  const [page, setPage] = useState<AppPage>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((next: AppPage) => {
    const path = next === 'home' ? '/' : `/${next}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { page, navigate };
}
