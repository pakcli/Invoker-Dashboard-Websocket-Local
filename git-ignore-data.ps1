# git-ignore-data.ps1
# This script untracks the 'data/' folder from Git while keeping the local files on disk.

Write-Host "==================================================="
Write-Host "  UNTRACK DATA DIRECTORY FROM GIT (KEEP ON DISK)"
Write-Host "==================================================="

# Set working directory to the directory containing this script
Set-Location $PSScriptRoot

# 1. Check if git repository exists
if (-not (Test-Path ".git")) {
    Write-Error "Not a git repository!"
    Exit
}

# 2. Add data/ to .gitignore if not already present
Write-Host "Checking .gitignore..."
$gitignorePath = ".gitignore"
$ignored = $false

if (Test-Path $gitignorePath) {
    $content = Get-Content $gitignorePath
    foreach ($line in $content) {
        if ($line.Trim() -eq "data" -or $line.Trim() -eq "data/") {
            $ignored = $true
            break
        }
    }
}

if (-not $ignored) {
    Write-Host "Adding 'data/' to .gitignore..."
    Add-Content -Path $gitignorePath -Value "`ndata/"
} else {
    Write-Host "'data/' is already in .gitignore."
}

# 3. Untrack data folder in Git cache
Write-Host "Untracking data/ folder from Git index (this keeps files on disk)..."
git rm -r --cached data

# 4. Display status
Write-Host "`nSuccessfully untracked data/ from Git!"
Write-Host "You can now commit this change with:"
Write-Host "  git commit -m 'chore: stop tracking data folder'"
Write-Host "And then push the changes to remote."
