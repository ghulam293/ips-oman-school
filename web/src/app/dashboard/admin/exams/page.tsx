'use client'
import { useState } from 'react'

const SUBJECTS = [
  { subject:'English',        average:85, passRate:95, highest:98, lowest:62, grade:'A' },
  { subject:'Mathematics',    average:78, passRate:92, highest:100,lowest:55, grade:'B+' },
  { subject:'Science',        average:82, passRate:90, highest:97, lowest:58, grade:'A-' },
  { subject:'Arabic',         average:88, passRate:96, highest:100,lowest:70, grade:'A' },
  { subject:'Islamic Studies',average:91, passRate:98, highest:100,lowest:75, grade:'A+' },
  { subject:'Social Studies', average:76, passRate:88, highest:95, lowest:52, grade:'B' },
  { subject:'Physical Ed.',   average:90, passRate:100,highest:100,lowest:78, grade:'A+' },
]

const TOP_STUDENTS = [
  { name:'Layla Al-Balushi', class:'Grade 6A', total:96, grade:'A+', rank:1 },
  { name:'Ahmed Ali',        class:'Grade 6A', total:91, grade:'A+', rank:2 },
  { name:'Sara Khan',        class:'Grade 6B', total:89, grade:'A',  rank:3 },
  { name:'Aisha Rahman',     class:'Grade 6C', total:87, grade:'A',  rank:4 },
  { name:'Yousef Al-Siyabi', class:'Grade 6A', total:85, grade:'A-', rank:5 },
]

