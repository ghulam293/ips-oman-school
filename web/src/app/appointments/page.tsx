'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserRole, 
  Appointment, 
  MeetingCategory, 
  MeetingFormat, 
  AppointmentStatus,
  USER_PROFILES, 
  STAFF_DIRECTORY,
  INITIAL_APPOINTMENTS, 
  INITIAL_STAFF_AVAILABILITY, 
  INITIAL_NOTIFICATIONS 
} from './data';
import { translations, Language } from './translations';

export default function AppointmentsApp() {
  const [lang, setLang] = useState<Language>('en');
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Modals & Drawers
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showVisitorBadgeModal, setShowVisitorBadgeModal] = useState(false);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Modal form states
  const [outcomeText, setOutcomeText] = useState('');
  const [proposedNewDate, setProposedNewDate] = useState('');
  const [proposedNewTime, setProposedNewTime] = useState('10:00 AM');
  const [declineReasonText, setDeclineReasonText] = useState('');

  // Booking Wizard State
  const [bookingCategory, setBookingCategory] = useState<MeetingCategory>('parent_teacher');
  const [bookingStaffId, setBookingStaffId] = useState('stf_edwards');
  const [bookingFormat, setBookingFormat] = useState<MeetingFormat>('in_person');
  const [bookingChildId, setBookingChildId] = useState('std_tariq');
  const [bookingDate, setBookingDate] = useState('2026-10-25');
  const [bookingSlot, setBookingSlot] = useState('09:00 AM - 09:30 AM');
  const [bookingSubject, setBookingSubject] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  // Load from localStorage on client side
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ips_appointments_data');
      if (saved) {
        setAppointments(JSON.parse(saved));
      }
      const savedLang = localStorage.getItem('ips_app_lang') as Language;
      if (savedLang) setLang(savedLang);
    } catch {
      // fallback to initial
    }
  }, []);

  // Save to localStorage
  const persistAppointments = (newAppts: Appointment[]) => {
    setAppointments(newAppts);
    try {
      localStorage.setItem('ips_appointments_data', JSON.stringify(newAppts));
    } catch {
      // ignore
    }
  };

  const t = translations[lang];
  const isRtl = lang === 'ar';
  const profile = USER_PROFILES[currentRole];

  // Filter appointments for the current role
  const visibleAppointments = appointments.filter(app => {
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = app.id.toLowerCase().includes(q) ||
        app.title.toLowerCase().includes(q) ||
        (app.titleAr && app.titleAr.includes(q)) ||
        app.requesterName.toLowerCase().includes(q) ||
        app.targetStaffName.toLowerCase().includes(q) ||
        (app.studentName && app.studentName.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Category & Status filters
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && app.category !== categoryFilter) return false;

    // Role-based visibility
    if (currentRole === 'admin') return true; // Administrator sees everything
    if (currentRole === 'receptionist') return true; // Receptionist checks in all visitors
    if (currentRole === 'principal') {
      return app.targetStaffRole === 'principal' || app.category === 'principal_meeting' || app.status === 'requested';
    }
    if (currentRole === 'parent') {
      return app.requesterRole === 'parent';
    }
    if (currentRole === 'student') {
      return app.requesterRole === 'student' || app.studentId === 'std_tariq';
    }
    if (currentRole === 'teacher') {
      return app.targetStaffRole === 'teacher' || app.category === 'parent_teacher';
    }
    if (currentRole === 'counselor') {
      return app.targetStaffRole === 'counselor' || app.category === 'counseling_session';
    }
    if (currentRole === 'admission') {
      return app.targetStaffRole === 'admission' || app.category === 'admission_interview';
    }
    if (currentRole === 'finance') {
      return app.targetStaffRole === 'finance' || app.category === 'finance_fees';
    }
    if (currentRole === 'hr') {
      return app.targetStaffRole === 'hr' || app.category === 'hr_recruitment';
    }

    return true;
  });

  // Action handlers
  const handleApprove = (appointmentId: string) => {
    const updated = appointments.map(app => {
      if (app.id === appointmentId) {
        return {
          ...app,
          status: 'approved' as AppointmentStatus,
          history: [
            ...app.history,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Approved by ${profile.name} (${t.roles[currentRole]})`,
              actionAr: `تمت الموافقة من قبل ${profile.nameAr} (${t.roles[currentRole]})`,
              by: profile.name
            }
          ]
        };
      }
      return app;
    });
    persistAppointments(updated);
    if (selectedAppointment?.id === appointmentId) {
      setSelectedAppointment(updated.find(a => a.id === appointmentId) || null);
    }
  };

  const handleDeclineSubmit = () => {
    if (!selectedAppointment) return;
    const updated = appointments.map(app => {
      if (app.id === selectedAppointment.id) {
        return {
          ...app,
          status: 'declined' as AppointmentStatus,
          declineReason: declineReasonText || 'Declined due to scheduling constraints',
          history: [
            ...app.history,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Declined by ${profile.name}`,
              actionAr: `اعتذر عن الموعد بواسطة ${profile.nameAr}`,
              by: profile.name,
              notes: declineReasonText
            }
          ]
        };
      }
      return app;
    });
    persistAppointments(updated);
    setShowDeclineModal(false);
    setSelectedAppointment(null);
    setDeclineReasonText('');
  };

  const handleProposeSubmit = () => {
    if (!selectedAppointment) return;
    const proposedStr = `${proposedNewDate} at ${proposedNewTime}`;
    const updated = appointments.map(app => {
      if (app.id === selectedAppointment.id) {
        return {
          ...app,
          status: 'rescheduled' as AppointmentStatus,
          proposedTime: proposedStr,
          history: [
            ...app.history,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Alternate time proposed: ${proposedStr}`,
              actionAr: `اقتراح موعد بديل: ${proposedStr}`,
              by: profile.name
            }
          ]
        };
      }
      return app;
    });
    persistAppointments(updated);
    setShowProposeModal(false);
    setSelectedAppointment(null);
  };

  const handleCheckInVisitor = (appointmentId: string) => {
    const code = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = appointments.map(app => {
      if (app.id === appointmentId) {
        return {
          ...app,
          status: 'checked_in' as AppointmentStatus,
          visitorPassCode: app.visitorPassCode || code,
          checkedInTime: timeNow,
          history: [
            ...app.history,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Visitor Checked-in at Reception Desk (Badge ${app.visitorPassCode || code})`,
              actionAr: `تم تسجيل وصول الزائر بمكتب الاستقبال (تصريح ${app.visitorPassCode || code})`,
              by: profile.name
            }
          ]
        };
      }
      return app;
    });
    persistAppointments(updated);
    const target = updated.find(a => a.id === appointmentId);
    if (target) {
      setSelectedAppointment(target);
      setShowVisitorBadgeModal(true);
    }
  };

  const handleOutcomeSubmit = () => {
    if (!selectedAppointment) return;
    const updated = appointments.map(app => {
      if (app.id === selectedAppointment.id) {
        return {
          ...app,
          status: 'completed' as AppointmentStatus,
          outcomeNotes: outcomeText,
          history: [
            ...app.history,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Meeting Minutes & Outcome Recorded`,
              actionAr: `تم تدوين مخرجات المقابلة ومحضر الاجتماع`,
              by: profile.name,
              notes: outcomeText
            }
          ]
        };
      }
      return app;
    });
    persistAppointments(updated);
    setShowOutcomeModal(false);
    setSelectedAppointment(null);
    setOutcomeText('');
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = STAFF_DIRECTORY.find(s => s.id === bookingStaffId) || STAFF_DIRECTORY[0];
    const child = profile.children?.find(c => c.id === bookingChildId);
    const newId = `IPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment: Appointment = {
      id: newId,
      title: bookingSubject || `${t.categories[bookingCategory]} with ${lang === 'ar' ? staff.nameAr : staff.name}`,
      titleAr: bookingSubject || `${t.categories[bookingCategory]} مع ${staff.nameAr}`,
      category: bookingCategory,
      format: bookingFormat,
      roomOrLink: bookingFormat === 'in_person' ? `${staff.room}, Campus Wing` : 'https://meet.google.com/ips-mtg-secure',
      date: bookingDate,
      timeSlot: bookingSlot,
      durationMinutes: 30,
      status: 'requested',
      requesterRole: currentRole,
      requesterName: lang === 'ar' ? profile.nameAr : profile.name,
      requesterEmail: profile.email,
      requesterPhone: profile.phone,
      targetStaffRole: staff.role,
      targetStaffName: lang === 'ar' ? staff.nameAr : staff.name,
      targetStaffDepartment: lang === 'ar' ? staff.departmentAr : staff.department,
      studentId: child ? child.id : undefined,
      studentName: child ? (lang === 'ar' ? child.nameAr : child.name) : undefined,
      studentGrade: child ? child.grade : undefined,
      notes: bookingNotes || 'Discussion on student academic achievement and progress.',
      visitorPassCode: bookingFormat === 'in_person' ? `PASS-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      history: [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          action: `Requested by ${profile.name}`,
          actionAr: `تم تقديم الطلب من قبل ${profile.nameAr}`,
          by: profile.name
        }
      ]
    };

    const updated = [newAppointment, ...appointments];
    persistAppointments(updated);
    setBookingSuccess(newAppointment);
  };

  // Stats calculation
  const stats = {
    total: visibleAppointments.length,
    pending: visibleAppointments.filter(a => a.status === 'requested').length,
    upcoming: visibleAppointments.filter(a => a.status === 'approved' || a.status === 'rescheduled').length,
    checkedIn: appointments.filter(a => a.status === 'checked_in').length,
    completed: visibleAppointments.filter(a => a.status === 'completed').length
  };

  const statusColorMap: Record<AppointmentStatus, { bg: string; text: string; dot: string }> = {
    requested:   { bg: '#fef3c7', text: '#92400e', dot: '#d97706' },
    approved:    { bg: '#dcfce7', text: '#166534', dot: '#16a34a' },
    rescheduled: { bg: '#e0e7ff', text: '#3730a3', dot: '#6366f1' },
    declined:    { bg: '#fee2e2', text: '#991b1b', dot: '#dc2626' },
    checked_in:  { bg: '#cffafe', text: '#155e75', dot: '#0891b2' },
    completed:   { bg: '#f1f5f9', text: '#334155', dot: '#64748b' },
    cancelled:   { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
    no_show:     { bg: '#fae8ff', text: '#86198f', dot: '#c026d3' },
  };

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-50 text-slate-800 ${isRtl ? 'font-arabic' : 'font-sans'}`}
      style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b' }}
    >
      {/* ── TOP ANNOUNCEMENT & RETURN BAR ── */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: School Emblem & App Title */}
            <div className="flex items-center gap-3">
              <Link href="/select-portal" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  IPS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight text-white">{t.appName}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      Appointments
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 hidden sm:block">{t.appSubtitle}</p>
                </div>
              </Link>
            </div>

            {/* Middle: Active Role Selector & Pill Switcher */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-medium px-2">{t.switchPersona}:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                className="bg-slate-900 text-amber-300 text-xs font-semibold rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {(Object.keys(USER_PROFILES) as UserRole[]).map(r => (
                  <option key={r} value={r} className="bg-slate-900 text-white">
                    {t.roles[r]} ({USER_PROFILES[r].name})
                  </option>
                ))}
              </select>
            </div>

            {/* Right: Language switch, Notifications, and Main Portal Link */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => {
                  const newLang = lang === 'en' ? 'ar' : 'en';
                  setLang(newLang);
                  localStorage.setItem('ips_app_lang', newLang);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                title="Switch Language"
              >
                <span className="text-amber-400">🌐</span>
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm transition-colors"
              >
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>

              {/* Back to main portal button */}
              <Link
                href="/select-portal"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-700 hover:bg-red-800 text-white shadow-sm transition-colors"
              >
                <span>←</span>
                <span>{t.backToMainPortal}</span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ── NOTIFICATIONS POPUP DRAWER ── */}
      {showNotifications && (
        <div className={`fixed top-16 ${isRtl ? 'left-6' : 'right-6'} w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 animate-in fade-in slide-in-from-top-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>🔔</span>
              <span>{lang === 'ar' ? 'مركز التنبيهات الفورية' : 'Live Appointment Notifications'}</span>
            </h4>
            <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
              ✕
            </button>
          </div>
          <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto">
            {INITIAL_NOTIFICATIONS.map(notif => (
              <div key={notif.id} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{lang === 'ar' ? notif.titleAr : notif.title}</span>
                  <span className="text-[10px] text-slate-400">{notif.timeAgo}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar' ? notif.messageAr : notif.message}
                </p>
                {notif.appointmentId && (
                  <span className="inline-block mt-1.5 text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {notif.appointmentId}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CURRENT ROLE HERO BANNER ── */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white pt-6 pb-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* User Identity Details */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400/30 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-amber-400 text-slate-950">
                  {currentRole}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {lang === 'ar' ? profile.nameAr : profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {t.roles[currentRole]}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {lang === 'ar' ? profile.designationAr : profile.designation} • {lang === 'ar' ? profile.departmentAr : profile.department}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  📞 {profile.phone} | ✉️ {profile.email}
                </p>
              </div>
            </div>

            {/* Quick Action Button & Working Hours */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="text-right hidden xl:block">
                <span className="text-[11px] text-amber-300 font-semibold block">
                  {lang === 'ar' ? 'ساعات دوام مدرسة إي بي إس عُمان' : 'IPS Oman Official Calendar'}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {lang === 'ar' ? 'الأحد – الخميس: ٠٧:٣٠ ص – ٠٢:٣٠ ظ' : 'Sun – Thu: 07:30 AM – 02:30 PM'}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('book')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>➕</span>
                <span>{t.actions.bookNow}</span>
              </button>
            </div>

          </div>

          {/* Quick Persona Switcher Chips (All 10 Roles) */}
          <div className="mt-6 pt-5 border-t border-slate-700/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {lang === 'ar' ? 'اختر الدور الذي ترغب في تجربته:' : 'Select Persona to Explore:'}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(Object.keys(USER_PROFILES) as UserRole[]).map(r => {
                const isActive = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => setCurrentRole(r)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-105' 
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    <span>
                      {r === 'admin' ? '⚙️' : r === 'principal' ? '👑' : r === 'parent' ? '👨‍👩‍👧' : r === 'teacher' ? '📚' : r === 'student' ? '🎓' : r === 'admission' ? '📋' : r === 'receptionist' ? '🛎️' : r === 'counselor' ? '💚' : r === 'finance' ? '💰' : '👔'}
                    </span>
                    <span>{t.roles[r]}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-amber-200/80 mt-1 italic">
              ℹ️ {t.rolesDesc[currentRole]}
            </p>
          </div>

        </div>
      </section>

      {/* ── MAIN NAVIGATION TABS ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5">
            {[
              { id: 'dashboard', label: t.tabs.dashboard, icon: '📊' },
              { id: 'book', label: t.tabs.book, icon: '📅' },
              { id: 'calendar', label: t.tabs.calendar, icon: '🗓️' },
              { id: 'ptc', label: t.tabs.ptc, icon: '🤝' },
              { id: 'review', label: t.tabs.review, icon: '⚖️', badge: stats.pending },
              { id: 'reception', label: t.tabs.reception, icon: '🛎️', badge: stats.checkedIn },
              { id: 'history', label: t.tabs.history, icon: '📑' },
              { id: 'settings', label: t.tabs.settings, icon: '⚙️' },
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    active 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                      active ? 'bg-amber-400 text-slate-950' : 'bg-red-500 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── CONTENT AREA ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ════ TAB 1: ROLE DASHBOARD ════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.stats.todayAppointments}</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.upcoming}</div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">● Scheduled today</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  📅
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.stats.pendingReview}</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{stats.pending}</div>
                  <span className="text-[11px] text-amber-700 font-bold mt-1 inline-block">⚡ Action required</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  ⏳
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.stats.visitorArrivals}</span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 mt-1">{stats.checkedIn}</div>
                  <span className="text-[11px] text-cyan-700 font-bold mt-1 inline-block">🎫 Gate pass active</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl">
                  🛎️
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.stats.totalCompleted}</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{stats.completed}</div>
                  <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block">✓ With minutes</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-xl">
                  🏆
                </div>
              </div>

            </div>

            {/* Quick Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.labels.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="all">{t.labels.filterByStatus}: {t.labels.all}</option>
                  <option value="requested">{t.status.requested}</option>
                  <option value="approved">{t.status.approved}</option>
                  <option value="rescheduled">{t.status.rescheduled}</option>
                  <option value="checked_in">{t.status.checked_in}</option>
                  <option value="completed">{t.status.completed}</option>
                  <option value="declined">{t.status.declined}</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="all">{t.labels.filterByCategory}: {t.labels.all}</option>
                  {(Object.keys(t.categories) as MeetingCategory[]).map(cat => (
                    <option key={cat} value={cat}>{t.categories[cat]}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of Appointments for the Active Role */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <span>📋</span>
                  <span>{lang === 'ar' ? `مواعيد دور: ${t.roles[currentRole]}` : `Appointments for: ${t.roles[currentRole]}`}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-bold text-slate-700">
                    {visibleAppointments.length}
                  </span>
                </h3>

                <button
                  onClick={() => setActiveTab('book')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  + {t.booking.title}
                </button>
              </div>

              {visibleAppointments.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                  <div className="text-4xl mb-3">📭</div>
                  <h4 className="font-bold text-slate-800">{lang === 'ar' ? 'لا توجد مواعيد مطابقة حالياً' : 'No appointments matching criteria'}</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {lang === 'ar' ? 'يمكنك حجز موعد جديد أو تغيير التصفية أو التبديل إلى دور آخر لمعاينة بياناته.' : 'Try adjusting your filters, booking a new meeting, or switching to another persona.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {t.actions.bookNow}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleAppointments.map(app => {
                    const st = statusColorMap[app.status];
                    return (
                      <div 
                        key={app.id}
                        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Header: Category & Status */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate">
                              {t.categories[app.category]}
                            </span>
                            <span 
                              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                              style={{ backgroundColor: st.bg, color: st.text }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.dot }}></span>
                              {t.status[app.status]}
                            </span>
                          </div>

                          {/* Meeting Subject */}
                          <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                            {lang === 'ar' && app.titleAr ? app.titleAr : app.title}
                          </h4>

                          {/* Ref ID & Format */}
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                            <span className="font-mono font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                              {app.id}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {app.format === 'in_person' ? '🏫 In-Person' : '💻 Online'}
                            </span>
                          </div>

                          {/* Meeting Date & Time */}
                          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                            <div className="flex items-center justify-between font-semibold text-slate-700">
                              <span>📅 {app.date}</span>
                              <span className="text-amber-800">⏰ {app.timeSlot}</span>
                            </div>
                            <div className="text-slate-500 truncate mt-1">
                              📍 {app.roomOrLink}
                            </div>
                          </div>

                          {/* People involved */}
                          <div className="mt-3 text-xs space-y-1 text-slate-600">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">{t.labels.requester}:</span>
                              <span className="font-semibold text-slate-800">{app.requesterName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">{lang === 'ar' ? 'الكادر المستهدف:' : 'Staff Host:'}</span>
                              <span className="font-semibold text-slate-800">{app.targetStaffName}</span>
                            </div>
                            {app.studentName && (
                              <div className="flex items-center justify-between text-indigo-700 bg-indigo-50/60 px-2 py-1 rounded-lg mt-1 font-semibold">
                                <span>🎓 {t.labels.student}:</span>
                                <span>{app.studentName} ({app.studentGrade})</span>
                              </div>
                            )}
                          </div>

                          {/* Notes snippet */}
                          <p className="mt-3 text-xs text-slate-500 italic line-clamp-2">
                            "{app.notes}"
                          </p>
                        </div>

                        {/* Card Actions Footer */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setSelectedAppointment(app);
                              setShowDetailsModal(true);
                            }}
                            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            {t.actions.viewDetails}
                          </button>

                          <div className="flex items-center gap-1.5">
                            {/* Receptionist Check-in */}
                            {currentRole === 'receptionist' && app.status === 'approved' && (
                              <button
                                onClick={() => handleCheckInVisitor(app.id)}
                                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition-colors"
                              >
                                {t.actions.checkIn}
                              </button>
                            )}

                            {/* Visitor Badge Print */}
                            {app.visitorPassCode && (
                              <button
                                onClick={() => {
                                  setSelectedAppointment(app);
                                  setShowVisitorBadgeModal(true);
                                }}
                                className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title={t.actions.printPass}
                              >
                                🪪 {app.visitorPassCode}
                              </button>
                            )}

                            {/* Staff Approve / Decline buttons */}
                            {app.status === 'requested' && (currentRole === 'teacher' || currentRole === 'principal' || currentRole === 'admission' || currentRole === 'counselor' || currentRole === 'finance' || currentRole === 'admin') && (
                              <>
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                                >
                                  ✓ {t.actions.approve}
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAppointment(app);
                                    setShowDeclineModal(true);
                                  }}
                                  className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                                >
                                  ✕
                                </button>
                              </>
                            )}

                            {/* Record Outcome Button */}
                            {app.status === 'checked_in' && (currentRole === 'teacher' || currentRole === 'counselor' || currentRole === 'admission' || currentRole === 'principal' || currentRole === 'admin') && (
                              <button
                                onClick={() => {
                                  setSelectedAppointment(app);
                                  setShowOutcomeModal(true);
                                }}
                                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                              >
                                ✍️ {t.actions.recordOutcome}
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ════ TAB 2: BOOK MEETING WIZARD ════ */}
        {activeTab === 'book' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            
            {bookingSuccess ? (
              <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900">{t.booking.successTitle}</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">{t.booking.successMessage}</p>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.booking.referenceNumber}:</span>
                    <span className="font-mono font-bold text-amber-700">{bookingSuccess.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.labels.date}:</span>
                    <span className="font-semibold text-slate-800">{bookingSuccess.date} ({bookingSuccess.timeSlot})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.labels.locationOrLink}:</span>
                    <span className="font-semibold text-slate-800">{bookingSuccess.roomOrLink}</span>
                  </div>
                  {bookingSuccess.visitorPassCode && (
                    <div className="flex justify-between text-cyan-800 bg-cyan-50 p-2 rounded-lg font-bold">
                      <span>{t.labels.visitorPass}:</span>
                      <span className="font-mono">{bookingSuccess.visitorPassCode}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      setBookingSuccess(null);
                      setActiveTab('dashboard');
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {lang === 'ar' ? 'الذهاب إلى لوحة المواعيد' : 'View on Dashboard'}
                  </button>
                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                  >
                    {lang === 'ar' ? 'حجز موعد آخر' : 'Book Another Meeting'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateBooking} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{t.booking.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.booking.subtitle}</p>
                </div>

                {/* Step 1: Category */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t.booking.step1}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(t.categories) as MeetingCategory[]).map(cat => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setBookingCategory(cat)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          bookingCategory === cat
                            ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        <span className="text-lg">
                          {cat === 'parent_teacher' ? '👨‍🏫' : cat === 'principal_meeting' ? '👑' : cat === 'academic_support' ? '📖' : cat === 'admission_interview' ? '📋' : cat === 'counseling_session' ? '💚' : cat === 'finance_fees' ? '💰' : '👔'}
                        </span>
                        <div>
                          <div className="text-xs font-bold">{t.categories[cat]}</div>
                          <div className="text-[10px] text-slate-400">
                            {cat === 'counseling_session' ? 'Confidential guidance' : 'School standard meeting'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Staff Member */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t.booking.step2}
                  </label>
                  <select
                    value={bookingStaffId}
                    onChange={(e) => setBookingStaffId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {STAFF_DIRECTORY.map(staff => (
                      <option key={staff.id} value={staff.id}>
                        {lang === 'ar' ? staff.nameAr : staff.name} — {lang === 'ar' ? staff.departmentAr : staff.department} ({staff.room})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Date & Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t.booking.selectDate}
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min="2026-10-21"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <p className="text-[11px] text-slate-400">
                      ℹ️ {lang === 'ar' ? 'الدوام من الأحد إلى الخميس فقط' : 'Sunday through Thursday only'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t.booking.selectTime}
                    </label>
                    <select
                      value={bookingSlot}
                      onChange={(e) => setBookingSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="08:00 AM - 08:30 AM">08:00 AM - 08:30 AM (Available)</option>
                      <option value="08:30 AM - 09:00 AM">08:30 AM - 09:00 AM (Available)</option>
                      <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM (Available)</option>
                      <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM (Available)</option>
                      <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM (Available)</option>
                      <option value="12:30 PM - 01:00 PM">12:30 PM - 01:00 PM (Available)</option>
                      <option value="01:30 PM - 02:00 PM">01:30 PM - 02:00 PM (Available)</option>
                    </select>
                  </div>
                </div>

                {/* Step 4: Child & Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Associated Child */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t.booking.selectChild}
                    </label>
                    {profile.children && profile.children.length > 0 ? (
                      <select
                        value={bookingChildId}
                        onChange={(e) => setBookingChildId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        {profile.children.map(ch => (
                          <option key={ch.id} value={ch.id}>
                            {lang === 'ar' ? ch.nameAr : ch.name} ({ch.grade})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-2.5 bg-slate-100 rounded-xl text-xs text-slate-500">
                        {t.booking.noChildNeeded}
                      </div>
                    )}
                  </div>

                  {/* Format */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t.labels.filterByFormat}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setBookingFormat('in_person')}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          bookingFormat === 'in_person'
                            ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        🏫 {t.format.in_person}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingFormat('online')}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          bookingFormat === 'online'
                            ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        💻 {t.format.online}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 5: Subject & Agenda */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      {t.booking.subject}
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingSubject}
                      onChange={(e) => setBookingSubject(e.target.value)}
                      placeholder={t.booking.subjectPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      {t.booking.meetingNotes}
                    </label>
                    <textarea
                      rows={3}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder={t.booking.agendaPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    ></textarea>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {t.actions.close}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black shadow-lg shadow-slate-900/10 transition-all hover:scale-105"
                  >
                    {t.actions.submit}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* ════ TAB 3: STAFF AVAILABILITY & CALENDAR ════ */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">{t.availability.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.availability.subtitle}</p>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                ✓ {lang === 'ar' ? 'نظام التقويم المدرسي العُماني نشط' : 'Oman Academic Calendar Sync Active'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_STAFF_AVAILABILITY.map(av => (
                <div key={av.staffId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {lang === 'ar' ? av.staffNameAr : av.staffName}
                      </h4>
                      <span className="text-[11px] text-slate-500">{lang === 'ar' ? av.departmentAr : av.department}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      {av.slotDurationMinutes} min slots
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'ar' ? 'ساعات الاستقبال:' : 'Working Hours:'}</span>
                      <span className="font-semibold text-slate-800">{av.dayStartTime} - {av.dayEndTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.availability.dailyMax}:</span>
                      <span className="font-semibold text-slate-800">{av.maxDailySlots} appointments</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      {t.availability.activeDays}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map(day => (
                        <span key={day} className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold">
                          {day}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-500 text-[10px] font-bold line-through">
                        Fri / Sat
                      </span>
                    </div>
                  </div>

                  {av.blackoutDates.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-red-600 font-semibold flex items-center gap-1.5">
                      <span>⛔</span>
                      <span>{t.availability.blackoutTitle}: {av.blackoutDates.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* School Holiday Policy Card */}
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl p-6 border border-amber-300/40 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>🇴🇲</span>
                <span>{lang === 'ar' ? 'سياسة العطلات والتقويم المدرسي لسلطنة عُمان' : 'Sultanate of Oman Academic Holiday Policy'}</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'يتم إغلاق نظام حجز المواعيد تلقائياً خلال العطلات الرسمية المعتمدة لوزارة التربية والتعليم بما فيها العيد الوطني (١٨ - ١٩ نوفمبر) وعيد الفطر وعيد الأضحى وإجازة منتصف العام الدراسي.'
                  : 'Appointments are systematically locked out during official Ministry of Education declared holidays including Oman National Day (18–19 November), Eid breaks, and Mid-Term academic breaks.'}
              </p>
            </div>
          </div>
        )}

        {/* ════ TAB 4: PARENT-TEACHER CONFERENCES (PTC) ════ */}
        {activeTab === 'ptc' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">{t.categories.parent_teacher}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ar' ? 'لقاءات أولياء الأمور المربوطة بالطالب المعني وتقييم التحصيل الأكاديمي.' : 'Dedicated conferences linking authorized children directly to their subject educators.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setBookingCategory('parent_teacher');
                  setActiveTab('book');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                + {lang === 'ar' ? 'حجز لقاء ولي أمر ومعلم' : 'Book Parent-Teacher Conference'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.filter(a => a.category === 'parent_teacher').map(app => (
                <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {app.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {t.status[app.status]}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {lang === 'ar' && app.titleAr ? app.titleAr : app.title}
                  </h4>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.labels.student}:</span>
                      <span className="font-bold text-indigo-700">{app.studentName} ({app.studentGrade})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.roles.teacher}:</span>
                      <span className="font-semibold text-slate-800">{app.targetStaffName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.roles.parent}:</span>
                      <span className="font-semibold text-slate-800">{app.requesterName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.labels.date}:</span>
                      <span className="font-semibold text-slate-800">{app.date} • {app.timeSlot}</span>
                    </div>
                  </div>

                  {app.outcomeNotes && (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-emerald-900">✓ {t.labels.outcome}:</span>
                      <p className="text-emerald-800 italic leading-relaxed">{app.outcomeNotes}</p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedAppointment(app);
                        setShowDetailsModal(true);
                      }}
                      className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      {t.actions.viewDetails}
                    </button>
                    {app.status === 'checked_in' && (
                      <button
                        onClick={() => {
                          setSelectedAppointment(app);
                          setShowOutcomeModal(true);
                        }}
                        className="text-xs font-bold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                      >
                        ✍️ {t.actions.recordOutcome}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ TAB 5: APPOINTMENT APPROVALS WORKFLOW ════ */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">{t.tabs.review}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ar' ? 'الموافقة أو الاعتذار أو اقتراح موعد بديل للطلبات الواردة.' : 'Review pending meeting requests, confirm, propose alternate slots or decline with reasons.'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {appointments.filter(a => a.status === 'requested').length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {appointments.filter(a => a.status === 'requested').length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                  <div className="text-4xl mb-2">🎉</div>
                  <h4 className="font-bold text-slate-800">{lang === 'ar' ? 'جميع الطلبات تمت مراجعتها بالكامل!' : 'All pending requests have been reviewed!'}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'ar' ? 'لا توجد طلبات معلقة بانتظار الاعتماد.' : 'No appointment requests currently waiting for authorization.'}
                  </p>
                </div>
              ) : (
                appointments.filter(a => a.status === 'requested').map(app => (
                  <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {app.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {t.categories[app.category]}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {lang === 'ar' && app.titleAr ? app.titleAr : app.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Requested by: <b>{app.requesterName}</b> for <b>{app.date} ({app.timeSlot})</b>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                      >
                        ✓ {t.actions.approve}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAppointment(app);
                          setProposedNewDate(app.date);
                          setShowProposeModal(true);
                        }}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-sm transition-colors"
                      >
                        ⏱️ {t.actions.proposeTime}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAppointment(app);
                          setShowDeclineModal(true);
                        }}
                        className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        ✕ {t.actions.decline}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ════ TAB 6: RECEPTIONIST DESK & VISITOR CHECK-IN ════ */}
        {activeTab === 'reception' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {t.roles.receptionist} Portal
                </span>
                <h3 className="text-2xl font-black">{t.reception.deskTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.reception.deskSubtitle}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder={t.reception.searchVisitor}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-white/10 text-white placeholder:text-slate-400 border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-colors"
                >
                  {lang === 'ar' ? 'تحديث السجل' : 'Refresh Register'}
                </button>
              </div>
            </div>

            {/* Scheduled In-Person Visits Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  {lang === 'ar' ? 'قائمة الزوار المسجلين اليوم بالحرم المدرسي' : 'Today’s Scheduled Campus Visitors'}
                </h4>
                <span className="text-xs text-slate-500 font-semibold">
                  Gate 1 — Main Security Entry
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="p-3.5">Ref ID</th>
                      <th className="p-3.5">{t.labels.requester}</th>
                      <th className="p-3.5">{t.labels.student}</th>
                      <th className="p-3.5">Host Staff</th>
                      <th className="p-3.5">{t.labels.time}</th>
                      <th className="p-3.5">{t.labels.visitorPass}</th>
                      <th className="p-3.5">{t.labels.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.filter(a => a.format === 'in_person').map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-700">{app.id}</td>
                        <td className="p-3.5 font-semibold text-slate-900">
                          <div>{app.requesterName}</div>
                          <div className="text-[10px] text-slate-400">{app.requesterPhone}</div>
                        </td>
                        <td className="p-3.5">{app.studentName ? `${app.studentName} (${app.studentGrade})` : '—'}</td>
                        <td className="p-3.5">{app.targetStaffName}</td>
                        <td className="p-3.5 font-semibold">{app.timeSlot}</td>
                        <td className="p-3.5">
                          {app.visitorPassCode ? (
                            <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono font-bold">
                              {app.visitorPassCode}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {app.status === 'checked_in' ? (
                            <button
                              onClick={() => {
                                setSelectedAppointment(app);
                                setShowVisitorBadgeModal(true);
                              }}
                              className="px-3 py-1 bg-cyan-50 text-cyan-800 border border-cyan-300 rounded-lg font-bold text-[11px] hover:bg-cyan-100"
                            >
                              🪪 Print Badge
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCheckInVisitor(app.id)}
                              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-colors"
                            >
                              ✓ {t.actions.checkIn}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB 7: RECORDS & HISTORY ════ */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">{t.tabs.history}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ar' ? 'أرشيف كامل لكافة المقابلات ومحاضر الاجتماعات وتاريخ التدقيق.' : 'Complete institutional audit archive of upcoming, completed, and historic meetings.'}
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                🖨️ {t.labels.exportSchedule}
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="p-3.5">{t.labels.reference}</th>
                      <th className="p-3.5">{t.labels.agenda}</th>
                      <th className="p-3.5">{t.labels.date} & {t.labels.time}</th>
                      <th className="p-3.5">{t.labels.attendees}</th>
                      <th className="p-3.5">{t.labels.outcome}</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">{t.labels.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map(app => {
                      const st = statusColorMap[app.status];
                      return (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-amber-700">{app.id}</td>
                          <td className="p-3.5 font-semibold text-slate-900 max-w-xs">
                            <div className="truncate">{app.title}</div>
                            <div className="text-[10px] text-slate-400">{t.categories[app.category]}</div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div>{app.date}</div>
                            <div className="text-[10px] text-slate-400">{app.timeSlot}</div>
                          </td>
                          <td className="p-3.5">
                            <div><b>Req:</b> {app.requesterName}</div>
                            <div><b>Host:</b> {app.targetStaffName}</div>
                          </td>
                          <td className="p-3.5 max-w-xs">
                            {app.outcomeNotes ? (
                              <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                                "{app.outcomeNotes}"
                              </p>
                            ) : (
                              <span className="text-slate-400 italic">Pending meeting</span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span 
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
                              style={{ backgroundColor: st.bg, color: st.text }}
                            >
                              {t.status[app.status]}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => {
                                setSelectedAppointment(app);
                                setShowDetailsModal(true);
                              }}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px]"
                            >
                              {t.actions.viewDetails}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB 8: SCHOOL SETTINGS & CATEGORIES ════ */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900">{t.tabs.settings}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'ar' ? 'إعدادات المنصة المدرسية وصلاحيات الأقسام وفترات الحجز.' : 'Global school platform configuration, booking windows, slot intervals, and security compliance.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span>🏫</span>
                  <span>{lang === 'ar' ? 'بيانات مدرسة إي بي إس عُمان' : 'IPS Oman Campus Registry'}</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block">{lang === 'ar' ? 'الموقع:' : 'Campus Location:'}</span>
                    <span className="font-semibold text-slate-800">Al Hail South, Muscat, Sultanate of Oman</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block">{lang === 'ar' ? 'هاتف المدرسة:' : 'School Hotline:'}</span>
                    <span className="font-semibold text-slate-800">+968 2451 9000</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block">{lang === 'ar' ? 'البريد الرسمي:' : 'Official Email:'}</span>
                    <span className="font-semibold text-slate-800">info@ips-oman.edu.om</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span>🔒</span>
                  <span>{lang === 'ar' ? 'سياسة الخصوصية وأمان البيانات' : 'Confidentiality & Access Control'}</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                    <b>Counselor Access Guard:</b> Confidential student guidance notes are strictly restricted to authorized well-being staff.
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <b>Parent Verification:</b> Parents may only view and book conferences for their legally verified children.
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <b>Reception Audit:</b> All physical visitors must produce photo identification and wear security passes.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ════ MODAL 1: APPOINTMENT DETAILS & AUDIT TRAIL ════ */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {selectedAppointment.id}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-1">
                  {lang === 'ar' && selectedAppointment.titleAr ? selectedAppointment.titleAr : selectedAppointment.title}
                </h3>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Details Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">{t.labels.filterByCategory}:</span>
                <span className="font-bold text-slate-800">{t.categories[selectedAppointment.category]}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">{t.labels.filterByFormat}:</span>
                <span className="font-bold text-slate-800">{t.format[selectedAppointment.format]}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">{t.labels.date}:</span>
                <span className="font-bold text-slate-800">{selectedAppointment.date}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">{t.labels.time}:</span>
                <span className="font-bold text-amber-700">{selectedAppointment.timeSlot}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-1">
              <span className="text-slate-400 block">{t.labels.locationOrLink}:</span>
              <span className="font-mono font-bold text-slate-800">{selectedAppointment.roomOrLink}</span>
            </div>

            {/* Attendees */}
            <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{t.labels.requester}:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.requesterName} ({selectedAppointment.requesterEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Host Personnel:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.targetStaffName} ({selectedAppointment.targetStaffDepartment})</span>
              </div>
              {selectedAppointment.studentName && (
                <div className="flex justify-between text-indigo-700 font-bold pt-1 border-t border-slate-200">
                  <span>🎓 {t.labels.student}:</span>
                  <span>{selectedAppointment.studentName} ({selectedAppointment.studentGrade})</span>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-700">{t.labels.agenda}:</span>
              <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed italic">
                "{selectedAppointment.notes}"
              </p>
            </div>

            {/* Confidential counselor notes if applicable */}
            {selectedAppointment.confidentialNotes && (currentRole === 'counselor' || currentRole === 'admin') && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 text-emerald-900">
                <span className="font-bold">🔒 {t.labels.confidentialNotes}:</span>
                <p className="italic">{selectedAppointment.confidentialNotes}</p>
              </div>
            )}

            {/* Meeting Outcome */}
            {selectedAppointment.outcomeNotes && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs space-y-1 text-indigo-950">
                <span className="font-bold">📝 {t.labels.outcome}:</span>
                <p className="leading-relaxed">{selectedAppointment.outcomeNotes}</p>
              </div>
            )}

            {/* Audit History Trail */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-700">{t.labels.auditTrail}:</span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {selectedAppointment.history.map((h, i) => (
                  <div key={i} className="text-[11px] p-2 bg-slate-50 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{lang === 'ar' && h.actionAr ? h.actionAr : h.action}</span>
                      <span className="text-slate-400 block text-[10px]">{h.by} {h.notes ? `— "${h.notes}"` : ''}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                {t.actions.close}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ════ MODAL 2: PRINTABLE VISITOR PASS BADGE ════ */}
      {showVisitorBadgeModal && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-center">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Security Gate Pass</span>
              <button onClick={() => setShowVisitorBadgeModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            {/* Pass Badge Card Design */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-amber-400/40">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-sm mb-2">
                IPS
              </div>
              <h4 className="text-xs font-extrabold tracking-widest text-amber-300 uppercase">
                IPS OMAN VISITOR PASS
              </h4>
              <p className="text-[10px] text-slate-400">Muscat Campus Security Authority</p>

              <div className="my-4 py-3 bg-white/10 rounded-xl border border-white/10">
                <div className="font-mono font-black text-2xl tracking-widest text-amber-400">
                  {selectedAppointment.visitorPassCode || 'PASS-9988'}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-slate-300">Authorized Campus Visitor</span>
              </div>

              <div className="text-left text-xs space-y-1 text-slate-200">
                <div><b>Visitor:</b> {selectedAppointment.requesterName}</div>
                <div><b>Meeting With:</b> {selectedAppointment.targetStaffName}</div>
                <div><b>Location:</b> {selectedAppointment.roomOrLink}</div>
                <div><b>Date:</b> {selectedAppointment.date} ({selectedAppointment.timeSlot})</div>
              </div>

              {/* Simulated Barcode */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="font-mono text-center tracking-widest text-xs font-black text-slate-400">
                  |||||||||| | ||||| ||||||| |||| ||||
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 block">Gate 1 Scan Verified</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              {t.reception.instructions}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                🖨️ {t.actions.printPass}
              </button>
              <button
                onClick={() => setShowVisitorBadgeModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                {t.actions.close}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ════ MODAL 3: RECORD OUTCOME / MINUTES ════ */}
      {showOutcomeModal && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-slate-900">{t.actions.recordOutcome}</h3>
            <p className="text-xs text-slate-500">
              Document decisions, homework plans, or next follow-ups agreed upon with <b>{selectedAppointment.requesterName}</b>.
            </p>

            <textarea
              rows={4}
              required
              value={outcomeText}
              onChange={(e) => setOutcomeText(e.target.value)}
              placeholder="e.g., Reviewed exam mock papers. Agreed on weekly science quiz revisions. Next check-in in 3 weeks..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowOutcomeModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                {t.actions.close}
              </button>
              <button
                onClick={handleOutcomeSubmit}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Save Minutes & Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ MODAL 4: PROPOSE NEW TIME ════ */}
      {showProposeModal && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-slate-900">{t.actions.proposeTime}</h3>
            <p className="text-xs text-slate-500">
              Propose an alternate schedule to {selectedAppointment.requesterName}.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">New Date</label>
                <input
                  type="date"
                  value={proposedNewDate}
                  onChange={(e) => setProposedNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">New Time Slot</label>
                <input
                  type="text"
                  value={proposedNewTime}
                  onChange={(e) => setProposedNewTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setShowProposeModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                {t.actions.close}
              </button>
              <button
                onClick={handleProposeSubmit}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-sm"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ MODAL 5: DECLINE REQUEST ════ */}
      {showDeclineModal && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-red-600">{t.actions.decline}</h3>
            <p className="text-xs text-slate-500">
              Specify a reason for declining this request. The requester will be notified.
            </p>

            <textarea
              rows={3}
              value={declineReasonText}
              onChange={(e) => setDeclineReasonText(e.target.value)}
              placeholder="e.g., Conflicting academic staff meeting / prior inspection scheduled..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                {t.actions.close}
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-white text-sm">{t.appName} — {t.appTitle}</div>
            <p className="text-slate-400 text-[11px] mt-0.5">{t.schoolMotto}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <Link href="/select-portal" className="hover:text-white transition-colors">{t.backToMainPortal}</Link>
            <span>•</span>
            <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
            <span>•</span>
            <span className="text-amber-400">Muscat GST (+04:00)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
