import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { ShieldCheck, Mail, Lock, Chrome, Github } from 'lucide-react'

import Logo from '../components/Logo'
import Button from '../components/Button'
import { Badge } from '../components/Primitives'
import { authApi } from '../config/api'

const analyticsData = [
  { clicks: 120 },
  { clicks: 180 },
  { clicks: 150 },
  { clicks: 240 },
  { clicks: 210 },
  { clicks: 290 },
  { clicks: 260 },
  { clicks: 340 },
  { clicks: 310 },
  { clicks: 390 },
]

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await authApi.login(email, password)
      } else {
        await authApi.register(name, email, password)
      }

      navigate('/app/shorten')
    } catch (err) {
      setError(
        err?.body?.message ||
        err?.message ||
        'Authentication failed. Please check your details.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E1F] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-center">

          <div className="flex items-center justify-between mb-8">
            <Logo />

            <Badge tone="dark" className="text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              Telemetry Ready
            </Badge>
          </div>

          <h1 className="text-xl font-bold text-navy-900 mb-1">
            {mode === 'login'
              ? 'Welcome back to LinkPulse'
              : 'Create your LinkPulse account'}
          </h1>

          <p className="text-sm text-ink-500 mb-6">
            {mode === 'login'
              ? 'Redirect URL shortener with real-time visitor intelligence and link analytics.'
              : 'Start shortening links with click analytics built in from day one.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">
                  Full name
                </label>

                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full rounded-xl border border-ink-100 px-4 py-2.5 text-sm focus-ring"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">
                Email
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-ink-100 pl-10 pr-4 py-2.5 text-sm focus-ring"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">

                <label className="block text-xs font-medium text-ink-500">
                  Password
                </label>

                {mode === 'login' && (
                  <button
                    type="button"
                    className="text-xs font-medium text-accent-dark hover:underline"
                  >
                    Forgot password?
                  </button>
                )}

              </div>

              <div className="relative">

                <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-ink-100 pl-10 pr-4 py-2.5 text-sm focus-ring"
                />

              </div>
            </div>

            {mode === 'login' && (
              <label className="flex items-center gap-2 text-xs text-ink-500">
                <input
                  type="checkbox"
                  className="rounded border-ink-300"
                  defaultChecked
                />
                Remember this device for 30 days
              </label>
            )}

            {error && (
              <p className="text-xs text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              full
              disabled={loading}
            >
              {loading
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Log In to LinkPulse'
                  : 'Create Account'}
            </Button>

          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-ink-100 flex-1" />

            <span className="text-xs text-ink-300">
              Or continue with
            </span>

            <div className="h-px bg-ink-100 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">

            <Button
              variant="outline"
              icon={Chrome}
              type="button"
            >
              Google SSO
            </Button>

            <Button
              variant="outline"
              icon={Github}
              type="button"
            >
              GitHub Auth
            </Button>

          </div>

          <p className="text-center text-sm text-ink-500 mt-6">

            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            {' '}

            <button
              type="button"
              onClick={() =>
                setMode(
                  mode === 'login'
                    ? 'register'
                    : 'login'
                )
              }
              className="font-semibold text-accent-dark hover:underline"
            >
              {mode === 'login'
                ? 'Create Account'
                : 'Log In'}
            </button>

          </p>

        </div>

        <div className="hidden md:flex flex-col justify-between bg-navy-900 rounded-2xl p-8 text-white">

          <div>

            <p className="text-xs text-white/40 font-medium mb-2">
              Live Telemetry Stream
            </p>

            <p className="text-2xl font-bold mb-1">
              Link Analytics ·{' '}
              <span className="text-accent-light">
                Real Time
              </span>
            </p>

            <div className="h-24 w-full min-w-0 mt-4">

                <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                <LineChart data={analyticsData}>
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#4FDDAE"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            <div className="grid grid-cols-3 gap-3 mt-6 text-center">

              <div>
                <p className="text-lg font-bold">
                  Clicks
                </p>

                <p className="text-[11px] text-white/40">
                  Track visits
                </p>
              </div>

              <div>
                <p className="text-lg font-bold">
                  Geo
                </p>

                <p className="text-[11px] text-white/40">
                  Visitor country
                </p>
              </div>

              <div>
                <p className="text-lg font-bold">
                  Source
                </p>

                <p className="text-[11px] text-white/40">
                  Referrers
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">

            <p className="text-sm text-white/80 leading-relaxed mb-3">
              "LinkPulse gives our marketing team real-time
              visibility across every campaign link."
            </p>

            <p className="text-xs font-semibold text-white">
              LinkPulse Analytics
            </p>

            <p className="text-[11px] text-white/40">
              URL shortening and click analytics platform
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}

