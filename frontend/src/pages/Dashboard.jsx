import { useState } from 'react'
import { ShieldCheck, Cookie, Globe2 } from 'lucide-react'
import ShortenCard from '../components/ShortenCard'
import RecentLinks from '../components/RecentLinks'
import { Badge } from '../components/Primitives'

export default function Dashboard() {
  const [links, setLinks] = useState([])

  function handleCreated(newLink) {
    setLinks((prev) => [
      {
        ...newLink,
        tag: 'New',
        status: 'Active',
        createdAt: 'Just now',
        favicon: '#1FBF8F',
      },
      ...prev,
    ])
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-3">
        <Badge tone="accent" className="mx-auto w-fit mb-4">
          <ShieldCheck className="w-3 h-3" />
          Instant Analytics 2.0
        </Badge>

        <h1 className="text-3xl font-bold text-navy-900 tracking-tight mb-2">
          Shorten links.{' '}
          <span className="text-accent-dark">Understand</span> every click.
        </h1>

        <p className="text-ink-500 text-sm max-w-lg mx-auto">
          Create high-converting short links with real-time visitor insights,
          geo-data, and click analytics across 200+ distributed edge PoPs.
        </p>

        <div className="flex items-center justify-center gap-5 mt-4 text-xs text-ink-500">
          <span className="flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5" />
            Global telemetry
          </span>

          <span className="flex items-center gap-1">
            <Cookie className="w-3.5 h-3.5" />
            Zero cookies required
          </span>
        </div>
      </div>

      <div className="mt-8">
        <ShortenCard onCreated={handleCreated} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-8">
        <div className="bg-white rounded-xl border border-ink-100 p-4 text-center">
          <p className="text-lg font-bold text-navy-900">54 Regions</p>
          <p className="text-xs text-ink-500">Cross-Zone Routing</p>
        </div>

        <div className="bg-white rounded-xl border border-ink-100 p-4 text-center">
          <p className="text-lg font-bold text-navy-900">SSL / TLS 1.3</p>
          <p className="text-xs text-ink-500">End-to-End Encrypted</p>
        </div>

        <div className="bg-white rounded-xl border border-ink-100 p-4 text-center">
          <p className="text-lg font-bold text-navy-900">99.9%</p>
          <p className="text-xs text-ink-500">Uptime SLA</p>
        </div>
      </div>

      <RecentLinks links={links} />
    </div>
  )
}