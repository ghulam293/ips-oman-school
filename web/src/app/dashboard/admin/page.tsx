'use client'
import { useEffect, useState } from 'react'

interface User { name: string; role: string; avatar: string }

// ─── Mock data ───
const STATS = [
  { label:'Total Students', value:'1,250', change:'+5% from last month', icon:'🎓', color:'blue', trend:'up' },
  { label:'Teachers',       value:'68',    change:'+2% from last month', icon:'👨‍🏫', color:'amber', trend:'up' },
  { label:'Attendance',     value:'94%',   change:'+3% from last month', icon:'✅', color:'green', trend:'up' },
  { label:'Fees Collected', value:'87%',   change:'+8% from last month', icon:'💰', color:'purple', trend:'up' },
]

const RECENT_ACTIVITIES = [
  { icon:'📋', iconBg:'#dbeafe', iconColor:'#2563eb', title:'New admission application',    sub:'Ali Ahmed — Grade 4',               time:'10 min ago' },
  { icon:'💰', iconBg:'#d1fae5', iconColor:'#059669', title:'Fee payment received',         sub:'Sara Khan — 160 OMR',               time:'1 hour ago' },
  { icon:'✅', iconBg:'#fef3c7', iconColor:'#d97706', title:'Attendance marked',            sub:'Grade 6 — Science Class',           time:'2 hours ago' },
  { icon:'📝', iconBg:'#ede9fe', iconColor:'#7c3aed', title:'Exam results published',      sub:'Term 1 — Mathematics Grade 7',      time:'3 hours ago' },
  { icon:'🚌', iconBg:'#ccfbf1', iconColor:'#14b8a6', title:'Transport route updated',     sub:'Route 4 — Dhofar Heights',          time:'4 hours ago' },
  { icon:'👤', iconBg:'#fee2e2', iconColor:'#cc1a1a', title:'New staff onboarded',         sub:'Ms. Fatima Al-Hinai — Maths Dept.', time:'Yesterday' },
]

const PENDING_APPROVALS = [
  { icon:'📋', label:'Admission Applications', count:5, color:'#cc1a1a', bg:'#fee2e2', href:'/dashboard/admin/admissions' },
  { icon:'🗓️', label:'Leave Requests (Teacher)', count:3, color:'#d97706', bg:'#fef3c7', href:'/dashboard/admin/leave' },
  { icon:'💰', label:'Fee Payment Issues',      count:2, color:'#2563eb', bg:'#dbeafe', href:'/dashboard/admin/fees' },
  { icon:'📦', label:'Purchase Orders',         count:4, color:'#7c3aed', bg:'#ede9fe', href:'/dashboard/admin/inventory' },
  { icon:'🎫', label:'Service Requests',        count:6, color:'#059669', bg:'#d1fae5', href:'/dashboard/admin/requests' },
]

// Enrollment data Jan–Jun
const ENROLL_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun']
const ENROLL_DATA   = [980, 1020, 1080, 1120, 1180, 1250]
const ENROLL_MAX    = 1400

// Attendance Mon–Fri
const ATTEND_DAYS = ['Mon','Tue','Wed','Thu','Fri']
const ATTEND_DATA = [92, 94, 91, 96, 94]

