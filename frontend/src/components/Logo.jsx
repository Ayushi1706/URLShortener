import { Link2 } from 'lucide-react'

export default function Logo({ size = 'md', className = '' }) {
  const dims = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7'
  const text = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${dims} rounded-lg bg-navy-900 flex items-center justify-center text-accent-light shrink-0`}>
        <Link2 className="w-4 h-4" strokeWidth={2.5} />
      </div>
      <span className={`${text} font-bold text-navy-900 tracking-tight`}>
        Link<span className="text-accent-dark">Pulse</span>
      </span>
    </div>
  )
}
