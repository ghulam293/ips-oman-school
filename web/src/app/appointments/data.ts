export type UserRole = 
  | 'admin'
  | 'principal'
  | 'parent'
  | 'teacher'
  | 'student'
  | 'admission'
  | 'receptionist'
  | 'counselor'
  | 'finance'
  | 'hr';

export type AppointmentStatus = 
  | 'requested'
  | 'approved'
  | 'rescheduled'
  | 'declined'
  | 'checked_in'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type MeetingFormat = 'in_person' | 'online';

export type MeetingCategory = 
  | 'parent_teacher'
  | 'principal_meeting'
  | 'academic_support'
  | 'admission_interview'
  | 'counseling_session'
  | 'finance_fees'
  | 'hr_recruitment'
  | 'walk_in';

export interface AuditLog {
  timestamp: string;
  action: string;
  actionAr?: string;
  by: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  title: string;
  titleAr?: string;
  category: MeetingCategory;
  format: MeetingFormat;
  roomOrLink: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM - 10:00 AM"
  durationMinutes: number;
  status: AppointmentStatus;
  
  // Requester
  requesterRole: UserRole;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  
  // Target
  targetStaffRole: UserRole;
  targetStaffName: string;
  targetStaffDepartment: string;

  // Student linkage (if applicable)
  studentId?: string;
  studentName?: string;
  studentGrade?: string;

  notes: string;
  outcomeNotes?: string;
  confidentialNotes?: string;
  proposedTime?: string;
  declineReason?: string;
  
  // Reception check-in
  visitorPassCode?: string;
  checkedInTime?: string;
  
  history: AuditLog[];
}

