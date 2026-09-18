import { Card } from '../components/Primitives'
import { Terminal } from 'lucide-react'

export default function Integrations() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-xl font-bold text-navy-900 mb-1">API &amp; Integrations</h1>
      <p className="text-sm text-ink-500 mb-6">
        Connect LinkPulse to your own tools using the REST API configured in{' '}
        <code className="bg-ink-100/60 px-1.5 py-0.5 rounded text-xs">src/config/api.js</code>.
      </p>
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-navy-900" />
          <h3 className="text-sm font-semibold text-navy-900">Base URL</h3>
        </div>
        <pre className="bg-navy-950 text-accent-light text-xs rounded-xl p-4 overflow-x-auto">
{`VITE_API_BASE_URL=https://api.yourdomain.com/api`}
        </pre>
      </Card>
    </div>
  )
}
