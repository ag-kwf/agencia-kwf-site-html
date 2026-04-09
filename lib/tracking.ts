declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

export function trackCTAClick(ctaLocation: string, ctaText: string) {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
  });
}

export function trackFAQOpen(question: string) {
  trackEvent('faq_open', {
    faq_question: question,
  });
}

export function trackSectionView(sectionId: string) {
  trackEvent('section_view', {
    section_id: sectionId,
  });
}

export function trackExternalLink(destination: string) {
  trackEvent('external_link_click', {
    link_destination: destination,
  });
}

export function trackSocialProofView() {
  trackEvent('social_proof_view');
}

export function trackPostView(slug: string, title: string, category: string) {
  trackEvent('blog_post_view', {
    post_slug: slug,
    post_title: title,
    post_category: category,
  });
}

export function trackPostCTA(slug: string, ctaText: string) {
  trackEvent('blog_post_cta_click', {
    post_slug: slug,
    cta_text: ctaText,
  });
}

export function trackPostScrollDepth(slug: string, depth: number) {
  trackEvent('blog_post_scroll', {
    post_slug: slug,
    scroll_depth: `${depth}%`,
  });
}
