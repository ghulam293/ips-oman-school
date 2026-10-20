'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/login')
  }, [router])
  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#d4a843', fontSize: '0.9rem' }}>Redirecting to portal...</div>
    </div>
  )
}