const MODULE_SHORTCUTS = [
  { icon:'🎓', label:'Students',     href:'/dashboard/admin/students',   color:'#dbeafe', tc:'#2563eb' },
  { icon:'📋', label:'Admissions',   href:'/dashboard/admin/admissions', color:'#fee2e2', tc:'#cc1a1a' },
  { icon:'✅', label:'Attendance',   href:'/dashboard/admin/attendance', color:'#d1fae5', tc:'#059669' },
  { icon:'💰', label:'Fees',         href:'/dashboard/admin/fees',       color:'#fef3c7', tc:'#d97706' },
  { icon:'👨‍💼', label:'Staff',        href:'/dashboard/admin/staff',      color:'#ede9fe', tc:'#7c3aed' },
  { icon:'📝', label:'Exams',        href:'/dashboard/admin/exams',      color:'#ccfbf1', tc:'#14b8a6' },
  { icon:'📅', label:'Timetable',    href:'/dashboard/admin/timetable',  color:'#ffedd5', tc:'#f97316' },
  { icon:'🚌', label:'Transport',    href:'/dashboard/admin/transport',  color:'#dbeafe', tc:'#2563eb' },
  { icon:'🍽️', label:'Canteen',     href:'/dashboard/admin/canteen',    color:'#fef3c7', tc:'#d97706' },
  { icon:'📊', label:'Reports',      href:'/dashboard/admin/analytics',  color:'#ede9fe', tc:'#7c3aed' },
  { icon:'📗', label:'Library',      href:'/dashboard/admin/library',    color:'#d1fae5', tc:'#059669' },
  { icon:'⚙️', label:'Settings',    href:'/dashboard/admin/settings',   color:'#f1f5f9', tc:'#475569' },
]

