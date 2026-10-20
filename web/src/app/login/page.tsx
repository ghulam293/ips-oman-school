'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEMO_USERS = [
  // Admin roles
  { email: 'superadmin@ipsoman.com',    password: 'ips2026', role: 'super_admin',      name: 'Super Admin',           avatar: 'SA', portal: 'admin' },
  { email: 'director@ipsoman.com',      password: 'ips2026', role: 'director',          name: 'Dr. Salim Al-Busaidi',  avatar: 'SB', portal: 'admin' },
  { email: 'principal@ipsoman.com',     password: 'ips2026', role: 'principal',         name: 'Dr. Aisha Al-Balushi',  avatar: 'AB', portal: 'admin' },
  { email: 'branch.admin@ipsoman.com',  password: 'ips2026', role: 'branch_admin',      name: 'Mohammed Al-Zadjali',   avatar: 'MZ', portal: 'admin' },
  { email: 'admissions@ipsoman.com',    password: 'ips2026', role: 'admission_officer', name: 'Sara Al-Farsi',         avatar: 'SF', portal: 'admin' },
  { email: 'accounts@ipsoman.com',      password: 'ips2026', role: 'accountant',        name: 'Khalid Al-Rashidi',     avatar: 'KR', portal: 'admin' },
  { email: 'hr@ipsoman.com',            password: 'ips2026', role: 'hr_officer',        name: 'Fatima Al-Hinai',       avatar: 'FH', portal: 'admin' },
  { email: 'librarian@ipsoman.com',     password: 'ips2026', role: 'librarian',         name: 'Huda Al-Masroori',      avatar: 'HM', portal: 'admin' },
  { email: 'reception@ipsoman.com',     password: 'ips2026', role: 'receptionist',      name: 'Noor Al-Amri',          avatar: 'NA', portal: 'admin' },
  { email: 'canteen@ipsoman.com',       password: 'ips2026', role: 'canteen_manager',   name: 'Yusuf Al-Siyabi',       avatar: 'YS', portal: 'admin' },
  { email: 'nurse@ipsoman.com',         password: 'ips2026', role: 'nurse',             name: 'Nurse Huda Al-Zadjali', avatar: 'HZ', portal: 'admin' },
  { email: 'it@ipsoman.com',            password: 'ips2026', role: 'it_support',        name: 'Omar Al-Balushi',       avatar: 'OB', portal: 'admin' },
  { email: 'transport@ipsoman.com',     password: 'ips2026', role: 'transport_manager', name: 'Ali Al-Harthi',         avatar: 'AH', portal: 'admin' },
  // Teacher
  { email: 'teacher@ipsoman.com',       password: 'ips2026', role: 'teacher',           name: 'Mr. Hassan Al-Farsi',   avatar: 'HF', portal: 'teacher' },
  { email: 'coordinator@ipsoman.com',   password: 'ips2026', role: 'coordinator',       name: 'Ms. Laila Al-Hinai',    avatar: 'LH', portal: 'teacher' },
  // Parent & Student
  { email: 'parent@ipsoman.com',        password: 'ips2026', role: 'parent',            name: 'Khalid Al-Rashidi',     avatar: 'KR', portal: 'parent' },
  { email: 'student@ipsoman.com',       password: 'ips2026', role: 'student',           name: 'Layla Al-Rashidi',      avatar: 'LR', portal: 'student' },
]

