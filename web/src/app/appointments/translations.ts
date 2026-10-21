export type Language = 'en' | 'ar';

export const translations = {
  en: {
    appName: "IPS Oman",
    appTitle: "School Appointment Management App",
    appSubtitle: "Official Meeting & Family Engagement Platform",
    schoolMotto: "International Private School — Muscat, Sultanate of Oman",
    switchPersona: "Switch User Role",
    activeRole: "Current Active Role",
    backToMainPortal: "Return to Main School Platform",
    viewAs: "Viewing interface as:",
    
    // Roles
    roles: {
      admin: "School Administrator",
      principal: "Principal",
      parent: "Parent / Guardian",
      teacher: "Teacher",
      student: "Student",
      admission: "Admission Officer",
      receptionist: "Receptionist",
      counselor: "School Counselor",
      finance: "Finance Officer",
      hr: "HR Officer",
    },

    rolesDesc: {
      admin: "Configure meeting categories, school calendars, access permissions and appointment reports.",
      principal: "Manage principal meetings, review escalations and oversee authorized appointments.",
      parent: "Request, view, reschedule or cancel meetings relating to authorized children.",
      teacher: "Publish availability, respond to requests and record meeting outcomes.",
      student: "Request permitted academic-support meetings and track their status.",
      admission: "Schedule interviews, applicant consultations and admission follow-ups.",
      receptionist: "Register walk-in requests, verify arrivals and coordinate visitors.",
      counselor: "Manage confidential guidance sessions with restricted access.",
      finance: "Handle appointments about invoices, fee plans and payment queries.",
      hr: "Arrange staff interviews and employee-related meetings.",
    },

    // Tabs
    tabs: {
      dashboard: "Role Dashboard",
      book: "Book Meeting",
      calendar: "Staff Availability",
      ptc: "PTC Conferences",
      review: "Appointment Approvals",
      reception: "Visitor Check-in Desk",
      history: "Records & Outcome History",
      settings: "Categories & Rules",
    },

    // Statuses
    status: {
      requested: "Pending Review",
      approved: "Confirmed & Scheduled",
      rescheduled: "Reschedule Proposed",
      declined: "Declined",
      checked_in: "Visitor Checked In",
      completed: "Completed & Recorded",
      cancelled: "Cancelled",
      no_show: "Missed / No-Show",
    },

    // Formats
    format: {
      in_person: "In-Person Campus Visit",
      online: "Online Video Meeting",
    },

    // Categories
    categories: {
      parent_teacher: "Parent–Teacher Conference",
      principal_meeting: "Principal Direct Meeting",
      academic_support: "Academic Support & Tutoring",
      admission_interview: "Student Admission & Assessment",
      counseling_session: "Confidential Guidance & Counseling",
      finance_fees: "Tuition & Financial Services",
      hr_recruitment: "HR & Faculty Recruitment",
      walk_in: "Walk-in Front Desk Request",
    },

    // Quick stats
    stats: {
      todayAppointments: "Today's Appointments",
      pendingReview: "Pending Approvals",
      confirmedUpcoming: "Confirmed Upcoming",
      visitorArrivals: "Checked-in Visitors",
      totalCompleted: "Completed This Term",
      availabilityRatio: "Staff Slot Utilization",
    },

    // Common labels
    labels: {
      all: "All",
      searchPlaceholder: "Search by student, parent, staff or reference ID...",
      filterByStatus: "Filter Status",
      filterByCategory: "Filter Category",
      filterByFormat: "Filter Format",
      date: "Date",
      time: "Time",
      requester: "Requester",
      attendees: "Attendees",
      locationOrLink: "Location / Link",
      actions: "Actions",
      reference: "Ref ID",
      student: "Linked Student",
      agenda: "Meeting Agenda",
      notes: "Notes",
      outcome: "Meeting Outcome & Minutes",
      confidentialNotes: "Confidential Counselor Notes (Restricted)",
      visitorPass: "Visitor Pass Code",
      auditTrail: "Status & Audit History",
      totalAppointments: "Total Appointments",
      pendingReview: "Pending Review",
      todayUpcoming: "Today's Schedule",
      completedTerm: "Completed Meetings",
      checkInTime: "Check-in Time",
      availableSlots: "Available Slots",
      workingDays: "School Week: Sunday – Thursday (07:30 AM – 02:30 PM)",
      exportSchedule: "Export Schedule (PDF)",
      quickBook: "Schedule Meeting",
    },

    // Actions
    actions: {
      bookNow: "Schedule New Meeting",
      approve: "Approve Appointment",
      decline: "Decline Request",
      proposeTime: "Propose Alternate Time",
      checkIn: "Check-In Visitor",
      printPass: "Print Visitor Pass",
      recordOutcome: "Record Outcome Notes",
      viewDetails: "View Details",
      cancel: "Cancel Meeting",
      confirm: "Confirm",
      close: "Close",
      submit: "Submit Request",
      saveChanges: "Save Availability",
    },

    // Booking Wizard
    booking: {
      title: "Book a School Appointment",
      subtitle: "Choose staff member, meeting type, child and suitable calendar slot",
      step1: "1. Select Category & Department",
      step2: "2. Select Staff Member",
      step3: "3. Choose Date & Time Slot",
      step4: "4. Student & Meeting Format",
      step5: "5. Purpose & Special Notes",
      selectChild: "Associated Child / Student",
      childRequired: "Select which child this conference relates to",
      noChildNeeded: "General inquiry / not student-specific",
      inPersonDesc: "Meeting takes place at IPS Oman campus. A visitor pass will be issued at the gate.",
      onlineDesc: "Meeting takes place remotely via secure Google Meet or Microsoft Teams link.",
      selectDate: "Select Date (Sunday – Thursday only)",
      selectTime: "Select Available Slot",
      subject: "Meeting Subject",
      subjectPlaceholder: "e.g., Term 1 Mathematics Checkpoint Review",
      meetingNotes: "Agenda / Specific Discussion Topics",
      agendaPlaceholder: "Provide a brief description of what you wish to discuss...",
      successTitle: "Appointment Request Submitted Successfully!",
      successMessage: "Your meeting request has been logged. You will receive an SMS and email notification once reviewed.",
      referenceNumber: "Booking Reference",
    },

    // Receptionist
    reception: {
      deskTitle: "Front Desk Visitor Arrival & Check-in Terminal",
      deskSubtitle: "Verify pre-registered appointments, print security badges and monitor active campus visitors.",
      searchVisitor: "Scan badge or enter parent / visitor name...",
      checkInSuccess: "Visitor marked as arrived and badge pass activated.",
      passModalTitle: "IPS Oman Visitor Gate Pass",
      validFor: "Valid for: Today only",
      instructions: "Please wear this badge visibly while on campus and return it to security upon departure.",
    },

    // Availability Calendar
    availability: {
      title: "Staff Availability & Working Hours Configurator",
      subtitle: "Set working days, daily appointment windows, slot durations and blackout holiday periods.",
      slotDuration: "Slot Duration (Minutes)",
      dailyMax: "Max Appointments Per Day",
      activeDays: "Active School Days",
      blackoutTitle: "Official School Holidays & Blackout Dates",
      omanNationalDay: "Oman National Day (18–19 Nov)",
      termBreak: "Mid-Term Academic Break",
    }
  },

  ar: {
    appName: "مدرسة إي بي إس عُمان",
    appTitle: "نظام إدارة المواعيد والمقابلات المدرسية",
    appSubtitle: "المنصة الرسمية للتواصل بين أولياء الأمور وكادر المدرسة",
    schoolMotto: "المدرسة الدولية الخاصة — مسقط، سلطنة عُمان",
    switchPersona: "تبديل دور المستخدم",
    activeRole: "الدور النشط حالياً",
    backToMainPortal: "العودة للمنصة المدرسية الرئيسية",
    viewAs: "عرض الواجهة بصلاحية:",
    
    // Roles
    roles: {
      admin: "مدير النظام المدرسي",
      principal: "مدير المدرسة",
      parent: "ولي الأمر / الوصي",
      teacher: "المعلم",
      student: "الطالب",
      admission: "مسؤول القبول والتسجيل",
      receptionist: "موظف الاستقبال",
      counselor: "الأخصائي الاجتماعي والنفسي",
      finance: "المسؤول المالي",
      hr: "مسؤول الموارد البشرية",
    },

    rolesDesc: {
      admin: "تهيئة فئات المقابلات، التقويم المدرسي، إدارة الصلاحيات وتقارير المواعيد.",
      principal: "إدارة مقابلات القيادة، مراجعة طلبات التصعيد ومتابعة المواعيد المعتمدة.",
      parent: "طلب، استعراض، إعادة جدولة أو إلغاء المقابلات الخاصة بالأبناء المصرح لهم.",
      teacher: "تحديد فترات التوفر، الرد على الطلبات وتدوين مخرجات ومحاضر الاجتماعات.",
      student: "طلب مواعيد الدعم الأكاديمي المسموح بها ومتابعة حالتها.",
      admission: "جدولة المقابلات، استشارات المتقدمين الجدد ومتابعة إجراءات التسجيل.",
      receptionist: "تسجيل طلبات الزوار الفورية، التحقق من الوصول وتنسيق دخول الحرم المدرسي.",
      counselor: "إدارة جلسات الإرشاد الطلابي والسرية مع تقييد الوصول إليها.",
      finance: "التعامل مع مواعيد الفواتير وخطط السداد والاستفسارات المالية.",
      hr: "ترتيب مقابلات التوظيف واجتماعات الكادر الوظيفي للمدرسة.",
    },

    // Tabs
    tabs: {
      dashboard: "لوحة التحكم للدور",
      book: "حجز مقابلة جديدة",
      calendar: "الجدول وأوقات التوفر",
      ptc: "لقاءات أولياء الأمور",
      review: "اعتماد ومراجعة الطلبات",
      reception: "مكتب الاستقبال وتسجيل الزوار",
      history: "سجل الاجتماعات والمحاضر",
      settings: "الفئات وقواعد المدرسة",
    },

    // Statuses
    status: {
      requested: "قيد المراجعة والاعتماد",
      approved: "مؤكد ومجدول",
      rescheduled: "تم اقتراح موعد بديل",
      declined: "معتذر عنه / مرفوض",
      checked_in: "تم تسجيل الدخول بالاستقبال",
      completed: "مكتمل وتم تدوين المحضر",
      cancelled: "ملغى",
      no_show: "لم يحضر / غائب",
    },

    // Formats
    format: {
      in_person: "حضوري (بالحرم المدرسي)",
      online: "لقاء افتراضي (عبر الإنترنت)",
    },

    // Categories
    categories: {
      parent_teacher: "مؤتمر ولي الأمر والمعلم",
      principal_meeting: "مقابلة الإدارة التنفيذية",
      academic_support: "دعم أكاديمي وإرشاد دراسي",
      admission_interview: "مقابلة واختبار القبول والتسجيل",
      counseling_session: "جلسة إرشاد نفسي واجتماعي (سرية)",
      finance_fees: "الرسوم والشؤون المالية",
      hr_recruitment: "الموارد البشرية والتوظيف",
      walk_in: "طلب مباشر من الاستقبال",
    },

    // Quick stats
    stats: {
      todayAppointments: "مواعيد اليوم",
      pendingReview: "طلبات تنتظر الاعتماد",
      confirmedUpcoming: "مواعيد مؤكدة قادمة",
      visitorArrivals: "زوار تم استقبالهم",
      totalCompleted: "اجتماعات مكتملة",
      availabilityRatio: "نسبة إشغال الفترات",
    },

    // Common labels
    labels: {
      all: "الكل",
      searchPlaceholder: "البحث باسم الطالب، ولي الأمر، المعلم أو رقم المرجع...",
      filterByStatus: "تصفية بالحالة",
      filterByCategory: "تصفية بالفئة",
      filterByFormat: "نوع المقابلة",
      date: "التاريخ",
      time: "الوقت",
      requester: "مقدم الطلب",
      attendees: "المشاركون",
      locationOrLink: "المكان / رابط اللقاء",
      actions: "الإجراءات",
      reference: "رقم المرجع",
      student: "الطالب المعني",
      agenda: "موضوع المقابلة",
      notes: "الملاحظات",
      outcome: "مخرجات وقرارات المقابلة",
      confidentialNotes: "ملاحظات الإرشاد السرية (محمية)",
      visitorPass: "رمز تصريح الزائر",
      auditTrail: "سجل التدقيق والتغييرات",
      totalAppointments: "إجمالي المواعيد",
      pendingReview: "طلبات بالانتظار",
      todayUpcoming: "جدول اليوم",
      completedTerm: "مقابلات مكتملة",
      checkInTime: "وقت تسجيل الوصول",
      availableSlots: "الفترات المتاحة",
      workingDays: "أيام الدوام: الأحد إلى الخميس (٠٧:٣٠ ص – ٠٢:٣٠ ظ)",
      exportSchedule: "تصدير الجدول (PDF)",
      quickBook: "جدولة موعد",
    },

    // Actions
    actions: {
      bookNow: "جدولة موعد جديد",
      approve: "الموافقة والاعتماد",
      decline: "رفض الطلب",
      proposeTime: "اقتراح موعد بديل",
      checkIn: "تسجيل وصول الزائر",
      printPass: "طباعة تصريح الدخول",
      recordOutcome: "تدوين مخرجات المقابلة",
      viewDetails: "عرض التفاصيل",
      cancel: "إلغاء الموعد",
      confirm: "تأكيد",
      close: "إغلاق",
      submit: "إرسال طلب الحجز",
      saveChanges: "حفظ فترات التوفر",
    },

    // Booking Wizard
    booking: {
      title: "حجز موعد ومقابلة مدرسية",
      subtitle: "حدد الموظف أو المعلم، نوع اللقاء، الطالب والفترة الزمنية المناسبة",
      step1: "١. تحديد فئة المقابلة والقسم",
      step2: "٢. اختيار الموظف أو المعلم",
      step3: "٣. اختيار التاريخ والفترة المتاحة",
      step4: "٤. تحديد الطالب ونوع الحضور",
      step5: "٥. موضوع المقابلة والملاحظات",
      selectChild: "الطالب المعني باللقاء",
      childRequired: "اختر الابن / الطالب الذي يخصه هذا اللقاء",
      noChildNeeded: "استفسار عام / غير مرتبط بطالب محدد",
      inPersonDesc: "المقابلة في حرم مدرسة إي بي إس عُمان، وسيتم إصدار تصريح زيارة عند بوابة الأمن.",
      onlineDesc: "المقابلة عن بُعد عبر رابط معتمد وآمن على Google Meet أو Microsoft Teams.",
      selectDate: "اختر التاريخ (الأحد إلى الخميس فقط)",
      selectTime: "اختر الفترة المتاحة",
      subject: "موضوع المقابلة",
      subjectPlaceholder: "مثال: مراجعة درجات اختبار الرياضيات للفصل الأول",
      meetingNotes: "محاور النقاش والملاحظات",
      agendaPlaceholder: "يرجى كتابة نبذة عن النقاط المطلوب مناقشتها...",
      successTitle: "تم إرسال طلب حجز الموعد بنجاح!",
      successMessage: "تم تسجيل طلبك في النظام، وستصلك رسالة نصية وبريد إلكتروني بمجرد مراجعته من الإدارة.",
      referenceNumber: "رقم مرجع الحجز",
    },

    // Receptionist
    reception: {
      deskTitle: "محطة استقبال وتسجيل وصول الزوار",
      deskSubtitle: "التحقق من المواعيد المسبقة، طباعة تصاريح الزيارة الأمنية ومراقبة تواجد الزوار بالحرم المدرسي.",
      searchVisitor: "امسح التصريح أو اكتب اسم ولي الأمر أو الزائر...",
      checkInSuccess: "تم تسجيل وصول الزائر وتفعيل تصريح الدخول الأمني بنجاح.",
      passModalTitle: "تصريح دخول زائر — مدرسة إي بي إس عُمان",
      validFor: "صالح لـ: هذا اليوم فقط",
      instructions: "يرجى ارتداء هذا التصريح بشكل واضح أثناء التواجد بالحرم المدرسي وإعادته لمكتب الأمن عند المغادرة.",
    },

    // Availability Calendar
    availability: {
      title: "إعدادات فترات توفر الكادر وساعات العمل",
      subtitle: "تحديد أيام الدوام الأسبوعية، فترات الاستقبال، مدة كل موعد وأيام العطلات الرسمية.",
      slotDuration: "مدة الفترة (بالدقائق)",
      dailyMax: "الحد الأقصى للمواعيد يومياً",
      activeDays: "أيام الدوام النشطة",
      blackoutTitle: "الإجازات الرسمية وفترات التعطيل",
      omanNationalDay: "العيد الوطني العُماني (١٨ - ١٩ نوفمبر)",
      termBreak: "إجازة منتصف الفصل الدراسي",
    }
  }
};
