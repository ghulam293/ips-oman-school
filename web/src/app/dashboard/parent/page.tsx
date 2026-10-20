'use client'
import { useState, useEffect } from 'react'

const CHILDREN = [
  { id:1, name:'Layla Al-Rashidi', grade:'Grade 6A', avatar:'LR', color:'#7c3aed', attendance:94, homeworkDue:2, lastResult:'88%', bus:'Route 4 · 3:45 PM' },
  { id:2, name:'Saif Al-Rashidi',  grade:'Grade 9B', avatar:'SR', color:'#2563eb', attendance:97, homeworkDue:1, lastResult:'91%', bus:'Route 4 · 3:50 PM' },
]

export default function ParentDashboard() {
  const [user, setUser] = useState<{name:string}>({name:'Parent'})
  const [activeChild, setActiveChild] = useState(0)
  useEffect(() => { const s = localStorage.getItem('ips_user'); if(s) setUser(JSON.parse(s)) }, [])

  const child = CHILDREN[activeChild]

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Parent Dashboard</h1><p className="page-subtitle">Welcome, {user.name}</p></div>
      </div>

      {/* Child switcher */}
      <div style={{display:'flex',gap:10,marginBottom:20}}>
        {CHILDREN.map((c,i) => (
          <button key={c.id} onClick={() => setActiveChild(i)} style={{
            display:'flex',alignItems:'center',gap:10,padding:'10px 18px',
            borderRadius:'var(--radius-lg)',cursor:'pointer',transition:'all 0.2s',
            border:`2px solid ${activeChild===i?c.color:'var(--border)'}`,
            background:activeChild===i?c.color+'10':'var(--bg-white)',
          }}>
            <div style={{width:36,height:36,borderRadius:'50%',background:c.color+'22',color:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.8rem'}}>{c.avatar}</div>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:'0.85rem',fontWeight:600,color:activeChild===i?c.color:'var(--text-dark)'}}>{c.name}</div>
              <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{c.grade}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid-4 mb-6">
        {[
          {label:'Attendance',   value:`${child.attendance}%`, icon:'✅', color:'green'},
          {label:'Homework Due', value:child.homeworkDue,      icon:'📖', color:'amber'},
          {label:'Last Result',  value:child.lastResult,       icon:'📊', color:'blue'},
          {label:'Bus ETA',      value:child.bus.split('·')[1].trim(), icon:'🚌', color:'purple'},
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Today's Activity</div></div>
          <div style={{padding:'0 20px'}}>
            {[
              {icon:'✅',bg:'#d1fae5',tc:'#059669',msg:`${child.name} arrived at school`,time:'07:52 AM'},
              {icon:'📖',bg:'#fef3c7',tc:'#d97706',msg:'New homework: Science Worksheet due Oct 22',time:'08:15 AM'},
              {icon:'📣',bg:'#ede9fe',tc:'#7c3aed',msg:'Sports Day — Friday Oct 24. Bring sports kit.',time:'09:00 AM'},
              {icon:'✅',bg:'#d1fae5',tc:'#059669',msg:'Mathematics homework submitted',time:'11:30 AM'},
            ].map((a,i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{background:a.bg,color:a.tc}}>{a.icon}</div>
                <div className="activity-content"><div className="activity-title">{a.msg}</div></div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card">
            <div className="card-header"><div className="card-title">Homework</div></div>
            <div style={{padding:'0 20px'}}>
              {[
                {sub:'Science',     title:'Ecosystem Diagram',    due:'Oct 22',st:'Not Started'},
                {sub:'Mathematics', title:'Fractions Practice',   due:'Oct 21',st:'Viewed'},
                {sub:'Physics',     title:'Chapter 3 Problems',   due:'Oct 23',st:'Submitted'},
              ].filter((_,i) => i < (child.homeworkDue + 1)).map((hw,i) => (
                <div key={i} style={{padding:'11px 0',borderBottom:i<child.homeworkDue?'1px solid var(--border-light)':'',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:'0.75rem',fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase'}}>{hw.sub}</div>
                    <div style={{fontSize:'0.85rem',fontWeight:500,color:'var(--text-dark)'}}>{hw.title}</div>
                    <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>Due: {hw.due}</div>
                  </div>
                  <span className={`badge ${hw.st==='Submitted'?'badge-green':hw.st==='Viewed'?'badge-blue':'badge-red'}`}>{hw.st}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Quick Actions</div></div>
            <div style={{padding:'12px 20px',display:'flex',flexDirection:'column',gap:8}}>
              {[
                {icon:'🗓️',label:'Report Absence',  href:'/dashboard/parent/leave'},
                {icon:'📅',label:'Book Appointment',href:'/dashboard/parent/appointments'},
                {icon:'🍽️',label:'Meal Plan',       href:'/dashboard/parent/cafeteria'},
                {icon:'🚌',label:'Track Bus Live',   href:'/dashboard/parent/transport'},
                {icon:'💰',label:'Pay Fees',         href:'/dashboard/parent/fees'},
              ].map(a => (
                <a key={a.label} href={a.href} className="btn btn-secondary" style={{justifyContent:'flex-start',gap:10,fontSize:'0.85rem'}}>{a.icon} {a.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
