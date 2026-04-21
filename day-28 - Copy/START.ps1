# FaceApp Authentication System - PowerShell Startup Script

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   FaceApp Authentication System" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node and npm are installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
$nodeCheck = npm --version 2>$null
if (-not $nodeCheck) {
    Write-Host "ERROR: Node.js/npm not found in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit
}

Write-Host "✓ npm version: $nodeCheck" -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Write-Host "Running: cd Backend && npm run dev" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend ; npm run dev"

# Wait for backend to start
Write-Host "Waiting for backend to start (5 seconds)..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Write-Host "Running: cd Frontend && npm run dev" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend ; npm run dev"

# Wait for frontend to start
Write-Host "Waiting for frontend to start (5 seconds)..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Open browser
Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "   ✓ Both Servers Started!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow

Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✓ Done! Check your browser." -ForegroundColor Green
Write-Host "✓ Check these terminals for any errors." -ForegroundColor Green
Write-Host ""
Write-Host "To stop: Close both terminal windows or press Ctrl+C" -ForegroundColor Yellow