export default function ExamsPage() {
  const [term, setTerm]   = useState('Term 1')
  const [grade, setGrade] = useState('Grade 6')
  const [tab, setTab]     = useState<'results'|'schedule'|'reportcards'>('results')

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>🏠</span><span>Home</span><span>›</span><span>Exams & Results</span></div>
          <h1 className="page-title">Exam & Results Management</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn-secondary btn-sm">📄 Report Cards</button>
          <button className="btn btn-secondary btn-sm">📤 Export Results</button>
          <button className="btn btn-primary btn-sm">+ Schedule Exam</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-6">
        {[
          { label:'Exams Scheduled', value:12, icon:'📅', color:'blue' },
          { label:'Average Score',   value:'82%', icon:'📊', color:'green' },
          { label:'Pass Rate',       value:'94%', icon:'✅', color:'amber' },
          { label:'Pending Results', value:3,    icon:'⏳', color:'red' },
        ].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {([['results','📊 Exam Results'],['schedule','📅 Exam Schedule'],['reportcards','📄 Report Cards']] as const).map(([t,l])=>(
          <div key={t} className={`tab-item${tab===t?' active':''}`} onClick={()=>setTab(t)}>{l}</div>
        ))}
      </div>

      {tab === 'results' && (
        <div className="grid-2" style={{ gap:20 }}>
          {/* Subject results table */}
          <div className="card" style={{ gridColumn:'span 1' }}>
            <div className="card-header">
              <div><div className="card-title">Exam Results</div></div>
              <div style={{ display:'flex', gap:8 }}>
                <select className="form-select" style={{ width:'auto', fontSize:'0.78rem', padding:'4px 28px 4px 8px' }} value={term} onChange={e=>setTerm(e.target.value)}>
                  {['Term 1','Term 2','Term 3'].map(t=><option key={t}>{t}</option>)}
                </select>
                <select className="form-select" style={{ width:'auto', fontSize:'0.78rem', padding:'4px 28px 4px 8px' }} value={grade} onChange={e=>setGrade(e.target.value)}>
                  {['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'].map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Subject</th><th>Average</th><th>Pass %</th><th>Highest</th><th>Grade</th><th>Action</th></tr></thead>
                <tbody>
                  {SUBJECTS.map((s,i)=>(
                    <tr key={i}>
                      <td style={{ fontWeight:600, color:'var(--text-dark)' }}>{s.subject}</td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <span style={{ fontWeight:700, color:'var(--text-dark)' }}>{s.average}%</span>
                          <div className="progress" style={{ width:50, display:'inline-flex' }}>
                            <div className="progress-bar blue" style={{ width:`${s.average}%` }}/>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight:700, color:s.passRate>=90?'var(--green-600)':s.passRate>=80?'var(--amber-600)':'var(--red-600)' }}>
                          {s.passRate}%
                        </span>
                      </td>
                      <td>{s.highest}</td>
                      <td>
                        <span className={`badge ${s.average>=90?'badge-green':s.average>=75?'badge-blue':'badge-amber'}`}>{s.grade}</span>
                      </td>
                      <td><button className="btn btn-ghost btn-sm">📊</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top students */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">🏆 Top Students — {grade}</div></div>
              <div style={{ padding:'0 20px' }}>
                {TOP_STUDENTS.map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:i<4?'1px solid var(--border-light)':'' }}>
                    <div style={{
                      width:28, height:28, borderRadius:'50%', flexShrink:0,
                      background:i===0?'linear-gradient(135deg,#f59e0b,#d97706)':i===1?'linear-gradient(135deg,#94a3b8,#64748b)':'linear-gradient(135deg,#f97316,#ea580c)',
                      color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.7rem', fontWeight:700,
                    }}>{s.rank}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--text-dark)' }}>{s.name}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{s.class}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:800, fontSize:'1rem', color:'var(--text-dark)' }}>{s.total}%</div>
                      <span className="badge badge-green">{s.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publish results card */}
            <div className="card">
              <div className="card-body" style={{ padding:16 }}>
                <div style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:8 }}>Publish Results</div>
                <div className="alert alert-warning" style={{ marginBottom:10 }}>
                  ⚠️ Results for <strong>Term 1 — Grade 6</strong> are ready for publication.
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-primary">✅ Publish Now</button>
                  <button className="btn btn-secondary">Preview First</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'schedule' && (
        <div className="card">
          <div className="card-header"><div className="card-title">Upcoming Exam Schedule</div></div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Exam Name</th><th>Subject</th><th>Grade</th><th>Date</th><th>Time</th><th>Room</th><th>Invigilator</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { exam:'Mid-Term',  subject:'Mathematics',  grade:'Grade 6', date:'Oct 22', time:'9:00–11:00 AM', room:'B-101', inv:'Mr. Hassan', status:'Scheduled' },
                  { exam:'Mid-Term',  subject:'Science',      grade:'Grade 6', date:'Oct 23', time:'9:00–11:00 AM', room:'B-102', inv:'Ms. Sara',   status:'Scheduled' },
                  { exam:'Mid-Term',  subject:'English',      grade:'Grade 7', date:'Oct 24', time:'9:00–11:00 AM', room:'C-201', inv:'Mr. Ali',    status:'Scheduled' },
                  { exam:'Unit Test', subject:'Arabic',       grade:'Grade 5', date:'Oct 21', time:'8:00–9:30 AM',  room:'A-104', inv:'Ms. Huda',   status:'Confirmed' },
                ].map((r,i)=>(
                  <tr key={i}>
                    <td style={{ fontWeight:600 }}>{r.exam}</td>
                    <td>{r.subject}</td><td>{r.grade}</td><td>{r.date}</td>
                    <td style={{ fontSize:'0.8rem' }}>{r.time}</td>
                    <td>{r.room}</td><td>{r.inv}</td>
                    <td><span className={`badge ${r.status==='Confirmed'?'badge-green':'badge-blue'}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'reportcards' && (
        <div className="card">
          <div className="card-body">
            <div className="alert alert-info" style={{ marginBottom:16 }}>
              📄 Report cards can be generated per student or as a batch PDF for an entire class. Results must be published before report cards are generated.
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <select className="form-select" style={{ width:'auto' }}><option>Grade 6A</option><option>Grade 6B</option></select>
              <select className="form-select" style={{ width:'auto' }}><option>Term 1</option><option>Term 2</option></select>
              <button className="btn btn-primary">📄 Generate All Report Cards</button>
              <button className="btn btn-secondary">📤 Export to PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
