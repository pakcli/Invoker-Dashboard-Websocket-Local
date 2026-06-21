@echo off
echo ===================================================
echo   THE ARCH-MAGE PORTFOLIO DASHBOARD START SCRIPT
echo ===================================================

cd /d "%~dp0"

:: 1. Setup Python Virtual Environment
echo [1/5] Checking Python virtual environment...
if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
)
call .venv\Scripts\activate

:: 2. Install Python Dependencies
echo [2/5] Installing backend dependencies...
pip install -r backend/requirements.txt

:: 3. Generate Mock Data
echo [3/5] Seeding mock database entries...
python backend/create_mock_data.py

:: 4. Build Frontend Assets
echo [4/5] Preparing frontend distribution...
cd frontend
if not exist node_modules (
    echo Installing node dependencies...
    call npm install
)
echo Building React application...
call npm run build
cd ..

:: 5. Launch Backend Server
echo [5/5] Starting HTTPS portfolio server...
python backend/server.py

pause
