# Phantom Backup Service Orchestrator
# Runs the backup engine every 5 minutes

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$EngineScript = Join-Path $ScriptDir "backup_engine.ps1"

Write-Host "Phantom Backup Service Started." -ForegroundColor Green
Write-Host "Backup Interval: 300 seconds (5 minutes)" -ForegroundColor Gray
Write-Host "Press Ctrl+C to terminate the service.`n" -ForegroundColor Yellow

while ($true) {
    powershell.exe -ExecutionPolicy Bypass -File $EngineScript
    Write-Host "[$(Get-Date)] Next backup in 5 minutes..." -ForegroundColor Gray
    Start-Sleep -Seconds 300
}
