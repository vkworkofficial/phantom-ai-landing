<#
.SYNOPSIS
    Phantom Labs automated backup script.
    Creates timestamped zip snapshots of the project, excluding build artifacts.
.DESCRIPTION
    - Excludes: node_modules, .next, venv_new, backups/, .vercel/output
    - Rotates old backups (keeps last 10)
    - Logs operations to backups/backup_log.txt
#>

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$ProjectRoot\package.json")) {
    $ProjectRoot = (Get-Location).Path
}

$BackupDir = Join-Path $ProjectRoot "backups"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupName = "phantom_backup_$Timestamp.zip"
$BackupPath = Join-Path $BackupDir $BackupName
$LogFile = Join-Path $BackupDir "backup_log.txt"

# Ensure backup directory exists
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

function Write-Log {
    param([string]$Message)
    $entry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message"
    Write-Host $entry
    Add-Content -Path $LogFile -Value $entry
}

Write-Log "=== PHANTOM BACKUP INITIATED ==="
Write-Log "Project root: $ProjectRoot"
Write-Log "Target: $BackupPath"

# Create a temporary directory with filtered contents
$TempDir = Join-Path $env:TEMP "phantom_backup_$Timestamp"
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }

Write-Log "Staging files (excluding build artifacts)..."

# Use robocopy to mirror with exclusions
$ExcludeDirs = @("node_modules", ".next", "venv_new", "venv", "backups", ".vercel", "__pycache__", ".git", "output")
$ExcludeArgs = $ExcludeDirs | ForEach-Object { "/XD"; $_ }

robocopy $ProjectRoot $TempDir /MIR /NP /NJH /NJS @ExcludeArgs | Out-Null

Write-Log "Compressing to zip..."
Compress-Archive -Path "$TempDir\*" -DestinationPath $BackupPath -CompressionLevel Optimal

# Cleanup temp
Remove-Item $TempDir -Recurse -Force

$SizeMB = [math]::Round((Get-Item $BackupPath).Length / 1MB, 2)
Write-Log "Backup created: $BackupName ($SizeMB MB)"

# Rotate: Keep only the last 10 backups
$AllBackups = Get-ChildItem $BackupDir -Filter "phantom_backup_*.zip" | Sort-Object CreationTime -Descending
if ($AllBackups.Count -gt 10) {
    $ToDelete = $AllBackups | Select-Object -Skip 10
    foreach ($old in $ToDelete) {
        Remove-Item $old.FullName -Force
        Write-Log "Rotated out: $($old.Name)"
    }
}

$RemainingCount = (Get-ChildItem $BackupDir -Filter "phantom_backup_*.zip").Count
Write-Log "Backup complete. $RemainingCount snapshots retained."
Write-Log "=== BACKUP FINISHED ==="
