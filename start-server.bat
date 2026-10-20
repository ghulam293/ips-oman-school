@echo off
title IPS Oman School Platform - Server
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"
echo ================================================================
echo   IPS OMAN SCHOOL PLATFORM - LOCAL & NETWORK DEMO SERVER
echo ================================================================
echo   [1] Local PC:      http://localhost:3000
echo   [2] Other Devices: http://192.168.1.8:3000 (same Wi-Fi / network)
echo ================================================================
npm run start
pause
