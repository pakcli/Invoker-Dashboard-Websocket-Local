Write-Host "==================================================="
Write-Host "  THE ARCH-MAGE PORTFOLIO DASHBOARD START SCRIPT"
Write-Host "==================================================="

# Set working directory to the directory containing this script
Set-Location $PSScriptRoot

# 1. Setup Python Virtual Environment
Write-Host "[1/5] Checking Python virtual environment..."
if (-not (Test-Path ".venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv .venv
}

# Dot-source the PowerShell activation script for the virtual environment
. .venv\Scripts\Activate.ps1

# 2. Install Python Dependencies
Write-Host "[2/5] Installing backend dependencies..."
pip install -r backend/requirements.txt

# 3. Generate Mock Data
Write-Host "[3/5] Seeding mock database entries..."
python backend/create_mock_data.py

# 4. Build Frontend Assets
Write-Host "[4/5] Preparing frontend distribution..."
Push-Location frontend
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing node dependencies..."
    npm install
}
Write-Host "Building React application..."
npm run build
Pop-Location

# 5. Launch Backend Server
Write-Host "[5/5] Starting HTTPS portfolio server..."
python backend/server.py

Read-Host -Prompt "Press Enter to exit..."
