'use client'
const placeholder = (title: string, desc: string) => () => (
  <div>
    <h1 className="text-h2" style={{marginBottom:'8px'}}>{title}</h1>
    <p style={{color:'#64748b',marginBottom:'24px'}}>{desc}</p>
    <div className="alert alert-info">🚧 This dashboard is under construction — Phase 2/3. Authentication and role routing are fully working.</div>
  </div>
)
export default placeholder('Transport Dashboard', 'Route management, bus tracking, and student manifests')
