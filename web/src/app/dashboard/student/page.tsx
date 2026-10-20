'use client'
import { useState, useEffect } from 'react'

const TIMETABLE = [
  {time:'07:30–08:30', mon:'Mathematics', tue:'Science',    wed:'Arabic',   thu:'Mathematics', fri:'P.E.'},
  {time:'08:30–09:30', mon:'Science',     tue:'Mathematics',wed:'English',  thu:'Science',     fri:'Arts'},
  {time:'09:30–10:00', mon:'Break ☕',    tue:'Break ☕',   wed:'Break ☕', thu:'Break ☕',    fri:'Break ☕'},
  {time:'10:00–11:00', mon:'English',     tue:'Arabic',     wed:'Mathematics',thu:'English',   fri:'Social Studies'},
  {time:'11:00–12:00', mon:'Social Studies',tue:'P.E.',    wed:'Science',  thu:'Arabic',      fri:'Free Period'},
  {time:'12:00–12:30', mon:'Lunch 🍽️',   tue:'Lunch 🍽️', wed:'Lunch 🍽️',thu:'Lunch 🍽️',  fri:'End of School'},
  {time:'12:30–13:30', mon:'Arabic',      tue:'English',   wed:'P.E.',     thu:'Arts',        fri:'—'},
]

const RESULTS = [
  {sub:'Mathematics',    marks:88,max:100,grade:'A'},
  {sub:'Science',        marks:92,max:100,grade:'A+'},
  {sub:'English',        marks:79,max:100,grade:'B+'},
  {sub:'Arabic',         marks:85,max:100,grade:'A'},
  {sub:'Social Studies', marks:76,max:100,grade:'B'},
  {sub:'Islamic Studies',marks:91,max:100,grade:'A+'},
]

