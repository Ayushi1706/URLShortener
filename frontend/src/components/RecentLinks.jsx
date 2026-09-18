import { Link } from 'react-router-dom'
import { Zap, Link2 } from 'lucide-react'
import { Card, Favicon, EmptyState } from './Primitives'

function faviconColorFor(url) {
  const palette = ['#635BFF', '#1FBF8F', '#FFB020', '#3B82F6', '#EF4444', '#8B5CF6']
  const sum = [...url].reduce((a, c) => a + c.charCodeAt(0), 0)
  return palette[sum % palette.length]
}

export default function RecentLinks({ links = [] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-navy-900">Recent Links</h3>
        <Link to="/app/links" className="text-xs font-medium text-accent-dark hover:underline">
          View all
        </Link>
      </div>

      {links.length === 0 ? (
        <EmptyState
          icon={Link2}
          title="No links yet"
          description="Shorten your first URL above and it'll show up here with live click counts."
        />
      ) : (
        <ul className="divide-y divide-ink-100">
          {links.map((link) => (
            <li key={link.id} className="py-3 flex items-center gap-3">
              <Favicon color={link.favicon || faviconColorFor(link.shortUrl)} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-navy-900 truncate">{link.shortUrl}</p>
                <p className="text-xs text-ink-500 truncate">{link.destination}</p>
              </div>
              <Link
                to={`/app/analytics/${link.code}`}
                className="shrink-0 inline-flex items-center gap-1 rounded-full bg-accent-soft
                  text-accent-dark text-xs font-semibold px-2.5 py-1 hover:bg-accent/20 transition-colors"
              >
                <Zap className="w-3 h-3" />
                {link.clicks.toLocaleString()} clicks
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
