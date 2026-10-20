'use client'
import { useState } from 'react'

const STUDENTS_ATTEND = [
  { id:1, name:'Ahmed Ali',    photo:'AA', status:'Present', time:'08:00 AM', color:'green' },
  { id:2, name:'Sara Khan',    photo:'SK', status:'Present', time:'08:02 AM', color:'green' },
  { id:3, name:'Omar Hassan',  photo:'OH', status:'Absent',  time:'—',        color:'red'   },
  { id:4, name:'Aisha Rahman', photo:'AR', status:'Present', time:'08:01 AM', color:'green' },
  { id:5, name:'Bilal Ahmed',  photo:'BA', status:'Late',    time:'08:15 AM', color:'amber' },
  { id:6, name:'Noor Al-Farsi',photo:'NF', status:'Present', time:'07:58 AM', color:'green' },
  { id:7, name:'Layla Al-Balushi',photo:'LB',status:'Present',time:'07:55 AM',color:'green' },
  { id:8, name:'Yousef Al-Siyabi',photo:'YS',status:'Absent',time:'—',        color:'red'   },
]

const AVATAR_C = ['avatar-red','avatar-blue','avatar-green','avatar-amber','avatar-purple']

export default function AttendancePage() {
  const [grade,   setGrade]   = useState('Grade 6')
  const [section, setSection] = useState('Section A')
  const [date,    setDate]    = useState('2026-10-19')
  const [view,    setView]    = useState<'class'|'summary'|'report'>('class')

  const present = STUDENTS_ATTEND.filter(s=>s.status==='Present').length
  const absent  = STUDENTS_ATTEND.filter(s=>s.status==='Absent').length
  const late    = STUDENTS_ATTEND.filter(s=>s.status==='Late').length

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>🏠</span><span>Home</span><span>›</span><span>Attendance</span></div>
          <h1 className="page-title">Attendance Management</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn-secondary btn-sm">📤 Export Report</button>
          <button className="btn btn-primary btn-sm">✅ Mark All Present</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-6">
        {[
          { label:'Present Today', value:present, total:STUDENTS_ATTEND.length, icon:'✅', color:'green', pct:`${Math.round(present/STUDENTS_ATTEND.length*100)}%` },
          { label:'Absent Today',  value:absent,  total:STUDENTS_ATTEND.length, icon:'❌', color:'red',   pct:`${Math.round(absent/STUDENTS_ATTEND.length*100)}%` },
          { label:'Late Arrivals', value:late,    total:STUDENTS_ATTEND.length, icon:'⏰', color:'amber', pct:`${Math.round(late/STUDENTS_ATTEND.length*100)}%` },
          { label:'Overall Rate',  value:'94%',   total:null, icon:'📊', color:'blue', pct:'This month' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change neutral">{s.pct}</div>
            </div>
          </div>
        ))}
      </div>

      {/* View tabs */}
      <div className="tabs">
        {([['class','📋 Class Attendance'],['summary','📊 Summary Report'],['report','📈 Monthly Report']] as const).map(([t,l])=>(
          <div key={t} className={`tab-item${view===t?' active':''}`} onClick={()=>setView(t)}>{l}</div>
        ))}
      </div>

      <div className="card">
        {/* Filters */}
        <div className="filter-bar">
          <select className="form-select" value={grade} onChange={e=>setGrade(e.target.value)}>
            {['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g=><option key={g}>{g}</option>)}
          </select>
          <select className="form-select" value={section} onChange={e=>setSection(e.target.value)}>
            {['Section A','Section B','Section C','Section D'].map(s=><option key={s}>{s}</option>)}
          </select>
          <input type="date" className="form-input" value={date} onChange={e=>setDate(e.target.value)}
            style={{ width:'auto' }}/>
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button className="btn btn-secondary btn-sm">📤 Export</button>
            <button className="btn btn-primary btn-sm">💾 Save Attendance</button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>#</th><th>Photo</th><th>Student Name</th><th>Status</th><th>Time</th><th>Note</th><th>Action</th></tr>
            </thead>
            <tbody>
              {STUDENTS_ATTEND.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color:'var(--text-muted)', fontWeight:600 }}>{i+1}</td>
                  <td><div className={`avatar avatar-sm ${AVATAR_C[i%AVATAR_C.length]}`}>{s.photo}</div></td>
                  <td style={{ fontWeight:600, color:'var(--text-dark)' }}>{s.name}</td>
                  <td>
                    <span className={`badge badge-${s.color}`} style={{ cursor:'pointer' }}>
                      {s.status==='Present'?'✓':s.status==='Absent'?'✗':'⏰'} {s.status}
                    </span>
                  </td>
                  <td style={{ fontFamily:'monospace', fontSize:'0.82rem' }}>{s.time}</td>
                  <td>
                    <input className="form-input" placeholder="Add note..." style={{ padding:'4px 8px', fontSize:'0.78rem', width:140 }}/>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:4 }}>
                      {['✅','❌','⏰','📋'].map((icon, ii) => (
                        <button key={ii} title={['Present','Absent','Late','Excused'][ii]}
                          className="btn btn-ghost btn-icon btn-sm"
                          style={{ padding:'4px 6px', fontSize:'0.85rem' }}>{icon}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
