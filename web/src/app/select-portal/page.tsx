'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User { name: string; role: string; avatar: string; email: string }

const PORTAL_MAP: Record<string, { icon: string; name: string; desc: string; route: string; color: string }> = {
  admin:   { icon:'⚙️', name:'Admin Portal',   desc:'Manage school operations, staff, fees & reports', route:'/dashboard/admin',   color:'#cc1a1a' },
  teacher: { icon:'📚', name:'Teacher Portal',  desc:'Classes, attendance, exams & parent communication', route:'/dashboard/teacher', color:'#2563eb' },
  parent:  { icon:'👨‍👩‍👧', name:'Parent Portal',   desc:"Student progress, fees, results & messaging",       route:'/dashboard/parent',  color:'#059669' },
  student: { icon:'🎓', name:'Student Portal',  desc:'Learning materials, homework, quizzes & results',   route:'/dashboard/student', color:'#7c3aed' },
}

const ROLE_PORTAL: Record<string, string[]> = {
  super_admin:      ['admin'],
  director:         ['admin'],
  principal:        ['admin'],
  branch_admin:     ['admin'],
  admission_officer:['admin'],
  accountant:       ['admin'],
  hr_officer:       ['admin'],
  librarian:        ['admin'],
  receptionist:     ['admin'],
  canteen_manager:  ['admin'],
  nurse:            ['admin'],
  it_support:       ['admin'],
  transport_manager:['admin'],
  teacher:          ['teacher'],
  coordinator:      ['teacher'],
  parent:           ['parent'],
  student:          ['student'],
}

export default function SelectPortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [availablePortals, setAvailablePortals] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('ips_user')
    if (!stored) { router.push('/login'); return }
    const u = JSON.parse(stored)
    setUser(u)
    const portals = ROLE_PORTAL[u.role] || ['admin']
    setAvailablePortals(portals)
    // Single portal → auto redirect
    if (portals.length === 1) {
      setTimeout(() => router.push(PORTAL_MAP[portals[0]].route), 600)
    }
  }, [router])

  const go = (portalKey: string) => {
    router.push(PORTAL_MAP[portalKey].route)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-light)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: 560, padding: '40px 24px', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{
            width: 72, height: 72, marginBottom: 12,
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))',
          }}>
            <img
              src="/ips-crest.png"
              alt="International Pioneers School Crest"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-dark)' }}>
            INTERNATIONAL PIONEERS SCHOOL
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Learning Through Knowledge</div>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
            Choose Your Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>
            Welcome, <strong>{user?.name}</strong> — Select your role to continue
          </p>

          <div className="portal-grid">
            {Object.entries(PORTAL_MAP).map(([key, p]) => {
              const isAvail = availablePortals.includes(key)
              return (
                <div key={key}
                  className={`portal-card${!isAvail ? ' opacity-40' : ''}`}
                  onClick={() => isAvail && go(key)}
                  style={{
                    opacity: isAvail ? 1 : 0.35,
                    cursor: isAvail ? 'pointer' : 'not-allowed',
                  }}>
                  <div className="portal-icon" style={{ background: `${p.color}18` }}>
                    <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                  </div>
                  <div className="portal-name" style={{ color: isAvail ? p.color : 'var(--text-muted)' }}>{p.name}</div>
                  <div className="portal-desc">{p.desc}</div>
                  {isAvail && (
                    <div className="btn btn-primary btn-sm" style={{ background: p.color, borderColor: p.color, marginTop: 4 }}>
                      Enter →
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button onClick={() => { localStorage.removeItem('ips_user'); router.push('/login') }}
            style={{ marginTop: 20, fontSize: '0.78rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Sign out and use different account
          </button>
        </div>
      </div>
    </div>
  )
}
