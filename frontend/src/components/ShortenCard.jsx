import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Link2, QrCode, Copy, Share2, ExternalLink, Check, ChevronDown } from 'lucide-react'
import { Card } from './Primitives'
import Button from './Button'
import { linksApi, getShortUrl } from '../config/api'

export default function ShortenCard({ onCreated }) {
  const [tab, setTab] = useState('link') // 'link' | 'qr'
  const [destination, setDestination] = useState('')
  const [showAlias, setShowAlias] = useState(false)
  const [alias, setAlias] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  async function handleShorten(e) {
    e.preventDefault()
    setError('')
    if (!destination.trim()) {
      setError('Paste a destination URL to shorten.')
      return
    }
    if (loading) return // guard against double-submit (e.g. double click / double Enter)

    setLoading(true)
    try {
      // NOTE: backend CreateLinkRequest expects `url`, not `destinationUrl`.
      const data = await linksApi.create({ url: destination, customAlias: alias || undefined })
      const shortCode = data?.shortCode || data?.code || alias
      const newLink = {
        id: data?.id || Date.now().toString(),
        code: shortCode,
        shortUrl: data?.shortUrl || getShortUrl(shortCode),
        destination,
        clicks: 0,
      }
      setResult(newLink)
      onCreated?.(newLink)
    } catch (err) {
      const status = err?.status || err?.response?.status
      if (status === 409 && alias.trim()) {
  setError(`"${alias}" is already taken. Try a different alias.`);
  setAlias('');
} else if (status === 409) {
  setError(
    err?.body?.message ||
    'Could not create the short link. Please try again.'
  );
} else if (status === 429) {
  setError('Too many requests — try again in a minute.');
} else {
  setError(
    err?.body?.message ||
    err?.message ||
    'Failed to create short link.'
  );
}
    } finally {
      setLoading(false)
    }
  }

  function copyLink() {
    if (!result) return
    navigator.clipboard?.writeText(result.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function reset() {
    setResult(null)
    setDestination('')
    setAlias('')
    setShowAlias(false)
  }

  return (
    <Card className="w-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 bg-ink-100/50 rounded-xl p-1 w-full sm:w-fit">
        <button
          onClick={() => setTab('link')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'link' ? 'bg-white text-navy-900 shadow-sm' : 'text-ink-500 hover:text-navy-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" /> Shorten a Link
        </button>
        <button
          onClick={() => setTab('qr')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'qr' ? 'bg-white text-navy-900 shadow-sm' : 'text-ink-500 hover:text-navy-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" /> Generate QR Code
        </button>
      </div>

      {!result ? (
        <form onSubmit={handleShorten} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5">Destination URL</label>
            <input
              type="url"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="https://your-long-url.com/goes-here"
              className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm text-navy-900
                placeholder:text-ink-300 focus-ring transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAlias((v) => !v)}
            className="flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-navy-900"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAlias ? 'rotate-180' : ''}`} />
            Custom Back-Half / Alias
            <span className="text-ink-300 font-normal">(optional)</span>
          </button>

          {showAlias && (
            <div className="flex items-center rounded-xl border border-ink-100 overflow-hidden focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent">
              <span className="pl-4 pr-1 py-3 text-sm text-ink-300 select-none">linkpulse.io/</span>
              <input
                value={alias}
                onChange={(e) => setAlias(e.target.value.replace(/\s+/g, '-'))}
                placeholder="launch-deal"
                className="flex-1 py-3 pr-4 text-sm text-navy-900 placeholder:text-ink-300 outline-none"
              />
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button type="submit" full disabled={loading} icon={tab === 'qr' ? QrCode : Link2}>
            {loading ? 'Shortening…' : tab === 'qr' ? 'Generate QR Code' : 'Shorten Link'}
          </Button>
        </form>
      ) : (
        <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-4 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-xs text-ink-500 mb-0.5">Your new link is live</p>
              <p className="text-base font-semibold text-navy-900 truncate">{result.shortUrl}</p>
              <p className="text-xs text-ink-500 truncate max-w-xs">{result.destination}</p>
            </div>
            {tab === 'qr' && (
              <div className="bg-white rounded-lg border border-ink-100 p-2 shrink-0">
                <QRCodeCanvas
                  value={result.shortUrl}
                  size={120}
                  level="H"
                  includeMargin
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="dark" icon={copied ? Check : Copy} onClick={copyLink}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button size="sm" variant="outline" icon={Share2}>
              Share
            </Button>
            <Button size="sm" variant="outline" icon={QrCode} onClick={() => setTab('qr')}>
              QR Code
            </Button>
            <Button size="sm" variant="outline" icon={ExternalLink} onClick={() => window.open(result.shortUrl, '_blank')}>
              Visit
            </Button>
            <button onClick={reset} className="ml-auto text-xs font-medium text-ink-500 hover:text-navy-900">
              Shorten another
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}