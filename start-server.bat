@echo off
title IPS Oman School Platform & Appointments Server
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"
echo ================================================================
echo   IPS OMAN SCHOOL PLATFORM & APPOINTMENT APP DEMO SERVER
echo ================================================================
echo   [1] Local PC - Appointments: http://localhost:3000/appointments
echo   [2] Local PC - Main Portal:  http://localhost:3000
echo   [3] Other Network Devices:   http://192.168.1.8:3000/appointments
echo ================================================================
echo   Starting Next.js Server...
npm run dev
pause
