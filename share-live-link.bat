@echo off
title IPS Oman - Live Public Share Tunnel (Localtunnel)
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"
echo ================================================================
echo   IPS OMAN - LIVE PUBLIC SHARE TUNNEL FOR OTHER COMPUTERS
echo ================================================================
echo   This generates a secure public HTTPS link that works from
echo   ANY computer, phone, or tablet anywhere in the world!
echo ================================================================
echo   Public URL: https://ips-oman-demo.loca.lt/appointments
echo ================================================================
cmd /c "lt --port 3000 --subdomain ips-oman-demo"
pause
