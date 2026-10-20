'use client'
export default function NurseDashboard() {
  return (
    <div>
      <h1 className="text-h2" style={{marginBottom:'8px'}}>Nurse / Student Care</h1>
      <p style={{color:'#64748b',marginBottom:'24px'}}>Clinic visits, medical records, and emergency management</p>
      <div className="alert alert-warning">
        🔒 <strong>Restricted Access</strong> — Medical, counseling and safeguarding data require separate sub-permissions. Full implementation in Phase 4.
      </div>
      <div className="grid-3" style={{marginTop:'20px'}}>
        {[
          { label:'Clinic Visits Today', value:2, icon:'🏥', color:'red' },
          { label:'Allergy Alerts', value:14, icon:'⚠️', color:'gold' },
          { label:'Open Referrals', value:3, icon:'📋', color:'blue' },
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
    </div>
  )
}
