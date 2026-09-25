import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll that never hides content from a reader who has no JavaScript.
 *
 * The obvious shape — `isVisible` starting `false`, the element rendering `opacity-0` until an
 * IntersectionObserver says otherwise — is fine in a client-rendered app, where nothing exists
 * before JavaScript anyway. It is actively harmful once the pages are prerendered: every section
 * would ship as static HTML that is already in the document and deliberately invisible.
 *
 * So the hidden state is applied on the client, and only to elements below the fold at mount:
 *
 *   idle    — the server-rendered default, and what a reader without JavaScript keeps. Visible.
 *   hidden  — below the fold when the observer took charge, so hiding it is unobservable.
 *   visible — revealed, or never hidden (reduced motion, no observer, already on screen).
 *
 * Returning `state` rather than a boolean is what makes "never hidden" expressible at all; a
 * boolean has to choose between hidden and shown before it knows which is safe.
 */
export type ScrollAnimationState = 'idle' | 'hidden' | 'visible';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollAnimationState>('idle');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Absent matchMedia means a test environment, not a preference for motion.
    const prefersReduced =
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver !== 'function') {
      setState('visible');
      return;
    }

    // Already on screen: reveal without ever hiding, or the top of the page flashes.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setState('visible');
      return;
    }

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state };
}
