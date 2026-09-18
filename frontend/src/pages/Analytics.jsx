import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  Zap,
  Globe2,
  Link2,
  RefreshCcw,
} from 'lucide-react'
import { Card, Badge } from '../components/Primitives'
import Button from '../components/Button'
import { analyticsApi, getShortUrl } from '../config/api'

function MetricCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="!p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-ink-500">
          {label}
        </span>

        <div className="w-7 h-7 rounded-lg bg-accent-soft text-accent-dark flex items-center justify-center">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <p className="text-2xl font-bold text-navy-900">
        {value}
      </p>

      {sub && (
        <p className="text-xs text-ink-500 mt-1">
          {sub}
        </p>
      )}
    </Card>
  )
}

function RankedList({ rows }) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-navy-900 font-medium">
              {row.name}
            </span>

            <span className="text-ink-500">
              {row.count.toLocaleString()} · {row.pct}%
            </span>
          </div>

          <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Analytics() {
  const { code } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadAnalytics() {
    if (!code) return

    try {
      setLoading(true)
      setError('')

      const result = await analyticsApi.forLink(code)

      setData(result)
    } catch (err) {
      setError(
        err?.body?.message ||
        err?.message ||
        'Failed to load analytics.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()
  }, [code])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-sm text-ink-500">
          Loading analytics...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-sm text-red-500">
          {error}
        </p>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCcw}
            onClick={loadAnalytics}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-sm text-ink-500">
          No analytics data found.
        </p>
      </div>
    )
  }

  // Backend shape (AnalyticsResponse):
  // { shortCode, totalClicks, clicksByDay: [{date, count}],
  //   topReferrers: [{label, count}], clicksByCountry: [{label, count}] }

  const totalClicks = Number(data.totalClicks || 0)

  const clicksOverTime = Array.isArray(data.clicksByDay)
    ? data.clicksByDay.map((item) => ({
        date: item.date,
        clicks: Number(item.count || 0),
      }))
    : []

  const topCountries = Array.isArray(data.clicksByCountry)
    ? data.clicksByCountry.map((item) => ({
        name: item.label || 'Unknown',
        count: Number(item.count || 0),
        pct:
          totalClicks > 0
            ? Number(((Number(item.count || 0) / totalClicks) * 100).toFixed(1))
            : 0,
      }))
    : []

  const topReferrers = Array.isArray(data.topReferrers)
    ? data.topReferrers.map((item) => ({
        name: item.label || 'Direct',
        count: Number(item.count || 0),
        pct:
          totalClicks > 0
            ? Number(((Number(item.count || 0) / totalClicks) * 100).toFixed(1))
            : 0,
      }))
    : []

  const shortCode = data.shortCode || code

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-navy-900">
              {getShortUrl(shortCode)}
            </h1>

            <Badge tone="accent">
              Live
            </Badge>
          </div>

          <p className="text-sm text-ink-500">
            Analytics for this short link
          </p>
        </div>

        <div className="flex items-center gap-2">
          
          <Button
            variant="dark"
            size="sm"
            icon={RefreshCcw}
            onClick={loadAnalytics}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <MetricCard
          icon={Zap}
          label="Total Clicks"
          value={totalClicks.toLocaleString()}
          sub="All tracked clicks"
        />

        <MetricCard
          icon={Globe2}
          label="Countries"
          value={topCountries.length.toLocaleString()}
          sub="Distinct countries reached"
        />

        <MetricCard
          icon={Link2}
          label="Referrers"
          value={topReferrers.length.toLocaleString()}
          sub="Distinct traffic sources"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy-900">
              Click Trajectory
            </h3>

            <span className="text-xs text-ink-500">
              Clicks over time
            </span>
          </div>

          <div className="h-56 min-w-0">
            {clicksOverTime.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={1}
                minHeight={1}
              >
                <LineChart
                  data={clicksOverTime}
                  margin={{
                    top: 5,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 11,
                      fill: '#9CA3AF',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: '#9CA3AF',
                    }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      fontSize: 12,
                    }}
                    labelStyle={{
                      color: '#0D1120',
                      fontWeight: 600,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#1FBF8F"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-ink-400">
                No click data available yet.
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy-900">
              Top Locations
            </h3>

            <span className="flex items-center gap-1 text-xs text-ink-500">
              <Globe2 className="w-3 h-3" />
              {topCountries.length} Countries
            </span>
          </div>

          {topCountries.length > 0 ? (
            <RankedList rows={topCountries} />
          ) : (
            <p className="text-xs text-ink-400">
              No country data available yet.
            </p>
          )}
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy-900">
              Top Referrers
            </h3>

            <span className="text-xs text-ink-500">
              Views by referrer
            </span>
          </div>

          {topReferrers.length > 0 ? (
            <ul className="divide-y divide-ink-100">
              {topReferrers.map((r, i) => (
                <li
                  key={r.name}
                  className="py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-navy-900/[0.06] text-navy-900 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>

                    <span className="text-sm text-navy-900 font-medium">
                      {r.name}
                    </span>
                  </div>

                  <span className="text-sm text-ink-500">
                    {r.count.toLocaleString()} · {r.pct}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-ink-400">
              No referrer data available yet.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}