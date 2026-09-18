import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Plus, LogOut } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { authApi } from '../config/api'

const navItems = [
  { to: '/app/shorten', label: 'Shorten' },
  { to: '/app/links', label: 'My Links' },
]

export default function Navbar({ onNewLink }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await authApi.logout()
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/app/shorten" className="shrink-0">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-navy-900 text-white'
                      : 'text-ink-700 hover:bg-ink-100/70 hover:text-navy-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button size="sm" icon={Plus} onClick={onNewLink}>
            New Link
          </Button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-8 h-8 rounded-full bg-navy-900 text-white text-xs font-semibold flex items-center justify-center"
            >
              SO
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-ink-100 rounded-lg shadow-lg py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-100/70"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}