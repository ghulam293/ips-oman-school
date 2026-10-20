@echo off
title Push IPS Oman School Platform to GitHub
cd /d "C:\Users\Ghulam Hussain\.gemini\antigravity\scratch\school-platform"
echo ================================================================
echo   PUSHING TO GITHUB: ghulam293/ips-oman-school
echo ================================================================
echo.
echo 1. Ensure you created the repository on GitHub:
echo    https://github.com/new
echo    Repository Name: ips-oman-school (Public or Private)
echo.
echo 2. Pushing your code to main branch...
echo.
git push -u origin main
echo.
echo If it succeeded, connect this repository to Vercel at:
echo https://vercel.com/new
echo ================================================================
pause
