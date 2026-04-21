@echo off
echo Starting FaceApp Authentication System...
echo.
echo Starting Backend Server...
start cmd /k "cd Backend && npm run dev"
echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3
echo.
echo Starting Frontend Server...
start cmd /k "cd Frontend && npm run dev"
echo.
echo Both servers are starting!
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Opening browser in 5 seconds...
timeout /t 5
start http://localhost:5173
echo.
echo Done! Check your browser.
pause
