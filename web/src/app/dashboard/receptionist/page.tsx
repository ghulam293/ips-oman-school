'use client'
export default function ReceptionistDashboard() {
  return (
    <div>
      <h1 className="text-h2" style={{marginBottom:'8px'}}>Reception Dashboard</h1>
      <p style={{color:'#64748b',marginBottom:'24px'}}>Visitor management, appointments, and inquiries</p>

      <div className="grid-3" style={{marginBottom:'24px'}}>
        {[
          { label:'Visitors Today', value:9, icon:'🪪', color:'blue' },
          { label:'Appointments', value:5, icon:'📅', color:'gold' },
          { label:'New Inquiries', value:2, icon:'💬', color:'emerald' },
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
        <h3 className="text-h4" style={{marginBottom:'14px'}}>Today's Expected Visitors</h3>
        <table className="data-table">
          <thead><tr><th>Visitor Name</th><th>Purpose</th><th>Expected Time</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { name:'Mr. Khalid Al-Rashidi', purpose:'Parent-Teacher Meeting', time:'3:00 PM', status:'Confirmed' },
              { name:'Mrs. Huda Al-Farsi',   purpose:'Admissions Inquiry',      time:'10:30 AM',status:'Arrived' },
              { name:'Ahmed Al-Balushi',      purpose:'Document Submission',     time:'11:00 AM',status:'Pending' },
              { name:'Visitor - Walk-in',     purpose:'General Inquiry',         time:'N/A',     status:'Arrived' },
            ].map((v, i) => (
              <tr key={i}>
                <td style={{fontWeight:'500',color:'#f1f5f9'}}>{v.name}</td>
                <td style={{fontSize:'0.85rem'}}>{v.purpose}</td>
                <td style={{fontSize:'0.82rem',color:'#94a3b8'}}>{v.time}</td>
                <td>
                  <span className={v.status==='Arrived'?'badge badge-green':v.status==='Confirmed'?'badge badge-blue':'badge badge-gold'}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
