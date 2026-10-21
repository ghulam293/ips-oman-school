'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string; email: string }

// Complete 44-module navigation
const NAV_SECTIONS = [
  {
    label: 'Main', items: [
      { icon: '⊞', label: 'Dashboard', href: '/dashboard/admin' },
      { icon: '📅', label: 'School Appointments', href: '/appointments', badge: 3 },
    ]
  },
  {
    label: 'Core Management', items: [
      { icon: '🎓', label: 'Students',         href: '/dashboard/admin/students',   badge: 0 },
      { icon: '📋', label: 'Admissions',       href: '/dashboard/admin/admissions', badge: 5 },
      { icon: '💰', label: 'Fee Management',   href: '/dashboard/admin/fees' },
      { icon: '💳', label: 'Payments',         href: '/dashboard/admin/payments' },
      { icon: '✅', label: 'Attendance',       href: '/dashboard/admin/attendance' },
      { icon: '👨‍💼', label: 'Staff & Teachers', href: '/dashboard/admin/staff' },
      { icon: '🧾', label: 'Expenses',         href: '/dashboard/admin/expenses' },
      { icon: '🔔', label: 'Notifications',    href: '/dashboard/admin/notifications' },
      { icon: '📊', label: 'Lead Management',  href: '/dashboard/admin/leads' },
      { icon: '🔄', label: 'Auto Debit',       href: '/dashboard/admin/auto-debit' },
      { icon: '👥', label: 'User Management',  href: '/dashboard/admin/users' },
      { icon: '🧸', label: 'Daycare Fees',     href: '/dashboard/admin/daycare' },
    ]
  },
  {
    label: 'HR & Payroll', items: [
      { icon: '💵', label: 'Salary & Payroll', href: '/dashboard/admin/salary' },
      { icon: '🗓️', label: 'Leave Management', href: '/dashboard/admin/leave', badge: 3 },
    ]
  },
  {
    label: 'Academics', items: [
      { icon: '📝', label: 'Exams & Results',  href: '/dashboard/admin/exams' },
      { icon: '📖', label: 'Homework',         href: '/dashboard/admin/homework' },
      { icon: '📅', label: 'Timetable',        href: '/dashboard/admin/timetable' },
      { icon: '💻', label: 'Online Classes',   href: '/dashboard/admin/online-classes' },
      { icon: '📆', label: 'Academic Calendar',href: '/dashboard/admin/calendar' },
      { icon: '📗', label: 'Library',          href: '/dashboard/admin/library' },
      { icon: '🎯', label: 'LMS',              href: '/dashboard/admin/lms' },
    ]
  },
  {
    label: 'Communication', items: [
      { icon: '📣', label: 'Notice Board',     href: '/dashboard/admin/notices' },
      { icon: '💬', label: 'Feedback & Queries',href: '/dashboard/admin/feedback', badge: 4 },
      { icon: '👨‍👩‍👧', label: 'Guardians',        href: '/dashboard/admin/guardians' },
      { icon: '✉️', label: 'Messages',         href: '/dashboard/admin/messages' },
    ]
  },
  {
    label: 'Operations', items: [
      { icon: '🚌', label: 'Transport',        href: '/dashboard/admin/transport' },
      { icon: '🎟️', label: 'Service Requests', href: '/dashboard/admin/requests' },
      { icon: '🖼️', label: 'Photo Gallery',    href: '/dashboard/admin/gallery' },
      { icon: '🏠', label: 'Hostel',           href: '/dashboard/admin/hostel' },
      { icon: '📦', label: 'Inventory',        href: '/dashboard/admin/inventory' },
      { icon: '🏢', label: 'Front Office',     href: '/dashboard/admin/front-office' },
      { icon: '📋', label: 'Daily Activities', href: '/dashboard/admin/daily-activities' },
      { icon: '📹', label: 'CCTV',             href: '/dashboard/admin/cctv' },
      { icon: '🏫', label: 'Multi-Branch',     href: '/dashboard/admin/branches' },
      { icon: '🍽️', label: 'Canteen',          href: '/dashboard/admin/canteen' },
    ]
  },
  {
    label: 'Intelligence', items: [
      { icon: '🤖', label: 'AI Assistant',     href: '/dashboard/admin/ai-assistant' },
      { icon: '📊', label: 'Analytics',        href: '/dashboard/admin/analytics' },
    ]
  },
  {
    label: 'Customization', items: [
      { icon: '🎨', label: 'School Branding',  href: '/dashboard/admin/customization' },
      { icon: '📄', label: 'Doc Templates',    href: '/dashboard/admin/templates' },
      { icon: '⚙️', label: 'Settings',         href: '/dashboard/admin/settings' },
    ]
  },
  {
    label: 'Compliance', items: [
      { icon: '🛡️', label: 'Compliance',       href: '/dashboard/admin/compliance' },
      { icon: '🔍', label: 'Audit Logs',       href: '/dashboard/admin/audit' },
    ]
  },
]

