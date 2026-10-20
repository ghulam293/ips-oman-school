'use client'
import { useState } from 'react'

const FEES_DATA = [
  { name:'Ahmed Ali',    id:'S001', class:'Grade 1', total:1200, paid:1200, pending:0,    status:'Paid',    dueDate:'Oct 1' },
  { name:'Sara Khan',    id:'S002', class:'Grade 2', total:1200, paid:800,  pending:400,  status:'Partial', dueDate:'Oct 1' },
  { name:'Omar Hassan',  id:'S003', class:'Grade 3', total:1500, paid:0,    pending:1500, status:'Pending', dueDate:'Oct 1' },
  { name:'Aisha Rahman', id:'S004', class:'Grade 4', total:1500, paid:1500, pending:0,    status:'Paid',    dueDate:'Oct 1' },
  { name:'Bilal Ahmed',  id:'S005', class:'Grade 5', total:1800, paid:900,  pending:900,  status:'Partial', dueDate:'Oct 1' },
  { name:'Noor Al-Farsi',id:'S006', class:'Grade 6', total:1800, paid:1800, pending:0,    status:'Paid',    dueDate:'Oct 1' },
]

export default function FeesPage() {
  const [tab, setTab] = useState<'collection'|'invoices'|'plans'|'defaulters'>('collection')
  const totalFees     = FEES_DATA.reduce((a,f)=>a+f.total,0)
  const totalPaid     = FEES_DATA.reduce((a,f)=>a+f.paid,0)
  const totalPending  = FEES_DATA.reduce((a,f)=>a+f.pending,0)
  const pct           = Math.round((totalPaid/totalFees)*100)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>🏠</span><span>Home</span><span>›</span><span>Fee Management</span></div>
          <h1 className="page-title">Fee Management</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn-secondary btn-sm">📤 Export</button>
          <button className="btn btn-secondary btn-sm">📧 Send Reminders</button>
          <button className="btn btn-primary btn-sm">+ Create Invoice</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-6">
        {[
          { label:`Total Fees (AY 2026-27)`, value:`${(totalFees/1000).toFixed(0)}K OMR`,  icon:'💰', color:'blue' },
          { label:`Collected (${pct}%)`,      value:`${(totalPaid/1000).toFixed(0)}K OMR`,  icon:'✅', color:'green' },
          { label:`Pending (${100-pct}%)`,    value:`${(totalPending/1000).toFixed(0)}K OMR`,icon:'⏳',color:'red' },
          { label:'Defaulters',               value:'47',                                    icon:'⚠️',color:'amber' },
        ].map(s=>(
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="card mb-6">
        <div className="card-body">
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontWeight:700, fontSize:'0.9rem' }}>Fee Collection Progress — October 2026</span>
            <span style={{ fontWeight:800, color:'var(--green-600)', fontSize:'1rem' }}>{pct}%</span>
          </div>
          <div className="progress" style={{ height:14 }}>
            <div className="progress-bar green" style={{ width:`${pct}%` }}/>
          </div>
          <div style={{ display:'flex', gap:24, marginTop:10 }}>
            <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
              <span style={{ fontWeight:700, color:'var(--green-600)' }}>150,000 OMR</span> Total
            </div>
            <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
              <span style={{ fontWeight:700, color:'var(--green-600)' }}>130,000 OMR</span> Collected
            </div>
            <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
              <span style={{ fontWeight:700, color:'var(--red-600)' }}>20,000 OMR</span> Pending
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {([['collection','💰 Fee Collection'],['invoices','📄 Invoices'],['plans','📋 Fee Plans'],['defaulters','⚠️ Defaulters']] as const).map(([t,l])=>(
          <div key={t} className={`tab-item${tab===t?' active':''}`} onClick={()=>setTab(t)}>{l}</div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          <select className="form-select"><option>Academic Year 2026-2027</option></select>
          <select className="form-select"><option>All Classes</option><option>Grade 1</option><option>Grade 2</option></select>
          <select className="form-select"><option>All Status</option><option>Paid</option><option>Partial</option><option>Pending</option></select>
          <div style={{ marginLeft:'auto' }}>
            <input className="form-input" placeholder="Search student..." style={{ width:200 }}/>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Student Name</th><th>ID</th><th>Class</th><th>Total Fee</th><th>Paid</th><th>Pending</th><th>Due Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {FEES_DATA.map((f,i)=>(
                <tr key={i}>
                  <td style={{ fontWeight:600, color:'var(--text-dark)' }}>{f.name}</td>
                  <td style={{ fontFamily:'monospace', fontSize:'0.78rem', color:'var(--text-muted)' }}>{f.id}</td>
                  <td>{f.class}</td>
                  <td style={{ fontWeight:600 }}>{f.total.toLocaleString()} OMR</td>
                  <td style={{ fontWeight:600, color:'var(--green-600)' }}>{f.paid.toLocaleString()} OMR</td>
                  <td style={{ fontWeight:600, color:f.pending>0?'var(--red-600)':'var(--text-muted)' }}>{f.pending.toLocaleString()} OMR</td>
                  <td style={{ fontSize:'0.82rem' }}>{f.dueDate}</td>
                  <td>
                    <span className={`badge ${f.status==='Paid'?'badge-green':f.status==='Partial'?'badge-amber':'badge-red'}`}>{f.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-sm">📄 Invoice</button>
                      <button className="btn btn-ghost btn-icon btn-sm">📧</button>
                      <button className="btn btn-ghost btn-icon btn-sm">💳</button>
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
