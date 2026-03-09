import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variants = {
  primary:
    'bg-harvest-gold-200 text-deep-space-800 hover:bg-harvest-gold-300 shadow-md hover:shadow-lg active:scale-[0.98]',
  secondary:
    'bg-deep-space-800 text-warm-sand-100 hover:bg-deep-space-700 shadow-md hover:shadow-lg active:scale-[0.98]',
  outline:
    'border-2 border-deep-space-800 text-deep-space-800 hover:bg-deep-space-800 hover:text-warm-sand-100 active:scale-[0.98]',
  ghost:
    'text-deep-space-800 hover:bg-deep-space-800/5 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