const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin', director: 'School Director', principal: 'Principal',
  branch_admin: 'Branch Admin', admission_officer: 'Admission Officer', accountant: 'Accountant',
  hr_officer: 'HR Officer', librarian: 'Librarian', receptionist: 'Receptionist',
  canteen_manager: 'Canteen Manager', nurse: 'Nurse / Counselor', it_support: 'IT Support',
  transport_manager: 'Transport Manager', teacher: 'Teacher', coordinator: 'Class Coordinator',
  parent: 'Parent / Guardian', student: 'Student',
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [lang, setLang]       = useState<'en'|'ar'>('en')
  const isRtl = lang === 'ar'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const u = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!u) { setError('Invalid email or password. Please try again.'); setLoading(false); return }
    localStorage.setItem('ips_user', JSON.stringify({ name: u.name, role: u.role, avatar: u.avatar, email: u.email, portal: u.portal }))
    router.push('/select-portal')
  }

  const quickLogin = (u: typeof DEMO_USERS[0]) => { setEmail(u.email); setPassword(u.password) }

  return (
    <div className="auth-wrap" dir={isRtl ? 'rtl' : 'ltr'} lang={lang}>
      {/* Left brand panel */}
      <div className="auth-brand-panel">
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* School crest */}
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'linear-gradient(135deg, #cc1a1a, #991b1b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', marginBottom: 20,
            boxShadow: '0 4px 24px rgba(204,26,26,0.4)',
            border: '3px solid rgba(255,255,255,0.15)',
          }}>🏫</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            International Pioneers School
          </div>
          <div style={{ fontSize: 13, color: '#6b7fa8', marginBottom: 6 }}>Salalah, Dhofar, Oman</div>
          <div style={{
            background: 'rgba(204,26,26,0.15)', border: '1px solid rgba(204,26,26,0.3)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 32,
          }}>
            <span style={{ color: '#f87171', fontSize: 13, fontStyle: 'italic', fontWeight: 600 }}>
              "Learning Through Knowledge"
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 40 }}>
            {[['1,250', 'Students'], ['68', 'Staff'], ['22+', 'Nations'], ['PG–12', 'Grades']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{v}</div>
                <div style={{ fontSize: 11, color: '#6b7fa8', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* School photo placeholder */}
          <div style={{
            width: '100%', maxWidth: 340, height: 160, borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #1c2536, #2d3a4a)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <div style={{ fontSize: '2.5rem' }}>🏛️</div>
              <div style={{ fontSize: 12, color: '#6b7fa8' }}>IPS Oman — Salalah Campus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-card animate-fadeinup">
          {/* Lang toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, background: '#cc1a1a', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
              }}>🏫</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>IPS Oman Portal</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['en', 'ar'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '4px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700,
                  border: lang===l ? '1.5px solid #cc1a1a' : '1.5px solid var(--border)',
                  background: lang===l ? '#cc1a1a' : 'transparent',
                  color: lang===l ? '#fff' : 'var(--text-muted)', cursor: 'pointer',
                }}>{ l === 'en' ? 'EN' : 'عربي'}</button>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 4 }}>
            {isRtl ? 'أهلاً بعودتك' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>
            {isRtl ? 'قم بتسجيل الدخول إلى بوابة المدرسة' : 'Login to your School Portal'}
          </p>

          {error && <div className="alert alert-danger" style={{ marginBottom: 14 }}>⚠️ {error}</div>}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">{isRtl ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email or Username'}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontSize: '1rem' }}>👤</span>
                <input id="email" type="email" className="form-input" style={{ paddingLeft: 34 }}
                  placeholder="name@ipsoman.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              </div>
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">{isRtl ? 'كلمة المرور' : 'Password'}</label>
                <a href="#" style={{ fontSize: '0.75rem', color: '#cc1a1a', fontWeight: 600 }}>
                  {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontSize: '1rem' }}>🔒</span>
                <input id="password" type="password" className="form-input" style={{ paddingLeft: 34 }}
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="remember" style={{ accentColor: '#cc1a1a' }} />
              <label htmlFor="remember" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {isRtl ? 'تذكرني' : 'Remember Me'}
              </label>
            </div>
            <button id="login-btn" type="submit" className="btn btn-primary w-full" disabled={loading}
              style={{ justifyContent: 'center', padding: '11px', marginTop: 4, fontSize: '0.9rem' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  {isRtl ? 'جاري الدخول...' : 'Signing in...'}
                </span>
              ) : (isRtl ? 'تسجيل الدخول' : 'Login')}
            </button>
          </form>

          <div style={{ position: 'relative', margin: '18px 0', textAlign: 'center' }}>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', padding: '0 10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              or continue with
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['🔵', 'Login with Google'], ['🟦', 'Login with Microsoft']].map(([icon, label]) => (
              <button key={label} className="btn btn-secondary w-full" style={{ justifyContent: 'center', fontSize: '0.78rem' }}>
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Demo accounts */}
          <div style={{ marginTop: 18 }}>
            <button onClick={() => setShowDemo(!showDemo)} style={{
              width: '100%', padding: '8px', border: '1.5px dashed var(--border)',
              background: 'var(--bg-light)', borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              🔑 Demo Accounts (all password: ips2026) {showDemo ? '▲' : '▼'}
            </button>
            {showDemo && (
              <div style={{
                marginTop: 8, maxHeight: 220, overflowY: 'auto',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: '#fff',
              }}>
                {DEMO_USERS.map(u => (
                  <button key={u.email} onClick={() => quickLogin(u)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', background: 'none', border: 'none',
                    borderBottom: '1px solid var(--border-light)', cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    <div className="avatar avatar-sm avatar-red">{u.avatar}</div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-dark)' }}>{u.name}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ROLE_LABELS[u.role]}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-light)' }}>{u.email}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
