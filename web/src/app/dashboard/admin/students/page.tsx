'use client'
import { useState } from 'react'

const STUDENTS = [
  { id:'S001', name:'Ahmed Ali',     photo:'AA', class:'Grade 1', section:'A', status:'Active',    dob:'2018-03-14', guardian:'Mr. Ali Ahmed',      fee:'Paid',    attendance:'96%' },
  { id:'S002', name:'Sara Khan',     photo:'SK', class:'Grade 2', section:'B', status:'Active',    dob:'2017-07-22', guardian:'Mr. Zaid Khan',       fee:'Partial', attendance:'91%' },
  { id:'S003', name:'Omar Hassan',   photo:'OH', class:'Grade 3', section:'A', status:'Active',    dob:'2016-11-05', guardian:'Mrs. Hana Hassan',    fee:'Pending', attendance:'88%' },
  { id:'S004', name:'Aisha Rahman',  photo:'AR', class:'Grade 4', section:'C', status:'Active',    dob:'2015-01-30', guardian:'Mr. Karim Rahman',    fee:'Paid',    attendance:'98%' },
  { id:'S005', name:'Bilal Ahmed',   photo:'BA', class:'Grade 5', section:'A', status:'Active',    dob:'2014-09-12', guardian:'Mrs. Sana Ahmed',     fee:'Paid',    attendance:'94%' },
  { id:'S006', name:'Noor Al-Farsi', photo:'NF', class:'Grade 6', section:'B', status:'Suspended', dob:'2013-04-18', guardian:'Mr. Ahmed Al-Farsi',  fee:'Partial', attendance:'72%' },
  { id:'S007', name:'Layla Al-Balushi',photo:'LB',class:'Grade 7',section:'A', status:'Active',   dob:'2012-08-25', guardian:'Dr. Hassan Al-Balushi',fee:'Paid',   attendance:'97%' },
  { id:'S008', name:'Yousef Al-Siyabi',photo:'YS',class:'Grade 8',section:'C', status:'Active',   dob:'2011-12-03', guardian:'Mrs. Sara Al-Siyabi', fee:'Paid',    attendance:'93%' },
]

const STATUS_COLOR: Record<string, string> = { Active:'badge-green', Suspended:'badge-red', Transferred:'badge-amber', Withdrawn:'badge-gray' }
const FEE_COLOR:    Record<string, string> = { Paid:'badge-green', Partial:'badge-amber', Pending:'badge-red' }
const AVATAR_COLORS = ['avatar-red','avatar-blue','avatar-green','avatar-amber','avatar-purple']

export default function StudentsPage() {
  const [search, setSearch]   = useState('')
  const [classF, setClassF]   = useState('All Classes')
  const [statusF, setStatusF] = useState('All Status')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = STUDENTS.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (classF === 'All Classes' || s.class === classF) &&
    (statusF === 'All Status' || s.status === statusF)
  )

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>🏠</span><span>Home</span><span>›</span><span>Students</span></div>
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">{STUDENTS.length} total students enrolled</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn-secondary btn-sm">📤 Export</button>
          <button className="btn btn-secondary btn-sm">📥 Import CSV</button>
          <a href="/dashboard/admin/admissions" className="btn btn-primary btn-sm">+ Add Student</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-6">
        {[
          { label:'Total Students', value:'1,250', icon:'🎓', color:'blue' },
          { label:'Active',         value:'1,218', icon:'✅', color:'green' },
          { label:'Suspended',      value:'12',    icon:'⏸️', color:'amber' },
          { label:'New This Month', value:'24',    icon:'🆕', color:'purple' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon-wrap ${s.color}`}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        {/* Filter bar */}
        <div className="filter-bar">
          <select className="form-select" value={classF} onChange={e=>setClassF(e.target.value)}>
            {['All Classes','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="form-select" value={statusF} onChange={e=>setStatusF(e.target.value)}>
            {['All Status','Active','Suspended','Transferred','Withdrawn'].map(s => <option key={s}>{s}</option>)}
          </select>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:'1.5px solid var(--border)', borderRadius:'var(--radius-md)', padding:'6px 10px' }}>
              <span style={{ color:'var(--text-light)' }}>🔍</span>
              <input type="text" placeholder="Search students..."
                value={search} onChange={e=>setSearch(e.target.value)}
                style={{ border:'none', outline:'none', fontSize:'0.82rem', flex:1, background:'transparent' }}/>
            </div>
          </div>
          {selected.length > 0 && (
            <div style={{ display:'flex', gap:6 }}>
              <button className="btn btn-secondary btn-sm">Export Selected ({selected.length})</button>
              <button className="btn btn-sm" style={{ background:'var(--red-50)', color:'var(--red-600)', border:'1px solid var(--red-100)' }}>Remove</button>
            </div>
          )}
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width:40 }}>
                  <input type="checkbox" style={{ accentColor:'#cc1a1a' }}
                    onChange={e => setSelected(e.target.checked ? filtered.map(s=>s.id) : [])}
                    checked={selected.length === filtered.length && filtered.length > 0} />
                </th>
                <th>ID</th><th>Photo</th><th>Name</th><th>Class</th>
                <th>Guardian</th><th>Fee Status</th><th>Attendance</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} style={{ cursor:'pointer' }}>
                  <td>
                    <input type="checkbox" style={{ accentColor:'#cc1a1a' }}
                      checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} />
                  </td>
                  <td style={{ fontFamily:'monospace', fontSize:'0.78rem', color:'var(--text-muted)' }}>{s.id}</td>
                  <td>
                    <div className={`avatar avatar-sm ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{s.photo}</div>
                  </td>
                  <td style={{ fontWeight:600, color:'var(--text-dark)', minWidth:140 }}>{s.name}</td>
                  <td>{s.class} — {s.section}</td>
                  <td style={{ fontSize:'0.82rem' }}>{s.guardian}</td>
                  <td><span className={`badge ${FEE_COLOR[s.fee]}`}>{s.fee}</span></td>
                  <td>
                    <span style={{ fontSize:'0.85rem', fontWeight:700,
                      color: parseInt(s.attendance)>=95?'var(--green-600)':parseInt(s.attendance)>=85?'var(--amber-600)':'var(--red-600)' }}>
                      {s.attendance}
                    </span>
                  </td>
                  <td><span className={`badge ${STATUS_COLOR[s.status]}`}>{s.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon btn-sm" title="View Profile">👁️</button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="Edit">✏️</button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="More">•••</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding:'12px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border-light)' }}>
          <div style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>Showing {filtered.length} of {STUDENTS.length} students</div>
          <div style={{ display:'flex', gap:4 }}>
            {['←','1','2','3','...','52','→'].map((p,i) => (
              <button key={i} style={{
                padding:'5px 10px', borderRadius:'var(--radius-sm)',
                border:'1px solid var(--border)', background:p==='1'?'var(--red-600)':'var(--bg-white)',
                color:p==='1'?'#fff':'var(--text-muted)', fontSize:'0.78rem', cursor:'pointer',
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
