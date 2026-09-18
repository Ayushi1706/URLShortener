import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Plus,
  Tag as TagIcon,
  BarChart3,
  Copy,
  ExternalLink,
  Link2,
  ArrowRightLeft,
} from 'lucide-react'
import { Card, Badge, Favicon, EmptyState } from '../components/Primitives'
import Button from '../components/Button'
import { linksApi, getShortUrl } from '../config/api'

function StatBox({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl border border-ink-100 px-5 py-4">
      <p className="text-xs text-ink-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-navy-900">{value}</p>
      {sub && (
        <p className="text-[11px] text-accent-dark mt-0.5">{sub}</p>
      )}
    </div>
  )
}

export default function MyLinks() {
  const [links, setLinks] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLinks() {
      try {
        setLoading(true)
        setError('')

        const data = await linksApi.getAll()

        const mappedLinks = (Array.isArray(data) ? data : []).map((l) => {
          const code = l.shortCode || l.code

          return {
            id: l.id,
            code,
            shortUrl: l.shortUrl || getShortUrl(code),
            destination: l.originalUrl || l.destinationUrl || l.destination || '',
            clicks: l.clicks || 0,
            tag: l.tag || 'General',
            ctr: l.ctr || '—',
            status: l.status || 'Active',
            velocity: l.velocity || 'neutral',
            favicon: l.favicon || '#1FBF8F',
          }
        })

        setLinks(mappedLinks)
      } catch (err) {
        setError(err?.body?.message || err?.message || 'Failed to load links.')
      } finally {
        setLoading(false)
      }
    }

    loadLinks()
  }, [])

  const filtered = links.filter((l) => {
    const search = query.toLowerCase()

    return (
      l.shortUrl?.toLowerCase().includes(search) ||
      l.destination?.toLowerCase().includes(search) ||
      l.tag?.toLowerCase().includes(search)
    )
  })

  const totalClicks = links.reduce(
    (sum, l) => sum + Number(l.clicks || 0),
    0
  )

  async function copyLink(shortUrl) {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch {
      console.error('Failed to copy link')
    }
  }

  function visitLink(shortUrl) {
    window.open(shortUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-navy-900">My Links</h1>
          <p className="text-sm text-ink-500 mt-1">
            Manage, moderate, and observe high-velocity short URLs with edge
            caching at millisecond latency.
          </p>
        </div>

        <Button icon={Plus}>Create New Link</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatBox
          label="Total Links"
          value={links.length}
          sub="Your links"
        />

        <StatBox
          label="Aggregate Clicks"
          value={totalClicks.toLocaleString()}
          sub="All-time clicks"
        />

        <StatBox
          label="Avg CTR (Local)"
          value="4.8%"
          sub="Analytics"
        />

        <StatBox
          label="Active Edge Domains"
          value="3"
        />
      </div>

      <Card padded={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-ink-100">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-ink-300 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any link, destination, or tag..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-ink-100 text-sm focus-ring"
            />
          </div>

        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-ink-500">
            Loading your links...
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Link2}
            title="No links match your search"
            description="Try a different keyword, or clear the search to see all your links."
          />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="text-left text-xs text-ink-500 border-b border-ink-100">
                  <th className="py-3 pl-5 pr-3 font-medium">
                    Link &amp; Destination
                  </th>

                  <th className="py-3 px-3 font-medium">
                    Tags / Campaign
                  </th>

                  <th className="py-3 px-3 font-medium">
                    Clicks &amp; Velocity
                  </th>

                  <th className="py-3 px-3 font-medium">CTR</th>

                  <th className="py-3 px-3 font-medium">Status</th>

                  <th className="py-3 pr-5 pl-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-ink-100/70 hover:bg-ink-100/20 transition-colors"
                  >
                    <td className="py-3 pl-5 pr-3">
                      <div className="flex items-center gap-2.5 max-w-xs">
                        <Favicon color={l.favicon} size="sm" />

                        <div className="min-w-0">
                          <Link
                            to={`/app/analytics/${l.code}`}
                            className="font-medium text-navy-900 hover:text-accent-dark truncate block"
                          >
                            {l.shortUrl}
                          </Link>

                          <p className="text-xs text-ink-500 truncate">
                            {l.destination}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <Badge tone="neutral">
                        <TagIcon className="w-3 h-3" />
                        {l.tag}
                      </Badge>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-navy-900">
                          {Number(l.clicks || 0).toLocaleString()}
                        </span>

                        <ArrowRightLeft
                          className={`w-3 h-3 ${
                            l.velocity === 'up'
                              ? 'text-accent-dark'
                              : l.velocity === 'down'
                                ? 'text-red-500 rotate-90'
                                : 'text-ink-300'
                          }`}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-3 text-ink-700">
                      {l.ctr}
                    </td>

                    <td className="py-3 px-3">
                      <Badge
                        tone={l.status === 'Active' ? 'accent' : 'neutral'}
                      >
                        {l.status}
                      </Badge>
                    </td>

                    <td className="py-3 pr-5 pl-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/app/analytics/${l.code}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100/70 hover:text-navy-900"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => copyLink(l.shortUrl)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100/70 hover:text-navy-900"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => visitLink(l.shortUrl)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100/70 hover:text-navy-900"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between p-4 text-xs text-ink-500">
          <span>
            Showing {filtered.length} of {links.length} links
          </span>

          
        </div>
      </Card>
    </div>
  )
}