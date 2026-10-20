'use client'
export default function SecurityDashboard() {
  return (
    <div>
      <h1 className="text-h2" style={{marginBottom:'8px'}}>Security / Gate Dashboard</h1>
      <p style={{color:'#64748b',marginBottom:'24px'}}>Visitor verification, authorized pickups, and entry/exit log</p>
      <div className="grid-3" style={{marginBottom:'24px'}}>
        {[
          { label:'Expected Visitors', value:9, icon:'🪪', color:'blue' },
          { label:'Authorized Pickups', value:3, icon:'👤', color:'gold' },
          { label:'Open Incidents', value:1, icon:'⚠️', color:'red' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-content">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="text-h4" style={{marginBottom:'14px'}}>Authorized Pickups — Today</h3>
        <table className="data-table">
          <thead><tr><th>Student</th><th>Grade</th><th>Authorized By</th><th>Pickup Person</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { student:'Layla Al-Rashidi', grade:'6A', by:'Parent', pickup:'Khalid Al-Rashidi', status:'Approved' },
              { student:'Saif Al-Rashidi',  grade:'9B', by:'Parent', pickup:'Khalid Al-Rashidi', status:'Approved' },
              { student:'Noor Al-Farsi',    grade:'5C', by:'Admin',  pickup:'Grandmother',        status:'Pending Verify' },
            ].map((row, i) => (
              <tr key={i}>
                <td style={{fontWeight:'500',color:'#f1f5f9'}}>{row.student}</td>
                <td>{row.grade}</td>
                <td style={{fontSize:'0.82rem'}}>{row.by}</td>
                <td style={{fontSize:'0.82rem'}}>{row.pickup}</td>
                <td>
                  <span className={row.status==='Approved'?'badge badge-green':'badge badge-gold'}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
