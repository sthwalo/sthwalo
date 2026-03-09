interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignClass} mb-12 md:mb-16`}>
      {label && (
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-300 mb-3">
          {label}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight ${
          light ? 'text-warm-sand-50' : 'text-deep-space-800'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-warm-sand-300' : 'text-deep-space-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
