'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string; email: string }

// â”€â”€â”€ Complete 44-module navigation â”€â”€â”€
const NAV_SECTIONS = [
  {
    label: 'Main', items: [
      { icon: 'âŠž', label: 'Dashboard',        href: '/dashboard/admin' },
    ]
  },
  {
    label: 'Core Management', items: [
      { icon: 'ðŸŽ“', label: 'Students',          href: '/dashboard/admin/students',      badge: 0 },
      { icon: 'ðŸ“‹', label: 'Admissions',        href: '/dashboard/admin/admissions',    badge: 5 },
      { icon: 'ðŸ’°', label: 'Fee Management',    href: '/dashboard/admin/fees' },
      { icon: 'ðŸ’³', label: 'Payments',          href: '/dashboard/admin/payments' },
      { icon: 'âœ…', label: 'Attendance',        href: '/dashboard/admin/attendance' },
      { icon: 'ðŸ‘¨â€ðŸ’¼', label: 'Staff & Teachers',  href: '/dashboard/admin/staff' },
      { icon: 'ðŸ§¾', label: 'Expenses',          href: '/dashboard/admin/expenses' },
      { icon: 'ðŸ””', label: 'Notifications',     href: '/dashboard/admin/notifications' },
      { icon: 'ðŸ“Š', label: 'Lead Management',   href: '/dashboard/admin/leads' },
      { icon: 'ðŸ”„', label: 'Auto Debit',        href: '/dashboard/admin/auto-debit' },
      { icon: 'ðŸ‘¥', label: 'User Management',   href: '/dashboard/admin/users' },
      { icon: 'ðŸ§¸', label: 'Daycare Fees',      href: '/dashboard/admin/daycare' },
    ]
  },
  {
    label: 'HR & Payroll', items: [
      { icon: 'ðŸ’µ', label: 'Salary & Payroll',  href: '/dashboard/admin/salary' },
      { icon: 'ðŸ—“ï¸', label: 'Leave Management',  href: '/dashboard/admin/leave',          badge: 3 },
    ]
  },
  {
    label: 'Academics', items: [
      { icon: 'ðŸ“', label: 'Exams & Results',   href: '/dashboard/admin/exams' },
      { icon: 'ðŸ“–', label: 'Homework',          href: '/dashboard/admin/homework' },
      { icon: 'ðŸ“…', label: 'Timetable',         href: '/dashboard/admin/timetable' },
      { icon: 'ðŸ’»', label: 'Online Classes',    href: '/dashboard/admin/online-classes' },
      { icon: 'ðŸ“†', label: 'Academic Calendar', href: '/dashboard/admin/calendar' },
      { icon: 'ðŸ“—', label: 'Library',           href: '/dashboard/admin/library' },
      { icon: 'ðŸŽ¯', label: 'LMS',              href: '/dashboard/admin/lms' },
    ]
  },
  {
    label: 'Communication', items: [
      { icon: 'ðŸ“£', label: 'Notice Board',      href: '/dashboard/admin/notices' },
      { icon: 'ðŸ’¬', label: 'Feedback & Queries',href: '/dashboard/admin/feedback',       badge: 4 },
      { icon: 'ðŸ‘¨â€ðŸ‘©â€ðŸ‘§', label: 'Guardians',         href: '/dashboard/admin/guardians' },
      { icon: 'âœ‰ï¸', label: 'Messages',          href: '/dashboard/admin/messages' },
    ]
  },
  {
    label: 'Operations', items: [
      { icon: 'ðŸšŒ', label: 'Transport',         href: '/dashboard/admin/transport' },
      { icon: 'ðŸŽ«', label: 'Service Requests',  href: '/dashboard/admin/requests' },
      { icon: 'ðŸ–¼ï¸', label: 'Photo Gallery',     href: '/dashboard/admin/gallery' },
      { icon: 'ðŸ ', label: 'Hostel',            href: '/dashboard/admin/hostel' },
      { icon: 'ðŸ“¦', label: 'Inventory',         href: '/dashboard/admin/inventory' },
      { icon: 'ðŸ¢', label: 'Front Office',      href: '/dashboard/admin/front-office' },
      { icon: 'ðŸ“‹', label: 'Daily Activities',  href: '/dashboard/admin/daily-activities' },
      { icon: 'ðŸ“·', label: 'CCTV',             href: '/dashboard/admin/cctv' },
      { icon: 'ðŸ«', label: 'Multi-Branch',      href: '/dashboard/admin/branches' },
      { icon: 'ðŸ½ï¸', label: 'Canteen',          href: '/dashboard/admin/canteen' },
    ]
  },
  {
    label: 'Intelligence', items: [
      { icon: 'ðŸ¤–', label: 'AI Assistant',      href: '/dashboard/admin/ai-assistant' },
      { icon: 'ðŸ“Š', label: 'Analytics',         href: '/dashboard/admin/analytics' },
    ]
  },
  {
    label: 'Customization', items: [
      { icon: 'ðŸŽ¨', label: 'School Branding',   href: '/dashboard/admin/customization' },
      { icon: 'ðŸ“„', label: 'Doc Templates',     href: '/dashboard/admin/templates' },
      { icon: 'âš™ï¸', label: 'Settings',         href: '/dashboard/admin/settings' },
    ]
  },
  {
    label: 'Compliance', items: [
      { icon: 'ðŸ›¡ï¸', label: 'Compliance',        href: '/dashboard/admin/compliance' },
      { icon: 'ðŸ”', label: 'Audit Logs',        href: '/dashboard/admin/audit' },
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
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState<'en'|'ar'>('en')
  const [academicYear] = useState('2026-2027')

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (!s) { router.push('/login'); return }
    setUser(JSON.parse(s))
  }, [router])

  if (!user) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-page)' }}>
      <div style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>Loading portal...</div>
    </div>
  )

  const handleLogout = () => { localStorage.removeItem('ips_user'); router.push('/login') }

  return (
    <div className="app-shell" dir={lang==='ar' ? 'rtl' : 'ltr'} lang={lang}>
      {/* â”€â”€â”€â”€ SIDEBAR â”€â”€â”€â”€ */}
      <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">ðŸ«</div>
          <div>
            <div className="sidebar-logo-name">IPS Oman</div>
            <div className="sidebar-logo-sub">Admin Portal</div>
          </div>
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
            <span className="nav-icon">ðŸšª</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* â”€â”€â”€â”€ MAIN â”€â”€â”€â”€ */}
      <div className="main-content">
        {/* Top bar */}
        <header className="topbar">
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.3rem', color: 'var(--text-muted)', cursor: 'pointer' }}
            className="mobile-menu-btn">
            â˜°
          </button>
          {/* Search */}
          <div className="topbar-search">
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>ðŸ”</span>
            <input placeholder="Search students, staff, etc..." />
          </div>

          <div className="topbar-actions">
            {/* Academic year */}
            <div style={{
              padding: '5px 12px', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-light)', border: '1px solid var(--border)',
              fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              ðŸ“… AY {academicYear}
            </div>

            {/* Lang toggle */}
            <button onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="topbar-icon-btn" title="Switch Language">
              {lang === 'en' ? 'Ø¹Ø±' : 'EN'}
            </button>

            {/* Notifications */}
            <div className="topbar-icon-btn" style={{ position: 'relative' }}>
              ðŸ””
              <span className="notif-dot" />
            </div>

            {/* Messages */}
            <div className="topbar-icon-btn">âœ‰ï¸</div>

            {/* User */}
            <div className="user-pill">
              <div className="user-avatar">{user.avatar}</div>
              <div>
                <div className="user-pill-name">{user.name.split(' ')[0]} {user.name.split(' ')[1] || ''}</div>
                <div className="user-pill-role">{ROLE_LABEL[user.role] || 'Admin'}</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginLeft: 4 }}>â–¼</span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="page-content animate-fadeinup">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 150 }} />
      )}
    </div>
  )
}