export interface StaffAvailability {
  staffId: string;
  staffName: string;
  staffNameAr: string;
  role: UserRole;
  department: string;
  departmentAr: string;
  workDays: string[]; // ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
  dayStartTime: string;
  dayEndTime: string;
  slotDurationMinutes: number;
  blackoutDates: string[];
  maxDailySlots: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timeAgo: string;
  read: boolean;
  appointmentId?: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface UserProfile {
  id: string;
  name: string;
  nameAr: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  badge: string;
  children?: { id: string; name: string; nameAr: string; grade: string }[];
  designation: string;
  designationAr: string;
  department: string;
  departmentAr: string;
}

export const USER_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    id: 'usr_admin',
    name: 'Tariq Al-Harthy',
    nameAr: 'طارق الحارثي',
    role: 'admin',
    email: 'admin.ops@ips-oman.edu.om',
    phone: '+968 9123 4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badge: 'Operations Director',
    designation: 'Director of IT & School Operations',
    designationAr: 'مدير العمليات وتقنية المعلومات',
    department: 'School Administration & IT',
    departmentAr: 'الإدارة المدرسية وتقنية المعلومات'
  },
  principal: {
    id: 'usr_principal',
    name: 'Dr. Salim Al-Maskari',
    nameAr: 'د. سالم المسكري',
    role: 'principal',
    email: 'principal@ips-oman.edu.om',
    phone: '+968 9234 5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Head of School',
    designation: 'Head of School & Principal',
    designationAr: 'المدير التنفيذي ومدير المدرسة',
    department: 'Executive Leadership Office',
    departmentAr: 'مكتب القيادة التنفيذية'
  },
  parent: {
    id: 'usr_parent',
    name: 'Aisha Al-Busaidi',
    nameAr: 'عائشة البوسعيدية',
    role: 'parent',
    email: 'aisha.busaidi@gmail.com',
    phone: '+968 9345 6789',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Authorized Guardian',
    designation: 'Parent / Guardian',
    designationAr: 'ولي أمر / وصي',
    department: 'Parents Community',
    departmentAr: 'مجلس أولياء الأمور',
    children: [
      { id: 'std_tariq', name: 'Tariq Al-Busaidi', nameAr: 'طارق البوسعيدي', grade: 'Grade 9-A' },
      { id: 'std_maya', name: 'Maya Al-Busaidi', nameAr: 'مايا البوسعيدية', grade: 'Grade 5-B' }
    ]
  },
  teacher: {
    id: 'usr_teacher',
    name: 'Mr. John Edwards',
    nameAr: 'أ. جون إدواردز',
    role: 'teacher',
    email: 'j.edwards@ips-oman.edu.om',
    phone: '+968 9456 7890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: 'Head of Science',
    designation: 'Head of Science & Grade 9 Advisor',
    designationAr: 'رئيس قسم العلوم ومربي الصف التاسع',
    department: 'Science & Physics Department',
    departmentAr: 'قسم العلوم والفيزياء'
  },
  student: {
    id: 'usr_student',
    name: 'Tariq Al-Busaidi',
    nameAr: 'طارق البوسعيدي',
    role: 'student',
    email: 'tariq.std@ips-oman.edu.om',
    phone: '+968 9567 8901',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    badge: 'Student #2026-88',
    designation: 'Grade 9-A Secondary Student',
    designationAr: 'طالب بالصف التاسع أ',
    department: 'Secondary School',
    departmentAr: 'المرحلة الثانوية'
  },
  admission: {
    id: 'usr_admission',
    name: 'Fatima Al-Balushi',
    nameAr: 'فاطمة البلوشية',
    role: 'admission',
    email: 'admissions@ips-oman.edu.om',
    phone: '+968 9678 9012',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Admissions Officer',
    designation: 'Senior Admissions & Enrollment Officer',
    designationAr: 'مسؤولة القبول والتسجيل الأولى',
    department: 'Enrollment & Family Relations',
    departmentAr: 'القبول والتسجيل وعلاقات الأسر'
  },
  receptionist: {
    id: 'usr_reception',
    name: 'Noor Al-Hinai',
    nameAr: 'نور الهنائية',
    role: 'receptionist',
    email: 'reception@ips-oman.edu.om',
    phone: '+968 2451 9001',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badge: 'Reception Desk',
    designation: 'Front Desk & Visitor Coordinator',
    designationAr: 'منسقة الاستقبال ومكتب الزوار',
    department: 'Campus Security & Front Office',
    departmentAr: 'الأمن المدرسي والاستقبال'
  },
  counselor: {
    id: 'usr_counselor',
    name: 'Dr. Huda Al-Lawati',
    nameAr: 'د. هدى اللواتية',
    role: 'counselor',
    email: 'counseling@ips-oman.edu.om',
    phone: '+968 9789 0123',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badge: 'Student Counselor',
    designation: 'Lead Student Well-Being Counselor',
    designationAr: 'رئيسة قسم الإرشاد النفسي والتربوي',
    department: 'Student Care & Counseling',
    departmentAr: 'الرعاية الطلابية والإرشاد'
  },
  finance: {
    id: 'usr_finance',
    name: 'Tariq Al-Riyami',
    nameAr: 'طارق الريامي',
    role: 'finance',
    email: 'bursar@ips-oman.edu.om',
    phone: '+968 9890 1234',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    badge: 'Bursar & Finance',
    designation: 'School Bursar & Finance Manager',
    designationAr: 'المحاسب العام والمدير المالي',
    department: 'Accounts & Tuition Fees',
    departmentAr: 'الحسابات والرسوم الدراسية'
  },
  hr: {
    id: 'usr_hr',
    name: 'Samira Al-Habsi',
    nameAr: 'سميرة الحبسية',
    role: 'hr',
    email: 'hr@ips-oman.edu.om',
    phone: '+968 9901 2345',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    badge: 'HR Specialist',
    designation: 'Human Resources & Talent Acquisition Specialist',
    designationAr: 'أخصائية الموارد البشرية واستقطاب الكفاءات',
    department: 'Human Capital & Faculty Relations',
    departmentAr: 'الموارد البشرية وشؤون الموظفين'
  }
};

