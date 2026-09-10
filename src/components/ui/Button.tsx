import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Spec: docs/ui/button-spec.md

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  /** Force external-link treatment. Auto-detected from href when omitted. */
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  /** Opt out of the scale(0.96) press feedback. */
  static?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

const variants = {
  primary:
    'bg-harvest-gold-200 text-deep-space-800 shadow-btn hover:bg-harvest-gold-300 hover:shadow-btn-hover active:bg-harvest-gold-300 active:shadow-btn',
  secondary:
    'bg-deep-space-800 text-warm-sand-100 shadow-btn hover:bg-deep-space-700 hover:shadow-btn-hover active:bg-deep-space-700 active:shadow-btn',
  outline:
    'border-2 border-deep-space-800 text-deep-space-800 hover:bg-deep-space-800 hover:text-warm-sand-100 active:bg-deep-space-700 active:text-warm-sand-100',
  ghost:
    'text-deep-space-800 hover:bg-deep-space-800/5 active:bg-deep-space-800/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

// Icon sizing per spec 2.4 — 14px at sm, 16px at md/lg.
const spinnerSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
};

export default function Button({
  children,
  to,
  href,
  external,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingLabel = 'Loading',
  static: isStatic = false,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const inert = disabled || loading;

  const baseClasses = [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-semibold rounded-lg btn-transition',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-harvest-gold-400',
    // Press feedback is exactly 0.96 (never below 0.95); `static` opts out.
    !inert && !isStatic ? 'active:scale-[0.96]' : '',
    inert ? 'opacity-50 shadow-none pointer-events-none' : '',
    loading ? 'cursor-wait' : '',
    disabled ? 'cursor-not-allowed' : '',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // The label keeps its layout space while loading so the button never resizes.
  const content = (
    <>
      <span
        className={`inline-flex items-center gap-2 btn-swap ${loading ? 'btn-swap-hidden' : ''}`}
      >
        {children}
      </span>

      <span
        aria-hidden={!loading}
        className={`absolute inset-0 inline-flex items-center justify-center btn-swap ${
          loading ? '' : 'btn-swap-hidden'
        }`}
      >
        <Loader2 className={`${spinnerSizes[size]} animate-spin`} strokeWidth={2} />
      </span>

      {loading && (
        <span className="sr-only" aria-live="polite">
          {loadingLabel}
        </span>
      )}
    </>
  );

  // Internal route.
  if (to) {
    if (inert) {
      return (
        <span role="link" aria-disabled="true" tabIndex={-1} className={baseClasses}>
          {content}
        </span>
      );
    }
    return (
      <Link to={to} className={baseClasses} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  // External URL or in-page anchor.
  if (href) {
    if (inert) {
      return (
        <span role="link" aria-disabled="true" tabIndex={-1} className={baseClasses}>
          {content}
        </span>
      );
    }
    // Only true external URLs open in a new tab — #anchors and relative paths must not.
    const isExternal = external ?? /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={inert}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
