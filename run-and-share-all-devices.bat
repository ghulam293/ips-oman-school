@echo off
title IPS Oman School Appointments - Multi-Device Launcher
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"

cls
echo =========================================================================
echo       IPS OMAN - SCHOOL APPOINTMENT MANAGEMENT PLATFORM
echo =========================================================================
echo.
echo   [OPTION 1] SAME WI-FI / LOCAL NETWORK (No password needed):
echo   ------------------------------------------------------------
echo   Open this URL on any other laptop, tablet, or phone on your Wi-Fi:
echo   --> http://192.168.1.8:3000/appointments
echo.
echo   [OPTION 2] WORLDWIDE PUBLIC LINK (Open anywhere outside Wi-Fi):
echo   ------------------------------------------------------------
echo   --> https://ips-oman-demo.loca.lt/appointments
echo.
echo =========================================================================
echo   Starting Next.js Server on Port 3000...
start "IPS Server" cmd /k "title IPS Server && cd /d \"C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web\" && npm run start"

timeout /t 3 >nul

echo   Starting Public Live Tunnel...
start "IPS Public Tunnel" cmd /k "title IPS Live Tunnel && echo ===================================================== && echo Localtunnel Password (Public IP): && curl -s https://loca.lt/mytunnelpassword && echo. && echo ===================================================== && lt --port 3000 --subdomain ips-oman-demo"

timeout /t 2 >nul
echo   Opening Appointment Portal on your local PC...
start http://localhost:3000/appointments

echo.
echo =========================================================================
echo   ALL SERVICES STARTED!
echo   Keep the two small terminal windows open to allow other systems to connect.
echo =========================================================================
pause
