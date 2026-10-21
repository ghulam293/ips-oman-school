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
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏫</div>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: 6 }}>International Pioneers School</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Opening School Operations Platform...</div>
      </div>
    </div>
  )
}
