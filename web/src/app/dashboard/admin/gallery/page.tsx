'use client'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <span>🏠</span><span>Home</span>
            <span style={{color:'var(--border)'}}>›</span>
            <span>Photo Gallery</span>
          </div>
          <h1 className="page-title">🖼️ Photo Gallery</h1>
          <p className="page-subtitle">School albums, categorized uploads, consent flags and restricted viewing.</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-secondary btn-sm">📤 Export</button>
          <button className="btn btn-primary btn-sm">+ Add New</button>
        </div>
      </div>

      <div className="alert alert-info" style={{marginBottom:20}}>
        🚧 <strong>Photo Gallery</strong> — Full implementation in Phase 2/3.
        The authentication, role routing, and navigation are fully operational.
      </div>

      <div className="grid-3" style={{marginBottom:24}}>
        {[
          {label:'Total Records', value:'—',  icon:'📋', color:'blue'},
          {label:'Active',        value:'—',  icon:'✅', color:'green'},
          {label:'Pending Action',value:'—',  icon:'⏳', color:'amber'},
        ].map(s => (
          <div key={s.label} className={'stat-card ' + s.color}>
            <div className={'stat-icon-wrap ' + s.color}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Photo Gallery — Coming Soon</div>
        </div>
        <div style={{padding:40, textAlign:'center', color:'var(--text-muted)'}}>
          <div style={{fontSize:'3rem', marginBottom:12}}>🖼️</div>
          <div style={{fontWeight:700, fontSize:'1rem', color:'var(--text-dark)', marginBottom:6}}>
            Module Under Development
          </div>
          <p style={{fontSize:'0.85rem', maxWidth:400, margin:'0 auto', lineHeight:1.7}}>
            School albums, categorized uploads, consent flags and restricted viewing.
          </p>
          <div style={{marginTop:20, display:'flex', gap:10, justifyContent:'center'}}>
            <Link href="/dashboard/admin" className="btn btn-secondary btn-sm">← Back to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


