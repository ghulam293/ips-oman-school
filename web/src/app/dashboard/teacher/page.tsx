'use client'
import { useEffect, useState } from 'react'

export default function TeacherDashboard() {
  const [user, setUser] = useState<{name:string}>({ name:'Teacher' })
  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (s) setUser(JSON.parse(s))
  }, [])

  const TODAY_CLASSES = [
    { time:'07:30', subject:'Mathematics', grade:'Grade 6A', room:'B-101', students:28, done:true  },
    { time:'09:00', subject:'Mathematics', grade:'Grade 7B', room:'B-101', students:31, done:true  },
    { time:'10:30', subject:'Mathematics', grade:'Grade 5C', room:'B-101', students:26, done:false },
    { time:'13:00', subject:'Mathematics', grade:'Grade 6B', room:'B-103', students:29, done:false },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Teacher Dashboard</h1>
          <p className="page-subtitle">Welcome, {user.name} — Monday, October 19, 2026</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <a href="/dashboard/teacher/attendance" className="btn btn-primary btn-sm">✅ Take Attendance</a>
          <a href="/dashboard/teacher/homework" className="btn btn-secondary btn-sm">+ Post Homework</a>
        </div>
      </div>

      <div className="grid-4 mb-6">
        {[
          {label:'Classes Today', value:4, icon:'🏫', color:'blue'},
          {label:'Pending Grading', value:3, icon:'📝', color:'red'},
          {label:'Parent Meetings', value:3, icon:'📅', color:'amber'},
          {label:'Avg. Attendance', value:'93%', icon:'✅', color:'green'},
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="card-header"><div className="card-title">Today's Classes</div><a href="/dashboard/teacher/timetable" style={{fontSize:'0.78rem',color:'var(--red-600)',fontWeight:600}}>Full Timetable →</a></div>
        <div style={{padding:'0 20px'}}>
          {TODAY_CLASSES.map((cls,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'14px 0',borderBottom:i<TODAY_CLASSES.length-1?'1px solid var(--border-light)':''}}>
              <div style={{width:70,textAlign:'center',background:cls.done?'var(--green-50)':'var(--amber-50)',padding:'6px',borderRadius:'var(--radius-sm)'}}>
                <div style={{fontSize:'0.85rem',fontWeight:700,color:cls.done?'var(--green-600)':'var(--amber-600)'}}>{cls.time}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,color:'var(--text-dark)'}}>{cls.subject} — {cls.grade}</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Room {cls.room} · {cls.students} students</div>
              </div>
              {cls.done
                ? <span className="badge badge-green">✅ Attendance Taken</span>
                : <a href="/dashboard/teacher/attendance" className="btn btn-primary btn-sm">Take Attendance</a>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Homework to Grade</div><span className="badge badge-red">3 pending</span></div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Student</th><th>Task</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  {s:'Hassan Al-Balushi',g:'Grade 7B',t:'Algebra Ch.4',     st:'Graded'},
                  {s:'Noor Al-Farsi',   g:'Grade 6A',t:'Fractions WS',      st:'Pending'},
                  {s:'Omar Al-Hinai',   g:'Grade 6A',t:'Fractions WS',      st:'Pending'},
                  {s:'Layla Al-Rashidi',g:'Grade 6A',t:'Fractions WS',      st:'Late'},
                ].map((hw,i) => (
                  <tr key={i}>
                    <td><div style={{fontWeight:500,color:'var(--text-dark)',fontSize:'0.85rem'}}>{hw.s}</div><div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{hw.g}</div></td>
                    <td style={{fontSize:'0.82rem'}}>{hw.t}</td>
                    <td><span className={`badge ${hw.st==='Graded'?'badge-green':hw.st==='Late'?'badge-red':'badge-amber'}`}>{hw.st}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Upcoming Parent Meetings</div><a href="/dashboard/teacher/appointments" style={{fontSize:'0.78rem',color:'var(--red-600)',fontWeight:600}}>Manage →</a></div>
          <div style={{padding:'0 20px'}}>
            {[
              {parent:'Mr. Khalid Al-Rashidi',child:'Layla Al-Rashidi',slot:'Today 3:00 PM',st:'Confirmed'},
              {parent:'Mrs. Sara Al-Siyabi',  child:'Mohammed Al-Siyabi',slot:'Tue 10:00 AM',st:'Pending'},
              {parent:'Mr. Ali Al-Farsi',     child:'Noor Al-Farsi',   slot:'Wed 11:30 AM',st:'Confirmed'},
            ].map((m,i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:i<2?'1px solid var(--border-light)':'',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:'0.85rem',fontWeight:600,color:'var(--text-dark)'}}>{m.parent}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Re: {m.child} · {m.slot}</div>
                </div>
                <span className={`badge ${m.st==='Confirmed'?'badge-green':'badge-amber'}`}>{m.st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
