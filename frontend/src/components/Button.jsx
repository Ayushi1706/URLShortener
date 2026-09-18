const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark active:bg-accent-dark shadow-sm hover:shadow-md',
  dark:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-sm hover:shadow-md',
  outline:
    'bg-white text-navy-900 border border-ink-100 hover:border-navy-500 hover:bg-ink-100/40',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100/60',
  subtle:
    'bg-navy-900/[0.04] text-navy-900 hover:bg-navy-900/[0.08]',
}

const sizes = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  full = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold
        transition-all duration-150 focus-ring disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" strokeWidth={2.25} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" strokeWidth={2.25} />}
    </button>
  )
}
