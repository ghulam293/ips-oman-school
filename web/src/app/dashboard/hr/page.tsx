'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User { name: string; role: string; avatar: string }

const HR_STATS = [
  { label: 'Total Employees', value: '68', change: '+3 this term', icon: '👥', color: 'blue' },
  { label: 'Teaching Faculty', value: '48', change: '8 Departments', icon: '📚', color: 'purple' },
  { label: 'Staff on Leave Today', value: '3', change: '2 Sick, 1 Personal', icon: '🗓️', color: 'amber' },
  { label: 'Pending Approvals', value: '5', change: 'Action required', icon: '⏳', color: 'red' },
]

const PENDING_LEAVES = [
  { id: 1, staff: 'Sara Al-Balushi', role: 'English Teacher', dept: 'Secondary', type: 'Annual Leave', dates: 'Oct 25 – Oct 29', days: '5 Days', status: 'Pending' },
  { id: 2, staff: 'Ahmed Al-Rawahi', role: 'Lab Assistant', dept: 'Science', type: 'Emergency Leave', dates: 'Oct 23', days: '1 Day', status: 'Pending' },
  { id: 3, staff: 'Mona Al-Kiyumi', role: 'Math Teacher', dept: 'Primary', type: 'Sick Leave', dates: 'Oct 22 – Oct 23', days: '2 Days', status: 'Pending' },
  { id: 4, staff: 'Tariq Al-Fazari', role: 'Bus Supervisor', dept: 'Transport', type: 'Personal Leave', dates: 'Nov 02 – Nov 04', days: '3 Days', status: 'Pending' },
]

const DEPARTMENTS = [
  { name: 'Mathematics & Science', count: 16, lead: 'Dr. Salim Al-Harthy' },
  { name: 'Languages & Humanities', count: 14, lead: 'Ms. Layla Al-Hinai' },
  { name: 'Primary & Kindergarten', count: 18, lead: 'Mrs. Huda Al-Masroori' },
  { name: 'Administration & Finance', count: 9, lead: 'Mr. Khalid Al-Rashidi' },
  { name: 'Operations & Facilities', count: 11, lead: 'Mr. Ali Al-Harthi' },
]

export default function HRDashboard() {
  const [user, setUser] = useState<User>({ name: 'Fatima Al-Hinai', role: 'hr_officer', avatar: 'FH' })
  const [leaves, setLeaves] = useState(PENDING_LEAVES)

  useEffect(() => {
    const s = localStorage.getItem('ips_user')
    if (s) {
      try { setUser(JSON.parse(s)) } catch (e) {}
    }
  }, [])

  const handleAction = (id: number, action: 'Approved' | 'Declined') => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: action } : l))
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 20 }}>
        <div>
          <div className="breadcrumb">
            <span>🏠</span>
            <Link href="/dashboard/admin" style={{ color: 'inherit' }}>Home</Link>
            <span style={{ color: 'var(--border)' }}>›</span>
            <span>HR & Faculty Portal</span>
          </div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>👔</span> HR & Staff Management
          </h1>
          <p className="page-subtitle">Welcome back, <strong>{user.name}</strong> • HR Officer & Faculty Operations</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/dashboard/admin/staff" className="btn btn-secondary btn-sm">👥 View All Staff</Link>
          <Link href="/dashboard/admin/salary" className="btn btn-secondary btn-sm">💵 Payroll Records</Link>
          <button className="btn btn-primary btn-sm" onClick={() => alert('New Staff Onboarding modal')}>+ Onboard Employee</button>
        </div>
      </div>

      {/* Greeting Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1c2536 0%, #2d3748 100%)',
        borderRadius: 'var(--radius-lg)', padding: '24px 28px', color: '#fff',
        marginBottom: 24, boxShadow: 'var(--shadow-md)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Faculty & Personnel Overview
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 6 }}>
            Good day, {user.name.split(' ')[0]} 👋
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', maxWidth: 520, lineHeight: 1.5 }}>
            You have <strong style={{ color: '#fbbf24' }}>{leaves.filter(l => l.status === 'Pending').length} pending leave requests</strong> and <strong>4 staff contract renewals</strong> due this month.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '12px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>98.2%</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>Faculty Attendance</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '12px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80' }}>Active</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>October Payroll</div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {HR_STATS.map(s => (
          <div key={s.label} className={'stat-card ' + s.color}>
            <div className={'stat-icon-wrap ' + s.color}>{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Leaves & Department Roster */}
      <div className="grid-2" style={{ gap: 24, marginBottom: 24 }}>
        {/* Pending Leave Requests */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="card-title">🗓️ Leave Requests Queue</div>
              <div className="card-subtitle">Requires HR authorization</div>
            </div>
            <span className="badge badge-amber">{leaves.filter(l => l.status === 'Pending').length} Pending</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map(l => (
                    <tr key={l.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{l.staff}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.role} • {l.dept}</div>
                      </td>
                      <td>
                        <span className="badge badge-blue">{l.type}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{l.dates}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{l.days}</div>
                      </td>
                      <td>
                        <span className={`badge badge-${l.status === 'Approved' ? 'green' : l.status === 'Declined' ? 'red' : 'amber'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td>
                        {l.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => handleAction(l.id, 'Approved')}
                              className="btn btn-sm"
                              style={{ background: 'var(--green-500)', color: '#fff', padding: '3px 8px', fontSize: '0.72rem' }}
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleAction(l.id, 'Declined')}
                              className="btn btn-sm"
                              style={{ background: 'var(--red-500)', color: '#fff', padding: '3px 8px', fontSize: '0.72rem' }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Departments Overview */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="card-title">🏫 Department Staffing</div>
              <div className="card-subtitle">Active headcount allocations</div>
            </div>
            <Link href="/dashboard/admin/staff" className="btn btn-ghost btn-sm">Manage →</Link>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {DEPARTMENTS.map(d => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{d.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Head: {d.lead}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                      {d.count} Staff
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.4rem' }}>📋</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--blue-600)' }}>Upcoming Contract Renewals</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>4 expatriate faculty visas and contracts need renewal before Dec 2026.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
