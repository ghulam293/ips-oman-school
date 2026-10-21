@echo off
title IPS Oman - Zero Password Instant Public Share
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform\web"

cls
echo =========================================================================
echo       IPS OMAN - ZERO-PASSWORD INSTANT PUBLIC SHARE LINK
echo =========================================================================
echo   Generating an instant public HTTPS domain using built-in SSH...
echo   (No password prompt for the other computer)
echo =========================================================================
echo.
ssh -R 80:localhost:3000 nokey@localhost.run
pause
