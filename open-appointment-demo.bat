@echo off
title IPS Oman - School Appointment Management App
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"
echo ================================================================
echo   IPS OMAN - SCHOOL APPOINTMENT MANAGEMENT APP (STANDALONE DEMO)
echo ================================================================
echo   10 User Roles - Booking - Availability - Visitor Desk
echo ================================================================
echo.
echo   [1] Local PC URL:      http://localhost:3000/appointments
echo   [2] Other Devices LAN: http://192.168.1.8:3000/appointments
echo   [3] Public Share Link: https://ips-oman-demo.loca.lt/appointments
echo.
echo ================================================================
echo   Opening browser directly to School Appointment App...
echo ================================================================
start http://localhost:3000/appointments
npm run start
pause
