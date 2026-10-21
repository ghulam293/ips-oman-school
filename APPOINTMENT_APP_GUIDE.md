# IPS Oman — School Appointment Management App
### Dedicated Official School Appointment & Family Engagement System

---

## 📌 1. Overview & Architecture
This application is a dedicated, separate component of the **IPS Oman School Management Platform** designed to simplify meeting arrangements between families, teachers, academic counselors, leadership, and administrative personnel.

- **Web Portal Route:** `/appointments`
- **Landing Selector Route:** `/`
- **Port:** `3000`
- **Local Address:** `http://localhost:3000/appointments`
- **LAN Address (Same Wi-Fi):** `http://192.168.1.8:3000/appointments`
- **Public Share Link (Any Computer):** `https://ips-oman-demo.loca.lt/appointments`

---

## 👥 2. 10 User Roles & Responsibilities

| Role | Responsibility in Demo | Key Actions Available |
|------|------------------------|-----------------------|
| **School Administrator** | Full platform governance, meeting category rules, school calendars, access permissions, and complete audit trail. | Configure categories, view all appointments, inspect audit trails, export schedules. |
| **Principal** | Review principal direct appointments, VIP visits, escalations, and executive calendar. | Approve/decline principal sessions, propose alternate times, view executive overview. |
| **Parent / Guardian** | Book, view, reschedule, or cancel meetings relating to authorized children (*Tariq - Gr 9* / *Maya - Gr 5*). | 5-step booking wizard, select child, choose in-person campus visit or online Google Meet. |
| **Teacher** | Publish availability slots, respond to requests, and document meeting outcome minutes. | View homeroom & subject bookings, approve/decline, enter meeting outcome minutes. |
| **Student** | Request permitted academic-support sessions, tutoring, and track status. | Request tutoring/subject support, view confirmed schedules. |
| **Admission Officer** | Schedule interviews, new applicant consultations, campus tours, and admission follow-ups. | Manage Grade 1 assessment bookings, campus tour appointments. |
| **Receptionist** | Front desk visitor arrivals, visitor security badge generation, and campus visitor tracking. | 1-click visitor check-in, search by badge/name, print security gate pass with barcode. |
| **School Counselor** | Confidential student guidance and well-being sessions with restricted notes. | Manage sensitive appointments with confidential notes guard. |
| **Finance Officer** | Appointments regarding tuition fees, payment installment plans, and discount inquiries. | Manage virtual/in-person billing appointments. |
| **HR Officer** | Faculty recruitment interviews and employee evaluation meetings. | Schedule IB DP teacher recruitment interviews with online Teams links. |

---

## 🌟 3. Key Implemented Features

1. **Role Switcher Pill:** One-click persona switching between all 10 roles directly from the header, complete with realistic staff profiles, avatars, and designations.
2. **Bilingual Support (English & Arabic RTL):** Instant toggle between English and Arabic with `dir="rtl"`, Arabic typography (`Noto Sans Arabic`), and complete translations across all tabs.
3. **5-Step Booking Wizard:**
   - Category & Department Selection
   - Staff Member Selection
   - Oman School Calendar Date (Sunday – Thursday only) & Time Slot
   - Authorized Child Selection (Tariq - Grade 9A / Maya - Grade 5B) & Format (Campus vs Online)
   - Meeting Agenda & Confirmation Reference (`IPS-2026-XXXX`)
4. **Staff Availability Calendar:**
   - Configurable slot durations (20, 30, 45 minutes)
   - Max daily appointment limits
   - Active school days (Sun–Thu)
   - Oman official holiday blackout dates (e.g. Oman National Day 18–19 Nov)
5. **Parent-Teacher Conference (PTC) Mode:**
   - Dedicated dashboard linking children directly to homeroom and subject teachers.
6. **Appointment Review & Decision Workflow:**
   - One-click Approve
   - Decline with specified reason
   - Propose Alternate Date & Time with automated audit log
7. **Reception Desk & Visitor Check-In Terminal:**
   - Real-time visitor log for physical visits
   - 1-click "Confirm Arrival & Check-In"
   - Printable IPS Oman Visitor Gate Pass badge with security barcode
8. **Meeting Outcome & Minutes:**
   - Staff record meeting minutes and agreed action plans, automatically archived into the appointment history.
9. **Interactive Notifications:**
   - Drawer with live SMS/email reminder simulations for parents and staff.

---

## 🚀 4. How to Run & Share with Another System

### Option A: Open on Another Computer on the Same Wi-Fi / LAN
1. Double-click `start-server.bat` in `school-platform`.
2. On any other computer, tablet, or phone connected to the same Wi-Fi, open:
   ```
   http://192.168.1.8:3000/appointments
   ```

### Option B: Share Worldwide via Live Public Link (Localtunnel)
1. Ensure `start-server.bat` is running.
2. Double-click `share-live-link.bat` in `school-platform`.
3. Open this link on **ANY computer, phone, or tablet anywhere in the world**:
   ```
   https://ips-oman-demo.loca.lt/appointments
   ```
   *(If prompted on the first visit, enter your public IP address shown in the tunnel window).*

### Option C: Deploy to Permanent 24/7 Cloud (Vercel)
1. Double-click `deploy-to-vercel.bat`.
2. Press Enter to accept defaults. Vercel will deploy and output your permanent live URL (e.g., `https://ips-oman-appointments.vercel.app`).
