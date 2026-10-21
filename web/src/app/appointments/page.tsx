'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export type RoleType = 'parent' | 'teacher' | 'hr' | 'finance' | 'admin' | 'principal' | 'receptionist';

interface StaffMember {
  id: string;
  name: string;
  nameAr: string;
  department: 'HR' | 'Finance' | 'Admin' | 'Teacher' | 'Principal';
  title: string;
  avatar: string;
  room: string;
  days: string[];
  slots: string[];
  instantAvailable?: boolean;
}

interface AppointmentRequest {
  id: string;
  requesterName: string;
  requesterPhone: string;
  targetDepartment: string;
  targetStaffName: string;
  reason: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'in_queue' | 'approved' | 'declined';
  declineReason?: string;
  meetingType: 'in_person' | 'online';
  createdAt: string;
}

const STAFF_LIST: StaffMember[] = [
  {
    id: 'hr_samira',
    name: 'Samira Al-Habsi',
    nameAr: 'سميرة الحبسية',
    department: 'HR',
    title: 'HR Director & Faculty Relations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    room: 'HR Suite, Admin Block Floor 1',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    slots: ['08:30 AM', '09:30 AM', '11:00 AM', '01:00 PM'],
    instantAvailable: true
  },
  {
    id: 'fin_tariq',
    name: 'Tariq Al-Riyami',
    nameAr: 'طارق الريامي',
    department: 'Finance',
    title: 'Head of Accounts & Tuition Fees',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    room: 'Finance & Cashier Office, Desk 2',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    slots: ['08:00 AM', '10:00 AM', '11:30 AM', '12:30 PM'],
    instantAvailable: true
  },
  {
    id: 'adm_tariq',
    name: 'Tariq Al-Harthy',
    nameAr: 'طارق الحارثي',
    department: 'Admin',
    title: 'School Operations & IT Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    room: 'Main Administration Office 101',
    days: ['Sunday', 'Tuesday', 'Thursday'],
    slots: ['09:00 AM', '10:30 AM', '01:30 PM'],
    instantAvailable: false
  },
  {
    id: 'prn_salim',
    name: 'Dr. Salim Al-Maskari',
    nameAr: 'د. سالم المسكري',
    department: 'Principal',
    title: 'Executive Head & Principal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    room: 'Principal Executive Office',
    days: ['Sunday', 'Tuesday', 'Thursday'],
    slots: ['10:00 AM', '11:30 AM'],
    instantAvailable: false
  },
  {
    id: 'tch_edwards',
    name: 'Mr. John Edwards',
    nameAr: 'أ. جون إدواردز',
    department: 'Teacher',
    title: 'Science & Physics Faculty Head',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    room: 'Science Lab 3, Secondary Wing',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    slots: ['08:30 AM', '12:00 PM', '01:30 PM'],
    instantAvailable: true
  }
];

