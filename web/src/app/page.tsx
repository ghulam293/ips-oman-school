'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/appointments')
  }, [router])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b2545',
      color: '#ffffff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>📅</div>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 6 }}>IPS Oman Appointment System</div>
        <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Opening direct appointment booking...</div>
      </div>
    </div>
  )
}