export const STAFF_DIRECTORY = [
  { id: 'stf_edwards', name: 'Mr. John Edwards', nameAr: 'أ. جون إدواردز', role: 'teacher' as const, department: 'Science & Physics', departmentAr: 'العلوم والفيزياء', room: 'Lab B-204' },
  { id: 'stf_mona', name: 'Ms. Mona Al-Shehhi', nameAr: 'أ. منى الشحية', role: 'teacher' as const, department: 'Mathematics Department', departmentAr: 'قسم الرياضيات', room: 'Room 108' },
  { id: 'stf_khalid', name: 'Mr. Khalid Al-Amri', nameAr: 'أ. خالد العامري', role: 'teacher' as const, department: 'Arabic & Islamic Studies', departmentAr: 'اللغة العربية والتربية الإسلامية', room: 'Hall 12' },
  { id: 'stf_salim', name: 'Dr. Salim Al-Maskari', nameAr: 'د. سالم المسكري', role: 'principal' as const, department: 'Executive Leadership', departmentAr: 'مكتب المدير التنفيذي', room: 'Principal Suite' },
  { id: 'stf_fatima', name: 'Fatima Al-Balushi', nameAr: 'فاطمة البلوشية', role: 'admission' as const, department: 'Admissions & Enrollment', departmentAr: 'القبول والتسجيل', room: 'Admissions Desk 1' },
  { id: 'stf_huda', name: 'Dr. Huda Al-Lawati', nameAr: 'د. هدى اللواتية', role: 'counselor' as const, department: 'Student Well-being & Guidance', departmentAr: 'الإرشاد والتوجيه النفسي', room: 'Wellness Room 2' },
  { id: 'stf_riyami', name: 'Tariq Al-Riyami', nameAr: 'طارق الريامي', role: 'finance' as const, department: 'Accounts & Tuition Fees', departmentAr: 'المالية والحسابات', room: 'Finance Office 4' },
  { id: 'stf_samira', name: 'Samira Al-Habsi', nameAr: 'سميرة الحبسية', role: 'hr' as const, department: 'Human Capital & Faculty Relations', departmentAr: 'الموارد البشرية', room: 'HR Suite 101' },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'IPS-2026-8941',
    title: 'Grade 9 Science Progress & Term 1 Revision',
    titleAr: 'متابعة مستوى العلوم ومراجعة الفصل الأول للصف التاسع',
    category: 'parent_teacher',
    format: 'in_person',
    roomOrLink: 'Science Lab 3, Secondary Wing (Floor 1)',
    date: '2026-10-22',
    timeSlot: '08:30 AM - 09:00 AM',
    durationMinutes: 30,
    status: 'approved',
    requesterRole: 'parent',
    requesterName: 'Aisha Al-Busaidi',
    requesterEmail: 'aisha.busaidi@gmail.com',
    requesterPhone: '+968 9345 6789',
    targetStaffRole: 'teacher',
    targetStaffName: 'Mr. John Edwards',
    targetStaffDepartment: 'Science Department',
    studentId: 'std_tariq',
    studentName: 'Tariq Al-Busaidi',
    studentGrade: 'Grade 9-A',
    notes: 'Discussing Tariq’s recent lab practical scores and preparation for upcoming Cambridge IGCSE checkpoint exams.',
    visitorPassCode: 'PASS-7721',
    history: [
      { timestamp: '2026-10-18 10:14', action: 'Requested by Parent', actionAr: 'تم تقديم الطلب من قبل ولي الأمر', by: 'Aisha Al-Busaidi' },
      { timestamp: '2026-10-18 14:30', action: 'Confirmed by Teacher', actionAr: 'تم قبول الموعد وتأكيده', by: 'Mr. John Edwards', notes: 'Looking forward to meeting and sharing Tariq’s physics project notebook.' }
    ]
  },
  {
    id: 'IPS-2026-8942',
    title: 'Executive School Council & Gifted Student Initiative',
    titleAr: 'اجتماع مجلس المدرسة ومبادرة رعاية الطلاب الموهوبين',
    category: 'principal_meeting',
    format: 'in_person',
    roomOrLink: 'Principal Office, Administration Block',
    date: '2026-10-22',
    timeSlot: '11:00 AM - 11:30 AM',
    durationMinutes: 30,
    status: 'requested',
    requesterRole: 'parent',
    requesterName: 'Aisha Al-Busaidi',
    requesterEmail: 'aisha.busaidi@gmail.com',
    requesterPhone: '+968 9345 6789',
    targetStaffRole: 'principal',
    targetStaffName: 'Dr. Salim Al-Maskari',
    targetStaffDepartment: 'Executive Leadership',
    studentId: 'std_tariq',
    studentName: 'Tariq Al-Busaidi',
    studentGrade: 'Grade 9-A',
    notes: 'Request to present Parent Association suggestions on robotics competition funding and inter-school olympiads.',
    history: [
      { timestamp: '2026-10-19 09:20', action: 'Pending Principal Authorization', actionAr: 'بانتظار مراجعة واعتماد مدير المدرسة', by: 'Aisha Al-Busaidi' }
    ]
  },
  {
    id: 'IPS-2026-8943',
    title: 'Grade 1 Applicant Family Assessment & Campus Tour',
    titleAr: 'مقابلة تقييم تسجيل طالب جديد بالصف الأول وجولة بالحرم المدرسي',
    category: 'admission_interview',
    format: 'in_person',
    roomOrLink: 'Admissions Suite & Early Years Welcome Centre',
    date: '2026-10-21',
    timeSlot: '09:00 AM - 09:45 AM',
    durationMinutes: 45,
    status: 'checked_in',
    requesterRole: 'parent',
    requesterName: 'Hamad Al-Kharusi',
    requesterEmail: 'h.kharusi@omantel.net.om',
    requesterPhone: '+968 9111 2233',
    targetStaffRole: 'admission',
    targetStaffName: 'Fatima Al-Balushi',
    targetStaffDepartment: 'Admissions & Enrollment',
    studentName: 'Rashid Al-Kharusi',
    studentGrade: 'Grade 1 Applicant',
    notes: 'Family moving from Sohar. Need school readiness assessment and English phonics screening.',
    visitorPassCode: 'PASS-5510',
    checkedInTime: '08:48 AM',
    history: [
      { timestamp: '2026-10-15 11:00', action: 'Requested online via portal', actionAr: 'تم الحجز عبر البوابة', by: 'Hamad Al-Kharusi' },
      { timestamp: '2026-10-16 08:30', action: 'Approved with Welcome Pack', actionAr: 'تم اعتماد الموعد وإرسال ملف الترحيب', by: 'Fatima Al-Balushi' },
      { timestamp: '2026-10-21 08:48', action: 'Visitor Checked In at Main Reception', actionAr: 'تم تسجيل وصول الزائر بالاستقبال وطباعة التصريح', by: 'Noor Al-Hinai' }
    ]
  },
  {
    id: 'IPS-2026-8944',
    title: 'Confidential Guidance & High School Course Selection',
    titleAr: 'جلسة إرشاد وتوجيه سرية لاختيار مواد المرحلة الثانوية',
    category: 'counseling_session',
    format: 'in_person',
    roomOrLink: 'Counseling Room 2, Wellness Centre (Private Entrance)',
    date: '2026-10-23',
    timeSlot: '12:30 PM - 01:00 PM',
    durationMinutes: 30,
    status: 'approved',
    requesterRole: 'student',
    requesterName: 'Tariq Al-Busaidi',
    requesterEmail: 'tariq.std@ips-oman.edu.om',
    requesterPhone: '+968 9567 8901',
    targetStaffRole: 'counselor',
    targetStaffName: 'Dr. Huda Al-Lawati',
    targetStaffDepartment: 'Student Well-being & Guidance',
    studentId: 'std_tariq',
    studentName: 'Tariq Al-Busaidi',
    studentGrade: 'Grade 9-A',
    notes: 'Seeking guidance between Pure Science stream vs Business stream for Grade 10 subject choices.',
    confidentialNotes: 'Restricted access: Student shows strong aptitudes in numerical physics, but expresses anxiety over balancing course loads.',
    history: [
      { timestamp: '2026-10-19 13:00', action: 'Confidential request submitted', actionAr: 'تم تقديم طلب استشارة سرية', by: 'Tariq Al-Busaidi' },
      { timestamp: '2026-10-19 15:45', action: 'Approved by Counselor', actionAr: 'تم اعتماد الجلسة في غرفة الإرشاد الخاصة', by: 'Dr. Huda Al-Lawati' }
    ]
  },
  {
    id: 'IPS-2026-8945',
    title: 'Term 2 Fee Schedule & Sibling Discount Review',
    titleAr: 'جدول سداد رسوم الفصل الثاني ومراجعة خصم الأخوة',
    category: 'finance_fees',
    format: 'online',
    roomOrLink: 'https://meet.google.com/ips-finance-fee-992',
    date: '2026-10-22',
    timeSlot: '10:00 AM - 10:20 AM',
    durationMinutes: 20,
    status: 'approved',
    requesterRole: 'parent',
    requesterName: 'Aisha Al-Busaidi',
    requesterEmail: 'aisha.busaidi@gmail.com',
    requesterPhone: '+968 9345 6789',
    targetStaffRole: 'finance',
    targetStaffName: 'Tariq Al-Riyami',
    targetStaffDepartment: 'Accounts & Tuition Fees',
    notes: 'Inquiry regarding 3-part bank installment plan for secondary tuition and transport subscription.',
    history: [
      { timestamp: '2026-10-17 12:10', action: 'Requested virtual finance appointment', actionAr: 'طلب موعد مالي افتراضي', by: 'Aisha Al-Busaidi' },
      { timestamp: '2026-10-17 14:00', action: 'Approved with Google Meet Link', actionAr: 'تم التأكيد مع توفير رابط الاجتماع الافتراضي', by: 'Tariq Al-Riyami' }
    ]
  },
  {
    id: 'IPS-2026-8946',
    title: 'Senior IB DP Chemistry Faculty Interview',
    titleAr: 'مقابلة توظيف معلم كيمياء لبرنامج البكالوريا الدولية',
    category: 'hr_recruitment',
    format: 'online',
    roomOrLink: 'https://teams.microsoft.com/l/meetup-join/ips-recruitment-ib-chem',
    date: '2026-10-23',
    timeSlot: '01:30 PM - 02:15 PM',
    durationMinutes: 45,
    status: 'approved',
    requesterRole: 'hr',
    requesterName: 'Samira Al-Habsi',
    requesterEmail: 'hr@ips-oman.edu.om',
    requesterPhone: '+968 9901 2345',
    targetStaffRole: 'hr',
    targetStaffName: 'Candidate: Dr. Rachel Vance',
    targetStaffDepartment: 'Human Capital & Faculty Relations',
    notes: 'Technical panel interview covering IB DP internal assessments, lab safety protocols, and bilingual teaching experience.',
    history: [
      { timestamp: '2026-10-16 16:00', action: 'Recruitment screening slot booked', actionAr: 'تم حجز مقابلة التوظيف', by: 'Samira Al-Habsi' }
    ]
  },
  {
    id: 'IPS-2026-8947',
    title: 'Grade 5 Mathematics Support & Homework Strategies',
    titleAr: 'دعم الرياضيات للصف الخامس واستراتيجيات حل الواجبات',
    category: 'parent_teacher',
    format: 'in_person',
    roomOrLink: 'Primary Block, Room 108',
    date: '2026-10-19',
    timeSlot: '12:00 PM - 12:30 PM',
    durationMinutes: 30,
    status: 'completed',
    requesterRole: 'parent',
    requesterName: 'Aisha Al-Busaidi',
    requesterEmail: 'aisha.busaidi@gmail.com',
    requesterPhone: '+968 9345 6789',
    targetStaffRole: 'teacher',
    targetStaffName: 'Ms. Mona Al-Shehhi',
    targetStaffDepartment: 'Mathematics Department',
    studentId: 'std_maya',
    studentName: 'Maya Al-Busaidi',
    studentGrade: 'Grade 5-B',
    notes: 'Discussing Maya’s mastery of fraction multiplication and division.',
    outcomeNotes: 'Meeting completed successfully. Agreed on a 15-minute daily practice worksheet. Teacher shared interactive Khan Academy modules for home review.',
    history: [
      { timestamp: '2026-10-15 08:30', action: 'Requested by Parent', actionAr: 'تم الحجز', by: 'Aisha Al-Busaidi' },
      { timestamp: '2026-10-15 11:20', action: 'Approved by Teacher', actionAr: 'تم الاعتماد', by: 'Ms. Mona Al-Shehhi' },
      { timestamp: '2026-10-19 12:02', action: 'Visitor Checked In', actionAr: 'تسجيل الحضور', by: 'Noor Al-Hinai' },
      { timestamp: '2026-10-19 12:32', action: 'Meeting Completed & Minutes Logged', actionAr: 'اكتمل الاجتماع وتم توثيق المحضر', by: 'Ms. Mona Al-Shehhi' }
    ]
  },
  {
    id: 'IPS-2026-8948',
    title: 'Arabic Language Fluency & Quran Recitation Assessment',
    titleAr: 'تقييم الطلاقة في اللغة العربية وتلاوة القرآن الكريم',
    category: 'parent_teacher',
    format: 'in_person',
    roomOrLink: 'Islamic Studies Hall, Ground Floor',
    date: '2026-10-24',
    timeSlot: '09:30 AM - 10:00 AM',
    durationMinutes: 30,
    status: 'rescheduled',
    requesterRole: 'parent',
    requesterName: 'Aisha Al-Busaidi',
    requesterEmail: 'aisha.busaidi@gmail.com',
    requesterPhone: '+968 9345 6789',
    targetStaffRole: 'teacher',
    targetStaffName: 'Mr. Khalid Al-Amri',
    targetStaffDepartment: 'Arabic & Islamic Studies',
    studentId: 'std_tariq',
    studentName: 'Tariq Al-Busaidi',
    studentGrade: 'Grade 9-A',
    notes: 'Review of classical grammar rules and participation in inter-school Quran competition.',
    proposedTime: '2026-10-26 at 11:00 AM',
    history: [
      { timestamp: '2026-10-19 09:00', action: 'Requested for 24th Oct', actionAr: 'طلب موعد ليوم 24 أكتوبر', by: 'Aisha Al-Busaidi' },
      { timestamp: '2026-10-19 12:40', action: 'Staff Propose Reschedule', actionAr: 'اقترح المعلم موعداً بديلاً نظراً لاختبار وزاري', by: 'Mr. Khalid Al-Amri', notes: 'Ministry evaluation committee visiting on 24th. Proposing Monday 26th Oct at 11:00 AM.' }
    ]
  }
];

