'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #07182c 0%, #0b2545 50%, #134074 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: 680, 
        width: '100%', 
        background: 'rgba(255, 255, 255, 0.98)', 
        borderRadius: 24, 
        padding: '40px 32px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        
        {/* Emblem */}
        <div style={{
          width: 72, height: 72, borderRadius: 20, 
          background: 'linear-gradient(135deg, #c59b27, #f3e8c8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', fontWeight: 900, color: '#0b2545',
          margin: '0 auto 16px',
          boxShadow: '0 8px 24px rgba(197, 155, 39, 0.3)'
        }}>
          IPS
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
          International Pioneers School (IPS Oman)
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 32px' }}>
          Sultanate of Oman — School Operations & Appointment Platform
        </p>

        {/* 2 Big Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          
          {/* Card 1: School Appointment App */}
          <Link href="/appointments" style={{ textDecoration: 'none', textAlign: 'left' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0b2545, #1e3a8a)',
              color: '#ffffff',
              padding: 24,
              borderRadius: 20,
              border: '2px solid #c59b27',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(11,37,69,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '2rem' }}>📅</span>
                  <span style={{ 
                    background: '#c59b27', color: '#0b2545', fontSize: '0.65rem', 
                    fontWeight: 900, padding: '3px 8px', borderRadius: 999, textTransform: 'uppercase' 
                  }}>
                    Featured App
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
                  School Appointment App
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                  10 User Roles, booking wizard, staff availability calendars, receptionist visitor check-in, and full English/Arabic RTL.
                </p>
              </div>
              <div style={{ 
                marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6,
                fontWeight: 800, fontSize: '0.82rem', color: '#fde047'
              }}>
                Launch Appointment App →
              </div>
            </div>
          </Link>

          {/* Card 2: Main School Operations Portal */}
          <Link href="/login" style={{ textDecoration: 'none', textAlign: 'left' }}>
            <div style={{
              background: '#ffffff',
              color: '#0f172a',
              padding: 24,
              borderRadius: 20,
              border: '1.5px solid #e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '2rem' }}>🏫</span>
                  <span style={{ 
                    background: '#fee2e2', color: '#b91c1c', fontSize: '0.65rem', 
                    fontWeight: 800, padding: '3px 8px', borderRadius: 999, textTransform: 'uppercase' 
                  }}>
                    Operations
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px', color: '#0f172a' }}>
                  School Operations Portal
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Admin, Teacher, Parent, and Student portals for fees, timetable, library, exams, LMS, and operations.
                </p>
              </div>
              <div style={{ 
                marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6,
                fontWeight: 800, fontSize: '0.82rem', color: '#cc1a1a'
              }}>
                Enter School Portal →
              </div>
            </div>
          </Link>

        </div>

        {/* Footer info */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #f1f5f9', fontSize: '0.75rem', color: '#94a3b8' }}>
          IPS Oman Platform • Muscat, Sultanate of Oman • Academic Year 2026–2027
        </div>

      </div>
    </div>
  )
}
