'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string; email: string }

const NAV: Record<string, {icon:string;label:string;href:string;badge?:number}[]> = {
  teacher: [
    {icon:'⊞', label:'Dashboard',    href:'/dashboard/teacher'},
    {icon:'🏫', label:'My Classes',  href:'/dashboard/teacher/classes'},
    {icon:'✅', label:'Attendance',  href:'/dashboard/teacher/attendance'},
    {icon:'📖', label:'Homework',    href:'/dashboard/teacher/homework'},
    {icon:'📝', label:'Exams & Marks',href:'/dashboard/teacher/exams'},
    {icon:'💻', label:'Online Classes',href:'/dashboard/teacher/online-classes'},
    {icon:'📅', label:'Timetable',   href:'/dashboard/teacher/timetable'},
    {icon:'📣', label:'Notices',     href:'/dashboard/teacher/notices'},
    {icon:'✉️', label:'Messages',    href:'/dashboard/teacher/messages',badge:2},
    {icon:'🗓️', label:'Leave',       href:'/dashboard/teacher/leave'},
    {icon:'📊', label:'My Reports',  href:'/dashboard/teacher/reports'},
  ],
  parent: [
    {icon:'⊞', label:'Dashboard',    href:'/dashboard/parent'},
    {icon:'👦', label:'My Children', href:'/dashboard/parent/children'},
    {icon:'✅', label:'Attendance',  href:'/dashboard/parent/attendance'},
    {icon:'📖', label:'Homework',    href:'/dashboard/parent/homework'},
    {icon:'📊', label:'Results',     href:'/dashboard/parent/results'},
    {icon:'💰', label:'Fees',        href:'/dashboard/parent/fees'},
    {icon:'📅', label:'Appointments',href:'/dashboard/parent/appointments'},
    {icon:'🍽️', label:'Cafeteria',  href:'/dashboard/parent/cafeteria'},
    {icon:'🚌', label:'Transport',   href:'/dashboard/parent/transport'},
    {icon:'🗓️', label:'Leave Request',href:'/dashboard/parent/leave'},
    {icon:'📣', label:'News',        href:'/dashboard/parent/news',badge:3},
    {icon:'✉️', label:'Messages',    href:'/dashboard/parent/messages'},
  ],
  student: [
    {icon:'⊞', label:'Dashboard',    href:'/dashboard/student'},
    {icon:'📅', label:'Timetable',   href:'/dashboard/student/timetable'},
    {icon:'📖', label:'Homework',    href:'/dashboard/student/homework',badge:2},
    {icon:'📊', label:'My Results',  href:'/dashboard/student/results'},
    {icon:'💻', label:'Online Classes',href:'/dashboard/student/online-classes'},
    {icon:'🎯', label:'LMS / Courses',href:'/dashboard/student/lms'},
    {icon:'📗', label:'Library',     href:'/dashboard/student/library'},
    {icon:'📣', label:'Notices',     href:'/dashboard/student/notices'},
    {icon:'✅', label:'Attendance',  href:'/dashboard/student/attendance'},
    {icon:'🎮', label:'Games',       href:'/dashboard/student/games'},
    {icon:'🛡️', label:'Security Guide',href:'/dashboard/student/security-guide'},
  ],
}

const PORTAL_COLORS: Record<string,string> = { teacher:'#2563eb', parent:'#059669', student:'#7c3aed' }

export default function RoleLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const role = 'student'

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (!s) { router.push('/login'); return }
    setUser(JSON.parse(s))
  }, [router])

  if (!user) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-page)'}}><div style={{color:'var(--text-muted)'}}>Loading...</div></div>

  const pc = PORTAL_COLORS[role] || '#cc1a1a'
  const nav = NAV[role] || []

  return (
    <div className="app-shell" style={{'--sidebar-active': pc} as any}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{background:pc}}>🎓</div>
          <div>
            <div className="sidebar-logo-name">IPS Oman</div>
            <div className="sidebar-logo-sub">Student Portal</div>
          </div>
        </div>

        <div style={{padding:'10px 8px',borderBottom:'1px solid var(--sidebar-border)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',background:'rgba(255,255,255,0.04)',borderRadius:'var(--radius-md)'}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:pc+'33',color:pc,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.72rem',flexShrink:0}}>{user.avatar}</div>
            <div style={{overflow:'hidden',flex:1}}>
              <div style={{fontSize:'0.78rem',fontWeight:600,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{user.name}</div>
              <div style={{fontSize:'0.65rem',color:'var(--sidebar-muted)',textTransform:'capitalize'}}>{role}</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {nav.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={'nav-item' + (active?' active':'')}>
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Link href="/select-portal" className="nav-item"><span className="nav-icon">🔄</span><span>Switch Portal</span></Link>
          <button onClick={() => { localStorage.removeItem('ips_user'); router.push('/login') }} className="nav-item" style={{width:'100%',background:'none',border:'none'}}><span className="nav-icon">🚪</span><span>Sign Out</span></button>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-search"><span style={{color:'var(--text-light)'}}>🔍</span><input placeholder="Search..."/></div>
          <div className="topbar-actions">
            <div className="topbar-icon-btn" style={{position:'relative'}}>🔔<span className="notif-dot"/></div>
            <div className="topbar-icon-btn">✉️</div>
            <div className="user-pill">
              <div className="user-avatar" style={{background:pc}}>{user.avatar}</div>
              <div><div className="user-pill-name">{user.name.split(' ')[0]}</div><div className="user-pill-role" style={{textTransform:'capitalize'}}>{role}</div></div>
              <span style={{color:'var(--text-muted)',fontSize:'0.7rem',marginLeft:4}}>▼</span>
            </div>
          </div>
        </header>
        <main className="page-content animate-fadeinup">{children}</main>
      </div>
    </div>
  )
}


