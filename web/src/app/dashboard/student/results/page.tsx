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
            <span>My Results</span>
          </div>
          <h1 className="page-title">📊 My Results</h1>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-primary btn-sm">+ New</button>
        </div>
      </div>

      <div className="alert alert-info" style={{marginBottom:20}}>
        🚧 <strong>My Results</strong> — Full implementation in Phase 2.
        Navigation and authentication are fully working.
      </div>

      <div className="grid-3" style={{marginBottom:24}}>
        {[
          {label:'Total',   value:'—', icon:'📋', color:'blue'},
          {label:'Active',  value:'—', icon:'✅', color:'green'},
          {label:'Pending', value:'—', icon:'⏳', color:'amber'},
        ].map(s => (
          <div key={s.label} className={'stat-card ' + s.color}>
            <div className={'stat-icon-wrap ' + s.color}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{padding:40,textAlign:'center',color:'var(--text-muted)'}}>
          <div style={{fontSize:'3rem',marginBottom:12}}>📊</div>
          <div style={{fontWeight:700,fontSize:'1rem',color:'var(--text-dark)',marginBottom:6}}>My Results — Coming Soon</div>
          <p style={{fontSize:'0.85rem',maxWidth:400,margin:'0 auto',lineHeight:1.7}}>
            This module is part of Phase 2 development.
          </p>
          <div style={{marginTop:20}}>
            <Link href="/dashboard/student" className="btn btn-secondary btn-sm">← Back to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

