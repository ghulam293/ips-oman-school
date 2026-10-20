@echo off
title IPS Oman School Platform - Live Public Share Tunnel
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"
echo ================================================================
echo   IPS OMAN SCHOOL PLATFORM - LIVE PUBLIC SHARE TUNNEL
echo ================================================================
echo   Generating a secure public HTTPS link for other computers...
echo ================================================================
cmd /c "lt --port 3000 --subdomain ips-oman-demo"
pause
