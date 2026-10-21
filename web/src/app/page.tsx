'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/login')
  }, [router])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-page, #f8fafc)',
      color: 'var(--text-dark, #0f172a)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src="/ips-crest.png"
          alt="International Pioneers School Crest"
          style={{ width: 90, height: 90, objectFit: 'contain', marginBottom: 14, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' }}
        />
        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: 6 }}>International Pioneers School</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Opening School Operations Platform...</div>
      </div>
    </div>
  )
}
