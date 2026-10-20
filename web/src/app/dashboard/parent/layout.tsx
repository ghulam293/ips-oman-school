'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string; email: string }

const NAV = [
  { icon: '⊞', label: 'Dashboard',     href: '/dashboard/parent' },
  { icon: '👦', label: 'My Children',   href: '/dashboard/parent/children' },
  { icon: '✅', label: 'Attendance',    href: '/dashboard/parent/attendance' },
  { icon: '📖', label: 'Homework',      href: '/dashboard/parent/homework' },
  { icon: '📊', label: 'Results',       href: '/dashboard/parent/results' },
  { icon: '💰', label: 'Fees',          href: '/dashboard/parent/fees' },
  { icon: '📅', label: 'Appointments',  href: '/dashboard/parent/appointments' },
  { icon: '🍽️', label: 'Cafeteria',     href: '/dashboard/parent/cafeteria' },
  { icon: '🚌', label: 'Transport',     href: '/dashboard/parent/transport' },
  { icon: '🗓️', label: 'Leave Request', href: '/dashboard/parent/leave' },
  { icon: '📣', label: 'News & Events', href: '/dashboard/parent/news', badge: 3 },
  { icon: '✉️', label: 'Messages',      href: '/dashboard/parent/messages' },
]

const PC = '#059669'

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (!s) { router.push('/login'); return }
    setUser(JSON.parse(s))
  }, [router])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (!user) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-page)' }}>
      <div style={{ color:'var(--text-muted)' }}>Loading Parent Portal...</div>
    </div>
  )

  return (
    <div className="app-shell" style={{ '--sidebar-active': PC } as any}>
      <div
        className={`sidebar-overlay${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: PC }}>👨‍👩‍👧</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-logo-name">IPS Oman</div>
            <div className="sidebar-logo-sub">Parent Portal</div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="sidebar-close-btn" aria-label="Close sidebar">✕</button>
        </div>

        <div style={{ padding: '10px 8px', borderBottom: '1px solid var(--sidebar-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PC + '33', color: PC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.72rem', flexShrink: 0 }}>
              {user.avatar}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--sidebar-muted)' }}>Parent / Guardian</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setMobileOpen(false)}
                className={'nav-item' + (active ? ' active' : '')}>
                <span className="nav-icon">{item.icon}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Link href="/select-portal" className="nav-item">
            <span className="nav-icon">🔄</span>
            <span>Switch Portal</span>
          </Link>
          <button onClick={() => { localStorage.removeItem('ips_user'); router.push('/login') }}
            className="nav-item" style={{ width: '100%', background: 'none', border: 'none' }}>
            <span className="nav-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <div className="topbar-search">
            <span style={{ color: 'var(--text-light)' }}>🔍</span>
            <input placeholder="Search records, fees..." />
          </div>
          <div className="topbar-actions">
            <div className="topbar-icon-btn hide-mobile" style={{ position: 'relative' }}>🔔<span className="notif-dot" /></div>
            <div className="topbar-icon-btn hide-mobile">✉️</div>
            <div className="user-pill" onClick={() => router.push('/select-portal')}>
              <div className="user-avatar" style={{ background: PC }}>{user.avatar}</div>
              <div>
                <div className="user-pill-name">{user.name.split(' ')[0]}</div>
                <div className="user-pill-role">Parent</div>
              </div>
            </div>
          </div>
        </header>
        <main className="page-content animate-fadeinup">{children}</main>
      </div>
    </div>
  )
}
