import type { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: string;
}

/**
 * `idle` deliberately adds no class at all: that is the prerendered state, and it must render as
 * finished content rather than as something waiting to be animated in. See useScrollAnimation.
 */
export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = '',
}: AnimatedSectionProps) {
  const { ref, state } = useScrollAnimation();

  const motion =
    state === 'visible' ? `animate-${animation} ${delay}` : state === 'hidden' ? 'opacity-0' : '';

  return (
    <div ref={ref} className={`${className} ${motion}`.trim()}>
      {children}
    </div>
  );
}
