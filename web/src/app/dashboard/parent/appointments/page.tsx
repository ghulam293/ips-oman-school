'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ParentAppointmentsPage() {
  const router = useRouter()

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <span>🏠</span><span>Home</span>
            <span style={{color:'var(--border)'}}>›</span>
            <span>Parent Appointments</span>
          </div>
          <h1 className="page-title">📅 Parent Appointment Management</h1>
        </div>
        <div style={{display:'flex',gap:10}}>
          <Link href="/appointments" className="btn btn-primary btn-sm">
            Launch Full Appointment App →
          </Link>
        </div>
      </div>

      {/* Featured Banner linking directly to the new App */}
      <div style={{
        background: 'linear-gradient(135deg, #0b2545, #134074)',
        border: '2px solid #c59b27',
        borderRadius: 16,
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 8px 24px rgba(11,37,69,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: '#c59b27', color: '#0b2545',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', fontWeight: 900
            }}>
              📅
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                IPS Oman Official Appointment Management App
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '4px 0 0' }}>
                Book conferences for Tariq (Gr 9) & Maya (Gr 5), choose In-Person or Google Meet, view staff availability.
              </p>
            </div>
          </div>

          <Link href="/appointments" className="btn" style={{
            background: '#c59b27', color: '#0b2545', fontWeight: 800,
            padding: '10px 20px', borderRadius: 10, fontSize: '0.85rem', textDecoration: 'none'
          }}>
            Open Booking App →
          </Link>
        </div>
      </div>

      <div className="grid-3" style={{marginBottom:24}}>
        {[
          {label:'Child 1 (Tariq - Gr 9)',   value:'2 Confirmed', icon:'👨‍🎓', color:'blue'},
          {label:'Child 2 (Maya - Gr 5)',    value:'1 Completed', icon:'👧', color:'green'},
          {label:'Pending Requests',          value:'1 Under Review', icon:'⏳', color:'amber'},
        ].map(s => (
          <div key={s.label} className={'stat-card ' + s.color}>
            <div className={'stat-icon-wrap ' + s.color}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 28, textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>
          Need to schedule a meeting with a teacher or principal?
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 20px' }}>
          The school appointment system allows you to select any teacher, choose available dates (Sun–Thu), and get instant visitor passes for campus entry.
        </p>
        <Link href="/appointments" className="btn btn-primary" style={{ display: 'inline-flex', padding: '10px 24px' }}>
          Go to Appointments Portal
        </Link>
      </div>
    </div>
  )
}
