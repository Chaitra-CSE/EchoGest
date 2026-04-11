@echo off
echo Starting Sign Language Communicator...

start cmd /k "cd backend && pip install -r requirements.txt && python app.py"

timeout /t 3

start cmd /k "cd frontend && npm install && npm run dev"

echo Server running at http://localhost:3000
echo Backend running at http://localhost:8000
pause