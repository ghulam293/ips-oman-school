'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string; email: string }

const NAV = [
  { icon: '⊞', label: 'Dashboard',     href: '/dashboard/student' },
  { icon: '📅', label: 'Timetable',     href: '/dashboard/student/timetable' },
  { icon: '📖', label: 'Homework',      href: '/dashboard/student/homework', badge: 2 },
  { icon: '📊', label: 'My Results',    href: '/dashboard/student/results' },
  { icon: '💻', label: 'Online Classes',href: '/dashboard/student/online-classes' },
  { icon: '🎯', label: 'LMS / Courses', href: '/dashboard/student/lms' },
  { icon: '📗', label: 'Library',       href: '/dashboard/student/library' },
  { icon: '📣', label: 'Notices',       href: '/dashboard/student/notices' },
  { icon: '✅', label: 'Attendance',    href: '/dashboard/student/attendance' },
  { icon: '🎮', label: 'Games',         href: '/dashboard/student/games' },
  { icon: '🛡️', label: 'Security Guide',href: '/dashboard/student/security-guide' },
]

const PC = '#7c3aed'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
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
      <div style={{ color:'var(--text-muted)' }}>Loading Student Portal...</div>
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
          <div style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/ips-crest.png" alt="IPS Crest" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-logo-name">IPS Oman</div>
            <div className="sidebar-logo-sub">Student Portal</div>
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
              <div style={{ fontSize: '0.65rem', color: 'var(--sidebar-muted)' }}>Student</div>
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
            <input placeholder="Search courses, homework..." />
          </div>
          <div className="topbar-actions">
            <div className="topbar-icon-btn hide-mobile" style={{ position: 'relative' }}>🔔<span className="notif-dot" /></div>
            <div className="topbar-icon-btn hide-mobile">✉️</div>
            <div className="user-pill" onClick={() => router.push('/select-portal')}>
              <div className="user-avatar" style={{ background: PC }}>{user.avatar}</div>
              <div>
                <div className="user-pill-name">{user.name.split(' ')[0]}</div>
                <div className="user-pill-role">Student</div>
              </div>
            </div>
          </div>
        </header>
        <main className="page-content animate-fadeinup">{children}</main>
      </div>
    </div>
  )
}
