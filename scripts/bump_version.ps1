param(
    [string]$TargetVersion = ""
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

$indexPath = Join-Path $projectRoot "index.html"
$indexContent = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Find current version
$vMatch = [regex]::Match($indexContent, 'id="app-version-indicator"[^>]*>v?([0-9.]+)<')
if (-not $vMatch.Success) {
    Write-Error "Could not locate app-version-indicator in $indexPath"
    exit 1
}

$currentVersionStr = $vMatch.Groups[1].Value
$currentVersion = [double]::Parse($currentVersionStr, [System.Globalization.CultureInfo]::InvariantCulture)

if ($TargetVersion) {
    $newVersionStr = $TargetVersion.Trim().TrimStart('v')
} else {
    $newVersionVal = [Math]::Round($currentVersion + 0.1, 1)
    $newVersionStr = $newVersionVal.ToString("0.0", [System.Globalization.CultureInfo]::InvariantCulture)
}

Write-Host "Bumping version from v$currentVersionStr to v$newVersionStr..." -ForegroundColor Cyan

# 1. Update index.html indicator
$indexContent = [regex]::Replace(
    $indexContent,
    '(<span[^>]*id="app-version-indicator"[^>]*>)v?[0-9.]+(</span>)',
    "`${1}v$newVersionStr`${2}"
)

# 2. Update index.html bundle.js cache-buster
$indexContent = [regex]::Replace($indexContent, 'bundle\.js\?v=[0-9.]+', "bundle.js?v=$newVersionStr")

[System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.Encoding]::UTF8)
Write-Host "  Updated index.html -> indicator: v$newVersionStr, script tag: bundle.js?v=$newVersionStr" -ForegroundColor Green

# 3. Update js/state/worldState.js
$statePath = Join-Path $projectRoot "js\state\worldState.js"
if (Test-Path $statePath) {
    $stateContent = [System.IO.File]::ReadAllText($statePath, [System.Text.Encoding]::UTF8)
    $stateContent = [regex]::Replace($stateContent, 'this\.version\s*=\s*[''"][0-9.]+[''"];', "this.version = '$newVersionStr';")
    [System.IO.File]::WriteAllText($statePath, $stateContent, [System.Text.Encoding]::UTF8)
    Write-Host "  Updated js/state/worldState.js -> this.version = '$newVersionStr'" -ForegroundColor Green
}

# 4. Rebuild bundle
$buildScript = Join-Path $scriptDir "build_bundle.ps1"
if (Test-Path $buildScript) {
    & powershell -ExecutionPolicy Bypass -File $buildScript
}

Write-Host "Version successfully bumped to v$newVersionStr!" -ForegroundColor Green