export default function AdminDashboard() {
  const [user, setUser]    = useState<User | null>(null)
  const [time, setTime]    = useState(new Date())
  const [tab, setTab]      = useState<'overview'|'finance'|'academics'>('overview')

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (s) setUser(JSON.parse(s))
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateStr = time.toLocaleDateString('en-OM', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  const hour    = time.getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <span>🏠</span><span>Home</span>
            <span style={{color:'var(--border)'}}>›</span>
            <span>Dashboard</span>
          </div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">{dateStr}</p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <select className="form-select" style={{ width:'auto', fontSize:'0.82rem', padding:'6px 28px 6px 10px' }}>
            <option>Academic Year 2026-2027</option>
            <option>Academic Year 2025-2026</option>
          </select>
          <a href="/dashboard/admin/analytics" className="btn btn-primary btn-sm">📊 Full Analytics</a>
        </div>
      </div>

      {/* ── Greeting Banner ── */}
      <div style={{
        background:'linear-gradient(135deg, #1c2536 0%, #cc1a1a 100%)',
        borderRadius:'var(--radius-lg)', padding:'20px 24px', marginBottom:20,
        display:'flex', justifyContent:'space-between', alignItems:'center',
        boxShadow:'0 4px 20px rgba(204,26,26,0.2)',
      }}>
        <div>
          <div style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:4 }}>
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </div>
          <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.7)' }}>
            Here's what's happening in your school today
          </div>
        </div>
        <div style={{ display:'flex', gap:20, color:'rgba(255,255,255,0.9)', fontSize:'0.85rem' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'1.3rem', fontWeight:800 }}>18</div>
            <div style={{ fontSize:'0.72rem', opacity:0.7 }}>Pending Approvals</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'1.3rem', fontWeight:800 }}>5</div>
            <div style={{ fontSize:'0.72rem', opacity:0.7 }}>New Admissions</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'1.3rem', fontWeight:800 }}>3</div>
            <div style={{ fontSize:'0.72rem', opacity:0.7 }}>Leave Requests</div>
          </div>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div style={{ flex:1 }}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.trend === 'down' ? 'down' : ''}`}>
                {s.trend === 'up' ? '↑' : '↓'} {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Module Shortcuts ── */}
      <div className="card mb-6">
        <div className="card-header">
          <div><div className="card-title">Quick Access</div><div className="card-subtitle">Jump to any module</div></div>
        </div>
        <div style={{ padding:'16px 20px', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(90px,1fr))', gap:10 }}>
          {MODULE_SHORTCUTS.map(m => (
            <a key={m.label} href={m.href} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:6,
              padding:'14px 8px', borderRadius:'var(--radius-md)',
              background:m.color, textDecoration:'none', transition:'all 0.2s',
              border:`1px solid ${m.tc}20`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 12px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='none' }}>
              <span style={{ fontSize:'1.4rem' }}>{m.icon}</span>
              <span style={{ fontSize:'0.72rem', fontWeight:700, color:m.tc, textAlign:'center' }}>{m.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid-2 mb-6">
        {/* Student Enrollment Chart */}
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Student Enrollment</div><div className="card-subtitle">Jan – Jun 2026</div></div>
            <a href="/dashboard/admin/analytics" style={{ fontSize:'0.78rem', color:'var(--red-600)', fontWeight:600 }}>View All →</a>
          </div>
          <div style={{ padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:120, paddingBottom:8 }}>
              {ENROLL_DATA.map((v, i) => (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
                  <div style={{
                    width:'100%', height:`${(v/ENROLL_MAX)*100}%`,
                    background:`linear-gradient(180deg, #3b82f6, #2563eb)`,
                    borderRadius:'4px 4px 0 0',
                    position:'relative',
                    minHeight:8,
                  }}>
                    <div style={{
                      position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)',
                      fontSize:'0.6rem', fontWeight:700, color:'var(--text-muted)', whiteSpace:'nowrap',
                    }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, paddingTop:4, borderTop:'1px solid var(--border-light)' }}>
              {ENROLL_MONTHS.map((m, i) => (
                <div key={i} style={{ flex:1, textAlign:'center', fontSize:'0.7rem', color:'var(--text-muted)', fontWeight:600 }}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Overview Chart */}
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Attendance Overview</div><div className="card-subtitle">This week</div></div>
            <a href="/dashboard/admin/attendance" style={{ fontSize:'0.78rem', color:'var(--red-600)', fontWeight:600 }}>View All →</a>
          </div>
          <div style={{ padding:'20px' }}>
            {/* Line chart (CSS) */}
            <div style={{ height:120, position:'relative', marginBottom:8 }}>
              <svg viewBox="0 0 300 100" style={{ width:'100%', height:'100%', overflow:'visible' }}>
                <defs>
                  <linearGradient id="attend-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[80,85,90,95,100].map((v,i) => (
                  <g key={i}>
                    <line x1="0" y1={100-(v-75)*4} x2="300" y2={100-(v-75)*4}
                      stroke="#f1f5f9" strokeWidth="1"/>
                    <text x="-4" y={100-(v-75)*4+4} fontSize="7" fill="#94a3b8" textAnchor="end">{v}%</text>
                  </g>
                ))}
                {/* Area fill */}
                <path
                  d={`M 0 ${100-(ATTEND_DATA[0]-75)*4} ${ATTEND_DATA.map((v,i)=>`L ${i*75} ${100-(v-75)*4}`).join(' ')} L 300 100 L 0 100 Z`}
                  fill="url(#attend-grad)"/>
                {/* Line */}
                <path
                  d={ATTEND_DATA.map((v,i) => `${i===0?'M':'L'} ${i*75} ${100-(v-75)*4}`).join(' ')}
                  fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Dots */}
                {ATTEND_DATA.map((v,i) => (
                  <g key={i}>
                    <circle cx={i*75} cy={100-(v-75)*4} r="4" fill="#10b981" stroke="white" strokeWidth="2"/>
                    <text x={i*75} y={100-(v-75)*4-10} fontSize="8" fill="#059669" textAnchor="middle" fontWeight="700">{v}%</text>
                  </g>
                ))}
              </svg>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              {ATTEND_DAYS.map((d,i) => (
                <div key={i} style={{ fontSize:'0.7rem', color:'var(--text-muted)', fontWeight:600 }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Activities + Approvals ── */}
      <div className="grid-2 mb-6">
        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Recent Activities</div></div>
            <a href="/dashboard/admin/audit" style={{ fontSize:'0.78rem', color:'var(--red-600)', fontWeight:600 }}>View All →</a>
          </div>
          <div style={{ padding:'0 20px' }}>
            {RECENT_ACTIVITIES.map((a,i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{ background:a.iconBg, color:a.iconColor }}>{a.icon}</div>
                <div className="activity-content">
                  <div className="activity-title">{a.title}</div>
                  <div className="activity-sub">{a.sub}</div>
                </div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Pending Approvals</div>
              <div className="card-subtitle">Items requiring your action</div>
            </div>
            <span className="badge badge-red">20 total</span>
          </div>
          <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:10 }}>
            {PENDING_APPROVALS.map((p, i) => (
              <a key={i} href={p.href} style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'12px 14px', borderRadius:'var(--radius-md)',
                background:'var(--bg-light)', border:'1px solid var(--border)',
                textDecoration:'none', transition:'all 0.15s', color:'inherit',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='var(--red-50)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='var(--bg-light)'}>
                <div style={{
                  width:36, height:36, borderRadius:'var(--radius-md)',
                  background:p.bg, color:p.color,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem',
                }}>{p.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--text-dark)' }}>{p.label}</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{
                    background:p.bg, color:p.color,
                    fontWeight:800, fontSize:'0.85rem', padding:'3px 10px',
                    borderRadius:999, minWidth:28, textAlign:'center',
                  }}>{p.count}</span>
                  <span style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>›</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fee Collection Summary ── */}
      <div className="grid-3 mb-6">
        <div className="card" style={{ gridColumn:'span 2' }}>
          <div className="card-header">
            <div><div className="card-title">Fee Collection — Oct 2026</div></div>
            <a href="/dashboard/admin/fees" style={{ fontSize:'0.78rem', color:'var(--red-600)', fontWeight:600 }}>Manage Fees →</a>
          </div>
          <div style={{ padding:'20px' }}>
            <div style={{ display:'flex', gap:24, marginBottom:20 }}>
              {[
                { label:'Total Fees', value:'150,000 OMR', color:'var(--text-dark)' },
                { label:'Collected (87%)', value:'130,000 OMR', color:'var(--green-600)' },
                { label:'Pending (13%)', value:'20,000 OMR', color:'var(--red-600)' },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600, marginBottom:3 }}>{f.label}</div>
                  <div style={{ fontSize:'1.2rem', fontWeight:800, color:f.color }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div className="progress" style={{ height:10, marginBottom:12 }}>
              <div className="progress-bar green" style={{ width:'87%' }} />
            </div>
            <table className="data-table" style={{ fontSize:'0.82rem' }}>
              <thead>
                <tr><th>Student Name</th><th>Class</th><th>Total Fee</th><th>Paid</th><th>Status</th></tr>
              </thead>
              <tbody>
                {[
                  { name:'Ahmed Ali',   class:'Grade 1', total:'1,200', paid:'1,200', status:'Paid' },
                  { name:'Sara Khan',   class:'Grade 2', total:'1,200', paid:'800',   status:'Partial' },
                  { name:'Omar Hassan', class:'Grade 3', total:'1,500', paid:'0',     status:'Pending' },
                  { name:'Aisha Rahman',class:'Grade 4', total:'1,500', paid:'1,500', status:'Paid' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight:500, color:'var(--text-dark)' }}>{r.name}</td>
                    <td>{r.class}</td>
                    <td>{r.total} OMR</td>
                    <td>{r.paid} OMR</td>
                    <td>
                      <span className={r.status==='Paid'?'badge badge-green':r.status==='Partial'?'badge badge-amber':'badge badge-red'}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card" style={{ flex:1 }}>
            <div className="card-body" style={{ padding:16 }}>
              <div style={{ fontSize:'0.78rem', fontWeight:700, color:'var(--text-muted)', marginBottom:12 }}>TODAY'S SNAPSHOT</div>
              {[
                { label:'Classes Running',  value:34, icon:'🏫' },
                { label:'Online Classes',   value:6,  icon:'💻' },
                { label:'Visitors Today',   value:9,  icon:'🪪' },
                { label:'Leave Requests',   value:3,  icon:'📋' },
                { label:'Bus Routes Active',value:8,  icon:'🚌' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:i<4?'1px solid var(--border-light)':'' }}>
                  <span style={{ fontSize:'0.82rem', color:'var(--text-body)' }}>{item.icon} {item.label}</span>
                  <span style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--text-dark)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
