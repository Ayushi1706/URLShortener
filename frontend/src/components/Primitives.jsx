export function Card({ children, className = '', padded = true }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-ink-100/80 shadow-card
        transition-shadow duration-200 ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export function Badge({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'bg-ink-100/70 text-ink-700',
    accent: 'bg-accent-soft text-accent-dark',
    warn: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-600',
    dark: 'bg-navy-900/[0.06] text-navy-900',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium
        ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export function Favicon({ color = '#1FBF8F', size = 'md' }) {
  const dims = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
  return (
    <div
      className={`${dims} rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold text-white`}
      style={{ backgroundColor: color }}
    >
      •
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-ink-100/60 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-ink-500" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="text-sm font-semibold text-navy-900 mb-1">{title}</h3>
      <p className="text-sm text-ink-500 max-w-xs mb-5">{description}</p>
      {action}
    </div>
  )
}