export default function StudentDashboard() {
  const [user, setUser] = useState<{name:string}>({name:'Student'})
  const [tab, setTab] = useState<'overview'|'timetable'|'homework'|'results'>('overview')
  const today = new Date().getDay() - 1 // Mon=0

  useEffect(() => { const s = localStorage.getItem('ips_user'); if(s) setUser(JSON.parse(s)) }, [])

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Student Portal</h1><p className="page-subtitle">Layla Al-Rashidi · Grade 6A · Roll No. 2024-0142</p></div>
        <a href="/dashboard/student/online-classes" className="btn btn-primary btn-sm">💻 Join Online Class</a>
      </div>

      <div className="grid-4 mb-6">
        {[
          {label:'Attendance', value:'94%',    icon:'✅', color:'green'},
          {label:'Homework Due',value:2,       icon:'📖', color:'amber'},
          {label:'Last Exam',  value:'88/100', icon:'📝', color:'blue'},
          {label:'Class Rank', value:'4th',    icon:'🏅', color:'purple'},
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {([['overview','🏠 Overview'],['timetable','📅 Timetable'],['homework','📖 Homework'],['results','📊 Results']] as const).map(([t,l]) => (
          <div key={t} className={`tab-item${tab===t?' active':''}`} onClick={()=>setTab(t)}>{l}</div>
        ))}
      </div>

      {tab==='overview' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><div className="card-title">Today's Classes</div></div>
            <div style={{padding:'0 20px'}}>
              {[
                {time:'07:30',sub:'Mathematics',room:'B-101',teacher:'Mr. Hassan'},
                {time:'09:00',sub:'Science',     room:'B-102',teacher:'Ms. Sara'},
                {time:'10:00',sub:'English',     room:'C-201',teacher:'Mr. Ali'},
                {time:'13:00',sub:'Arabic',      room:'A-104',teacher:'Ms. Huda'},
              ].map((c,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 0',borderBottom:i<3?'1px solid var(--border-light)':''}}>
                  <div style={{width:52,textAlign:'center',background:'var(--blue-50)',borderRadius:'var(--radius-sm)',padding:'5px',flexShrink:0}}>
                    <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--blue-600)'}}>{c.time}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,color:'var(--text-dark)',fontSize:'0.9rem'}}>{c.sub}</div>
                    <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{c.room} · {c.teacher}</div>
                  </div>
                  <a href="/dashboard/student/online-classes" className="btn btn-ghost btn-sm">Join 💻</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="card">
              <div className="card-header"><div className="card-title">Pending Homework</div></div>
              <div style={{padding:'0 20px'}}>
                {[
                  {sub:'Science',     title:'Ecosystem Diagram', due:'Oct 22', st:'Not Started'},
                  {sub:'Mathematics', title:'Fractions p.45',    due:'Oct 21', st:'Viewed'},
                ].map((hw,i) => (
                  <div key={i} style={{padding:'11px 0',borderBottom:i<1?'1px solid var(--border-light)':'',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontSize:'0.72rem',fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase'}}>{hw.sub}</div>
                      <div style={{fontSize:'0.85rem',fontWeight:500,color:'var(--text-dark)'}}>{hw.title}</div>
                      <div style={{fontSize:'0.72rem',color:'var(--red-600)',fontWeight:600}}>Due: {hw.due}</div>
                    </div>
                    <span className={`badge ${hw.st==='Viewed'?'badge-blue':'badge-red'}`}>{hw.st}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Quick Links</div></div>
              <div style={{padding:'12px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[
                  {icon:'📖',label:'My Homework',href:'/dashboard/student/homework'},
                  {icon:'📊',label:'My Results', href:'/dashboard/student/results'},
                  {icon:'📗',label:'Library',    href:'/dashboard/student/library'},
                  {icon:'🎯',label:'LMS Courses',href:'/dashboard/student/lms'},
                  {icon:'📣',label:'Notices',    href:'/dashboard/student/notices'},
                  {icon:'🎮',label:'Games',      href:'/dashboard/student/games'},
                ].map(a => (
                  <a key={a.label} href={a.href} style={{
                    display:'flex',alignItems:'center',gap:8,padding:'9px 10px',
                    borderRadius:'var(--radius-md)',border:'1px solid var(--border)',
                    background:'var(--bg-light)',textDecoration:'none',
                    fontSize:'0.82rem',fontWeight:600,color:'var(--text-body)',transition:'all 0.15s',
                  }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='var(--red-50)'}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='var(--bg-light)'}>
                    {a.icon} {a.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='timetable' && (
        <div className="card">
          <div className="card-header"><div className="card-title">Weekly Timetable — Grade 6A</div></div>
          <div className="table-wrap">
            <table className="data-table" style={{minWidth:600}}>
              <thead>
                <tr>
                  <th style={{width:110}}>Time</th>
                  {['Mon','Tue','Wed','Thu','Fri'].map((d,i) => (
                    <th key={d} style={{color:i===today?'var(--red-600)':'',background:i===today?'var(--red-50)':''}}>{d}{i===today?' ★':''}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMETABLE.map((row,ri) => (
                  <tr key={ri}>
                    <td style={{fontSize:'0.75rem',color:'var(--text-muted)',fontWeight:600}}>{row.time}</td>
                    {['mon','tue','wed','thu','fri'].map((d,di) => {
                      const val = row[d as keyof typeof row] as string
                      const isBreak = val.includes('Break')||val.includes('Lunch')||val==='—'
                      return (
                        <td key={d} style={{
                          background:di===today?'rgba(204,26,26,0.03)':undefined,
                          color:isBreak?'var(--text-light)':'var(--text-body)',
                          fontStyle:isBreak?'italic':undefined,
                          fontWeight:isBreak?400:500,fontSize:'0.82rem',
                        }}>{val}</td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='results' && (
        <div className="card">
          <div className="card-header"><div className="card-title">Mid-Term Results — Term 1, 2026</div><select className="form-select" style={{width:'auto',fontSize:'0.78rem'}}><option>Term 1</option></select></div>
          <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:14}}>
            {RESULTS.map((r,i) => (
              <div key={i}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:'0.875rem',fontWeight:500}}>{r.sub}</span>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                    <span style={{fontSize:'0.875rem',color:'var(--text-muted)'}}>{r.marks}/{r.max}</span>
                    <span style={{fontWeight:800,fontSize:'0.9rem',color:r.marks>=90?'var(--green-600)':r.marks>=75?'var(--blue-600)':'var(--red-600)'}}>{r.grade}</span>
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{
                    width:`${(r.marks/r.max)*100}%`,
                    background:r.marks>=90?'linear-gradient(90deg,#059669,#34d399)':r.marks>=75?'linear-gradient(90deg,#2563eb,#60a5fa)':'linear-gradient(90deg,#cc1a1a,#f87171)',
                  }}/>
                </div>
              </div>
            ))}
            <div style={{marginTop:8,padding:'14px',borderRadius:'var(--radius-md)',background:'var(--green-50)',border:'1px solid var(--green-100)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700,color:'var(--green-600)'}}>Overall: 84% — Grade A</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Class Rank: 4 / 28 students</div>
              </div>
              <button className="btn btn-secondary btn-sm">📄 Download Report Card</button>
            </div>
          </div>
        </div>
      )}

      {tab==='homework' && (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {[
            {sub:'Mathematics', title:'Chapter 5 Problems',     due:'Oct 21',st:'Not Started',icon:'📐'},
            {sub:'Science',     title:'Ecosystem Diagram',       due:'Oct 22',st:'Viewed',     icon:'🔬'},
            {sub:'English',     title:'Short Essay — My School', due:'Oct 23',st:'Submitted',  icon:'📝'},
            {sub:'Arabic',      title:'قراءة الدرس السابع',       due:'Oct 24',st:'Not Started',icon:'📖'},
          ].map((hw,i) => (
            <div key={i} className="card" style={{display:'flex',alignItems:'center',gap:16,padding:'16px 20px'}}>
              <div style={{fontSize:'2rem'}}>{hw.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <span style={{fontSize:'0.72rem',fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase'}}>{hw.sub}</span>
                  <span className={`badge ${hw.st==='Submitted'?'badge-green':hw.st==='Viewed'?'badge-blue':'badge-red'}`}>{hw.st}</span>
                </div>
                <div style={{fontWeight:600,color:'var(--text-dark)'}}>{hw.title}</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Due: {hw.due}</div>
              </div>
              {hw.st !== 'Submitted' && <button className="btn btn-primary btn-sm">Submit</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