export default function AppointmentsQuickApp() {
  const [activePersona, setActivePersona] = useState<RoleType>('parent');
  const [selectedDept, setSelectedDept] = useState<'HR' | 'Finance' | 'Admin' | 'Principal' | 'Teacher'>('HR');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('hr_samira');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-25');
  const [selectedSlot, setSelectedSlot] = useState<string>('09:30 AM');
  const [meetingReason, setMeetingReason] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'in_person' | 'online'>('in_person');
  const [parentName, setParentName] = useState<string>('Aisha Al-Busaidi');
  const [parentPhone, setParentPhone] = useState<string>('+968 9345 6789');

  const [appointments, setAppointments] = useState<AppointmentRequest[]>([
    {
      id: 'REQ-101',
      requesterName: 'Aisha Al-Busaidi',
      requesterPhone: '+968 9345 6789',
      targetDepartment: 'Finance',
      targetStaffName: 'Tariq Al-Riyami',
      reason: 'Discuss tuition fee installment plan and sibling discount for Term 2',
      date: '2026-10-25',
      timeSlot: '10:00 AM',
      status: 'pending',
      meetingType: 'in_person',
      createdAt: 'Just now'
    },
    {
      id: 'REQ-102',
      requesterName: 'Hamad Al-Kharusi',
      requesterPhone: '+968 9111 2233',
      targetDepartment: 'HR',
      targetStaffName: 'Samira Al-Habsi',
      reason: 'Staff recruitment inquiry & contract verification',
      date: '2026-10-26',
      timeSlot: '11:00 AM',
      status: 'in_queue',
      meetingType: 'online',
      createdAt: '10 mins ago'
    },
    {
      id: 'REQ-103',
      requesterName: 'Said Al-Habsi',
      requesterPhone: '+968 9888 7766',
      targetDepartment: 'Finance',
      targetStaffName: 'Tariq Al-Riyami',
      reason: 'School transport fee receipt & invoice dispute',
      date: '2026-10-25',
      timeSlot: '11:30 AM',
      status: 'approved',
      meetingType: 'in_person',
      createdAt: '1 hour ago'
    }
  ]);

  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Filter staff by selected department
  const filteredStaff = STAFF_LIST.filter(s => s.department === selectedDept);
  const currentStaff = STAFF_LIST.find(s => s.id === selectedStaffId) || filteredStaff[0] || STAFF_LIST[0];

  // When department changes, set first staff
  const handleDeptChange = (dept: 'HR' | 'Finance' | 'Admin' | 'Principal' | 'Teacher') => {
    setSelectedDept(dept);
    const first = STAFF_LIST.find(s => s.department === dept);
    if (first) {
      setSelectedStaffId(first.id);
      if (first.slots.length > 0) setSelectedSlot(first.slots[0]);
    }
  };

  // Submit appointment request
  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingReason.trim()) {
      alert('Please specify the reason for meeting.');
      return;
    }

    const newReq: AppointmentRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      requesterName: parentName,
      requesterPhone: parentPhone,
      targetDepartment: selectedDept,
      targetStaffName: currentStaff.name,
      reason: meetingReason,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'pending',
      meetingType: meetingType,
      createdAt: 'Just now'
    };

    setAppointments([newReq, ...appointments]);
    setMeetingReason('');
    
    // Notification for Finance/HR officer
    setActiveNotification(`🔔 New notification sent to ${selectedDept} Department: ${newReq.requesterName} requested appointment on ${selectedDate} at ${selectedSlot}.`);
  };

  // Decision actions (Approve, Put In Queue, Decline)
  const handleDecision = (id: string, newStatus: 'approved' | 'in_queue' | 'declined') => {
    setAppointments(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));

    const statusText = newStatus === 'approved' ? 'APPROVED' : newStatus === 'in_queue' ? 'PLACED IN QUEUE' : 'DECLINED / CANCELLED';
    setActiveNotification(`⚡ Status updated to [${statusText}] for reference #${id}. Notification sent to parent.`);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <header className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              IPS
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">IPS Oman — Direct Meeting Booking & Decision Desk</h1>
              <p className="text-xs text-slate-400">Book with HR, Finance, Admin or Principal • Instant Department Decisions</p>
            </div>
          </div>

          {/* Quick Persona Switcher */}
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400 font-semibold px-2">Role View:</span>
            {(['parent', 'finance', 'hr', 'admin'] as RoleType[]).map(r => (
              <button
                key={r}
                onClick={() => setActivePersona(r)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all uppercase text-[11px] ${
                  activePersona === r 
                    ? 'bg-amber-400 text-slate-950 shadow' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {r === 'parent' ? '👨‍👩‍👧 Parent' : r === 'finance' ? '💰 Finance Officer' : r === 'hr' ? '👔 HR Officer' : '⚙️ Admin'}
              </button>
            ))}
          </div>
        </header>

        {/* ── LIVE NOTIFICATION BANNER ── */}
        {activeNotification && (
          <div className="bg-amber-500 text-slate-950 px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between shadow animate-in fade-in">
            <span>{activeNotification}</span>
            <button onClick={() => setActiveNotification(null)} className="text-sm px-2 font-black">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ════ LEFT: SIMPLE & SHORT BOOKING FORM (Parent / Requester Side) ════ */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Short & Fast Form
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 mt-1">Book Meeting with School Staff</h2>
              <p className="text-xs text-slate-500">Select department, person, time, and state your reason.</p>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">

              {/* 1. Select Department */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">1. Who do you want to meet?</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['HR', 'Finance', 'Admin', 'Principal', 'Teacher'] as const).map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => handleDeptChange(d)}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        selectedDept === d
                          ? 'border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-400/30'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {d === 'HR' ? '👔 HR' : d === 'Finance' ? '💰 Finance' : d === 'Admin' ? '⚙️ Admin' : d === 'Principal' ? '👑 Principal' : '📚 Teacher'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Select Staff Member */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">2. Select Staff Member</label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={currentStaff.avatar} alt={currentStaff.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-400" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{currentStaff.name}</div>
                      <div className="text-[10px] text-slate-500">{currentStaff.title}</div>
                      <div className="text-[10px] text-indigo-700 font-semibold">📍 {currentStaff.room}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    ● Available
                  </span>
                </div>
              </div>

              {/* 3. Date & Available Times */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Meeting Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Times</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold"
                  >
                    {currentStaff.slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Format */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Meeting Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType('in_person')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      meetingType === 'in_person' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    🏫 In-Person (Campus)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType('online')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      meetingType === 'online' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    💻 Online (Google Meet)
                  </button>
                </div>
              </div>

              {/* 5. Define Reason */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Define Reason for Meeting</label>
                <textarea
                  required
                  rows={3}
                  value={meetingReason}
                  onChange={(e) => setMeetingReason(e.target.value)}
                  placeholder="e.g., Want to discuss fees installment plan, check tuition statement, or interview consultation..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>
              </div>

              {/* Your Details */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold"
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow transition-all hover:scale-[1.01]"
              >
                Send Request to {selectedDept} →
              </button>
            </form>
          </div>

          {/* ════ RIGHT: DEPARTMENT QUEUE & DECISION DESK (Finance / HR / Admin Side) ════ */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Department Officer View
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                  Incoming Meeting Requests & Fast Decisions
                </h2>
                <p className="text-xs text-slate-500">
                  Officer reviews notification, then marks as <b>Approved</b>, puts <b>In-Queue</b>, or <b>Cancels/Declines</b>.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-700">Total: {appointments.length}</span>
              </div>
            </div>

            {/* List of Appointment Requests */}
            <div className="space-y-3">
              {appointments.map(item => {
                const statusBadge = 
                  item.status === 'approved' ? { bg: 'bg-emerald-100 text-emerald-800', label: '✓ APPROVED' } :
                  item.status === 'in_queue' ? { bg: 'bg-cyan-100 text-cyan-800', label: '⏳ IN QUEUE' } :
                  item.status === 'declined' ? { bg: 'bg-red-100 text-red-800', label: '✕ CANCELLED' } :
                  { bg: 'bg-amber-100 text-amber-800 animate-pulse', label: '⚡ PENDING DECISION' };

                return (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-3 text-xs">
                    
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {item.id}
                          </span>
                          <span className="font-bold text-slate-800">{item.targetDepartment} Dept ({item.targetStaffName})</span>
                          <span className="text-slate-400">• {item.meetingType === 'in_person' ? '🏫 Campus' : '💻 Online'}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mt-1 text-sm">{item.requesterName}</h3>
                        <div className="text-[11px] text-slate-500">📞 {item.requesterPhone} • Requested {item.createdAt}</div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full font-black text-[10px] ${statusBadge.bg}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    {/* Defined Reason */}
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700">
                      <span className="font-bold text-slate-900 block text-[11px] mb-0.5">Defined Reason for Meeting:</span>
                      <p className="italic leading-relaxed">"{item.reason}"</p>
                    </div>

                    <div className="flex items-center justify-between text-slate-600 text-[11px]">
                      <div>
                        📅 <b>{item.date}</b> at <b>{item.timeSlot}</b>
                      </div>

                      {/* FAST DECISION BUTTONS */}
                      <div className="flex items-center gap-1.5">
                        {item.status !== 'approved' && (
                          <button
                            onClick={() => handleDecision(item.id, 'approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
                          >
                            ✓ Approve
                          </button>
                        )}

                        {item.status !== 'in_queue' && (
                          <button
                            onClick={() => handleDecision(item.id, 'in_queue')}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-sm"
                          >
                            ⏳ Put in Queue
                          </button>
                        )}

                        {item.status !== 'declined' && (
                          <button
                            onClick={() => handleDecision(item.id, 'declined')}
                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg"
                          >
                            ✕ Cancel
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
