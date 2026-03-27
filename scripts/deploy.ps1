<#
.SYNOPSIS
    Phantom Labs deployment script.
    Pre-flight checks -> Git commit -> Push -> Vercel deploy.
.DESCRIPTION
    One-command deployment with safety checks.
#>

$ErrorActionPreference = "Stop"

$ProjectRoot = (Get-Location).Path

Write-Host ""
Write-Host "  ========================================" -ForegroundColor DarkGray
Write-Host "   PHANTOM LABS // DEPLOY PROTOCOL" -ForegroundColor Cyan
Write-Host "  ========================================" -ForegroundColor DarkGray
Write-Host ""

# Pre-flight check 1: No .env files staged
Write-Host "[1/5] Checking for exposed secrets..." -ForegroundColor Yellow
$StagedEnv = git diff --cached --name-only | Select-String -Pattern "\.env"
if ($StagedEnv) {
    Write-Host "  ABORT: .env file detected in staged changes!" -ForegroundColor Red
    Write-Host "  Run: git reset HEAD <file>" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ No secrets exposed" -ForegroundColor Green

# Pre-flight check 2: Dashboard builds
Write-Host "[2/5] Building dashboard..." -ForegroundColor Yellow
$buildResult = npm run build --workspace=@phantom-labs/dashboard 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ABORT: Dashboard build failed!" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Dashboard build passed" -ForegroundColor Green

# Pre-flight check 3: Stage all changes
Write-Host "[3/5] Staging changes..." -ForegroundColor Yellow
git add -A
$status = git status --porcelain
if (-not $status) {
    Write-Host "  No changes to commit. Skipping deploy." -ForegroundColor DarkGray
    exit 0
}
Write-Host "  ✓ Changes staged" -ForegroundColor Green

# Commit
Write-Host "[4/5] Committing..." -ForegroundColor Yellow
$commitMsg = Read-Host "  Commit message (or press Enter for auto)"
if (-not $commitMsg) {
    $commitMsg = "chore: automated deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}
git commit -m $commitMsg
Write-Host "  ✓ Committed" -ForegroundColor Green

# Push
Write-Host "[5/5] Pushing to origin/main..." -ForegroundColor Yellow
git push origin main
Write-Host "  ✓ Pushed to GitHub" -ForegroundColor Green

Write-Host ""
Write-Host "  ========================================" -ForegroundColor DarkGray
Write-Host "   DEPLOY COMPLETE" -ForegroundColor Green
Write-Host "   CI/CD will auto-deploy to Vercel." -ForegroundColor DarkGray
Write-Host "  ========================================" -ForegroundColor DarkGray
Write-Host ""