export const INITIAL_STAFF_AVAILABILITY: StaffAvailability[] = [
  {
    staffId: 'stf_edwards',
    staffName: 'Mr. John Edwards',
    staffNameAr: 'أ. جون إدواردز',
    role: 'teacher',
    department: 'Science & Physics',
    departmentAr: 'العلوم والفيزياء',
    workDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    dayStartTime: '08:00 AM',
    dayEndTime: '02:00 PM',
    slotDurationMinutes: 30,
    blackoutDates: ['2026-11-18', '2026-11-19'],
    maxDailySlots: 6
  },
  {
    staffId: 'stf_salim',
    staffName: 'Dr. Salim Al-Maskari',
    staffNameAr: 'د. سالم المسكري',
    role: 'principal',
    department: 'Executive Leadership',
    departmentAr: 'مكتب المدير التنفيذي',
    workDays: ['Sunday', 'Tuesday', 'Thursday'],
    dayStartTime: '10:00 AM',
    dayEndTime: '01:00 PM',
    slotDurationMinutes: 30,
    blackoutDates: ['2026-10-25'],
    maxDailySlots: 4
  },
  {
    staffId: 'stf_fatima',
    staffName: 'Fatima Al-Balushi',
    staffNameAr: 'فاطمة البلوشية',
    role: 'admission',
    department: 'Admissions & Enrollment',
    departmentAr: 'القبول والتسجيل',
    workDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    dayStartTime: '08:30 AM',
    dayEndTime: '01:30 PM',
    slotDurationMinutes: 45,
    blackoutDates: [],
    maxDailySlots: 8
  },
  {
    staffId: 'stf_huda',
    staffName: 'Dr. Huda Al-Lawati',
    staffNameAr: 'د. هدى اللواتية',
    role: 'counselor',
    department: 'Student Well-being & Guidance',
    departmentAr: 'الإرشاد والتوجيه النفسي',
    workDays: ['Sunday', 'Monday', 'Wednesday', 'Thursday'],
    dayStartTime: '09:00 AM',
    dayEndTime: '01:30 PM',
    slotDurationMinutes: 30,
    blackoutDates: [],
    maxDailySlots: 6
  },
  {
    staffId: 'stf_riyami',
    staffName: 'Tariq Al-Riyami',
    staffNameAr: 'طارق الريامي',
    role: 'finance',
    department: 'Accounts & Tuition Fees',
    departmentAr: 'المالية والحسابات',
    workDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    dayStartTime: '08:00 AM',
    dayEndTime: '02:00 PM',
    slotDurationMinutes: 20,
    blackoutDates: [],
    maxDailySlots: 10
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Appointment Approved',
    titleAr: 'تمت الموافقة على الموعد',
    message: 'Mr. John Edwards confirmed Grade 9 Science meeting for 22 Oct at 08:30 AM.',
    messageAr: 'أكد الأستاذ جون إدواردز لقاء علوم الصف التاسع في 22 أكتوبر الساعة 08:30 صباحاً.',
    timeAgo: '15 mins ago',
    read: false,
    type: 'success',
    appointmentId: 'IPS-2026-8941'
  },
  {
    id: 'notif_2',
    title: 'Visitor Arrived at Reception',
    titleAr: 'وصول زائر بمكتب الاستقبال',
    message: 'Hamad Al-Kharusi has arrived for Admission Assessment. Pass #PASS-5510 issued.',
    messageAr: 'وصل ولي الأمر حمد الخروصي لمقابلة القبول. تم إصدار تصريح رقم PASS-5510.',
    timeAgo: '42 mins ago',
    read: false,
    type: 'info',
    appointmentId: 'IPS-2026-8943'
  },
  {
    id: 'notif_3',
    title: 'Reschedule Requested',
    titleAr: 'طلب إعادة جدولة',
    message: 'Mr. Khalid Al-Amri proposed Monday 26 Oct 11:00 AM for Arabic assessment.',
    messageAr: 'اقترح الأستاذ خالد العامري موعداً بديلاً: الاثنين 26 أكتوبر 11:00 صباحاً.',
    timeAgo: '2 hours ago',
    read: true,
    type: 'warning',
    appointmentId: 'IPS-2026-8948'
  }
];
