import type { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = '',
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `animate-${animation} ${delay}` : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
