export function captureUTMs() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const utms: Record<string, string> = {};
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });

  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('kwf_utms', JSON.stringify(utms));
  }

  if (!sessionStorage.getItem('kwf_first_page')) {
    sessionStorage.setItem('kwf_first_page', window.location.href);
    sessionStorage.setItem('kwf_referrer', document.referrer || 'direct');
  }
}

export function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem('kwf_utms') || '{}');
  } catch {
    return {};
  }
}

export function appendUTMsToUrl(baseUrl: string): string {
  const utms = getStoredUTMs();
  if (Object.keys(utms).length === 0) return baseUrl;

  const url = new URL(baseUrl);
  Object.entries(utms).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const firstPage = sessionStorage.getItem('kwf_first_page');
  const referrer = sessionStorage.getItem('kwf_referrer');
  if (firstPage) url.searchParams.set('kwf_landing', firstPage);
  if (referrer) url.searchParams.set('kwf_referrer', referrer);

  return url.toString();
}