const ROLE_LABEL: Record<string, string> = {
  super_admin:'Super Admin', director:'School Director', principal:'Principal',
  branch_admin:'Branch Admin', admission_officer:'Admission Officer', accountant:'Accountant / Finance',
  hr_officer:'HR Officer', librarian:'Librarian', receptionist:'Receptionist',
  canteen_manager:'Canteen Manager', nurse:'Nurse / Counselor', it_support:'IT Support',
  transport_manager:'Transport Manager',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState<'en'|'ar'>('en')
  const [academicYear] = useState('2026-2027')

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (!s) { router.push('/login'); return }
    setUser(JSON.parse(s))
  }, [router])

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (!user) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-page)' }}>
      <div style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>Loading portal...</div>
    </div>
  )

  const handleLogout = () => { localStorage.removeItem('ips_user'); router.push('/login') }

  return (
    <div className="app-shell" dir={lang==='ar' ? 'rtl' : 'ltr'} lang={lang}>
      {/* Mobile Drawer Overlay */}
      <div
        className={`sidebar-overlay${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ──── SIDEBAR ──── */}
      <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🏫</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-logo-name">IPS Oman</div>
            <div className="sidebar-logo-sub">Admin Portal</div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="sidebar-close-btn"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`nav-item${active ? ' active' : ''}`}>
                    <span className="nav-icon">{item.icon}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                    {(item as any).badge > 0 && (
                      <span className="nav-badge">{(item as any).badge}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User + logout */}
        <div className="sidebar-footer">
          <div style={{
            padding: '10px', borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--sidebar-border)',
            marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="user-avatar" style={{ width: 30, height: 30, flexShrink: 0 }}>{user.avatar}</div>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--sidebar-muted)' }}>{ROLE_LABEL[user.role] || user.role}</div>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', background: 'none', border: 'none' }}>
            <span className="nav-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ──── MAIN ──── */}
      <div className="main-content">
        {/* Top bar */}
        <header className="topbar">
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>

          {/* Search */}
          <div className="topbar-search">
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>🔍</span>
            <input placeholder="Search students, staff, etc..." />
          </div>

          <div className="topbar-actions">
            {/* Academic year */}
            <div className="hide-mobile" style={{
              padding: '5px 12px', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-light)', border: '1px solid var(--border)',
              fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              📅 AY {academicYear}
            </div>

            {/* Lang toggle */}
            <button onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="topbar-icon-btn" title="Switch Language">
              {lang === 'en' ? 'عر' : 'EN'}
            </button>

            {/* Notifications */}
            <div className="topbar-icon-btn hide-mobile" style={{ position: 'relative' }}>
              🔔
              <span className="notif-dot" />
            </div>

            {/* Messages */}
            <div className="topbar-icon-btn hide-mobile">✉️</div>

            {/* User pill */}
            <div className="user-pill" onClick={handleLogout} title="Click to sign out">
              <div className="user-avatar">{user.avatar}</div>
              <div style={{ lineHeight: 1.2 }}>
                <div className="user-pill-name">{user.name.split(' ')[0]}</div>
                <div className="user-pill-role">{ROLE_LABEL[user.role] || user.role}</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>▼</span>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="page-content animate-fadeinup">
          {children}
        </main>
      </div>
    </div>
  )
}
