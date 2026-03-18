# Phantom Backup Engine
# Version: 1.0.0 (Enterprise Ready)

$SourceDir = "e:\Data\Projects\Y Combinator\1"
$BackupRootDir = Join-Path $SourceDir "backups"
$StagingDir = Join-Path $BackupRootDir "staging"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFileName = "phantom_backup_$Timestamp.zip"
$BackupFilePath = Join-Path $BackupRootDir $BackupFileName
$LogFile = Join-Path $BackupRootDir "backup_log.txt"
$MaxBackups = 12

# 1. Initialization
if (!(Test-Path $BackupRootDir)) { New-Item -ItemType Directory -Path $BackupRootDir | Out-Null }
if (Test-Path $StagingDir) { Remove-Item -Recurse -Force $StagingDir }
New-Item -ItemType Directory -Path $StagingDir | Out-Null

Write-Host "[$(Get-Date)] Starting backup process..." -ForegroundColor Cyan

# 2. Sync to Staging with Exclusions (Robocopy is most efficient here)
# /MIR: Mirror (but we want a simple copy)
# /XD: Exclude Directories
# /XF: Exclude Files
$RobocopyArgs = @(
    $SourceDir,
    $StagingDir,
    "/E", "/R:0", "/W:0", "/NFL", "/NDL", "/NJH", "/NJS",
    "/XD", "node_modules", "venv", ".git", ".next", "backups", ".gemini", "__pycache__", ".vscode",
    "/XF", "*.log", ".DS_Store", "*.tmp"
)

# Run Robocopy and suppress output
robocopy @RobocopyArgs | Out-Null

# 3. Compress Staging
Write-Host "[$(Get-Date)] Compressing files..." -ForegroundColor Cyan
try {
    Compress-Archive -Path "$StagingDir\*" -DestinationPath $BackupFilePath -CompressionLevel Optimal -Force
    $BackupSize = (Get-Item $BackupFilePath).Length / 1MB
    $Status = "SUCCESS"
} catch {
    $Status = "FAILED: $_"
    $BackupSize = 0
}

# 4. Cleanup Staging
if (Test-Path $StagingDir) { Remove-Item -Recurse -Force $StagingDir }

# 5. Rotation Logic
$ExistingBackups = Get-ChildItem -Path $BackupRootDir -Filter "phantom_backup_*.zip" | Sort-Object CreationTime -Descending
if ($ExistingBackups.Count -gt $MaxBackups) {
    Write-Host "[$(Get-Date)] Rotating old backups..." -ForegroundColor Yellow
    $BackupsToDelete = $ExistingBackups | Select-Object -Skip $MaxBackups
    foreach ($OldBackup in $BackupsToDelete) {
        Remove-Item $OldBackup.FullName -Force
    }
}

# 6. Logging
$LogEntry = "[$(Get-Date)] STATUS: $Status | SIZE: $([Math]::Round($BackupSize, 2)) MB | FILE: $BackupFileName"
$LogEntry | Out-File -FilePath $LogFile -Append

$Color = if ($Status -eq "SUCCESS") { "Green" } else { "Red" }
Write-Host $LogEntry -ForegroundColor $Color
