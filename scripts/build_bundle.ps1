# build_bundle.ps1 - Consolidated Application Bundle Builder
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$root = Join-Path $projectRoot "js"

function Get-CleanModule([string]$path) {
    $code = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $code = [regex]::Replace($code, '(?m)^\s*import\s+[^;]+;\s*\r?\n', '')
    $code = [regex]::Replace($code, '(?m)^\s*export\s+function\s+', 'function ')
    $code = [regex]::Replace($code, '(?m)^\s*export\s+class\s+', 'class ')
    $code = [regex]::Replace($code, '(?m)^\s*export\s+const\s+', 'const ')
    $code = [regex]::Replace($code, '(?m)^\s*export\s+default\s+', '')
    return $code.Trim()
}

$sb = New-Object System.Text.StringBuilder

[void]$sb.AppendLine("/**")
[void]$sb.AppendLine(" * The Bleeding Realms of Aetheria - Consolidated Application Bundle (Clean 5.5e)")
[void]$sb.AppendLine(" */")
[void]$sb.AppendLine("(function() {")
[void]$sb.AppendLine("  'use strict';")
[void]$sb.AppendLine("")

# 1. World Data
[void]$sb.AppendLine("  // 1. WORLD DATA")
$dataCode = Get-CleanModule "$root\data\worldData.js"
$dataCode = $dataCode -replace 'const worldData =', 'const INITIAL_WORLD_DATA ='
[void]$sb.AppendLine($dataCode)
[void]$sb.AppendLine("  const worldData = INITIAL_WORLD_DATA;")
[void]$sb.AppendLine("")

# 1.5. Supabase Client
[void]$sb.AppendLine("  // 1.5. SUPABASE CLIENT")
$sbCode = Get-CleanModule "$root\state\supabaseClient.js"
[void]$sb.AppendLine($sbCode)
[void]$sb.AppendLine("")

# 2. World State
[void]$sb.AppendLine("  // 2. WORLD STATE")
$stateCode = Get-CleanModule "$root\state\worldState.js"
[void]$sb.AppendLine($stateCode)
[void]$sb.AppendLine("")

# 3. Sound Engine
[void]$sb.AppendLine("  // 3. SOUND ENGINE")
$soundCode = Get-CleanModule "$root\audio\soundEngine.js"
[void]$sb.AppendLine($soundCode)
[void]$sb.AppendLine("")

# 4. Components
$views = @(
    "mapView.js",
    "characterView.js",
    "factionView.js",
    "bastionView.js",
    "lexiconView.js",
    "masteryView.js",
    "timelineView.js",
    "questView.js",
    "pantheonView.js",
    "editorView.js",
    "levelUpModal.js",
    "partyView.js",
    "playerHeroView.js",
    "characterCreateView.js",
    "combatView.js",
    "socialView.js",
    "diceRoller.js"
)

foreach ($v in $views) {
    [void]$sb.AppendLine("  // COMPONENT: $v")
    $cCode = Get-CleanModule "$root\components\$v"
    [void]$sb.AppendLine($cCode)
    [void]$sb.AppendLine("")
}

# Find version from index.html or worldState
$indexPath = Join-Path $projectRoot "index.html"
$indexHtml = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$vMatch = [regex]::Match($indexHtml, 'id="app-version-indicator"[^>]*>v?([0-9.]+)<')
$appVer = if ($vMatch.Success) { $vMatch.Groups[1].Value } else { "0.6" }

[void]$sb.AppendLine("  if (typeof window !== 'undefined') {")
[void]$sb.AppendLine("    window.APP_VERSION = '$appVer';")
[void]$sb.AppendLine("    window.renderMapView = renderMapView;")
[void]$sb.AppendLine("    window.renderCombatView = renderCombatView;")
[void]$sb.AppendLine("    window.renderCharacterCreateView = renderCharacterCreateView;")
[void]$sb.AppendLine("    window.openLevelUpModal = openLevelUpModal;")
[void]$sb.AppendLine("    window.DND_LEVEL_UP_DATA = DND_LEVEL_UP_DATA;")
[void]$sb.AppendLine("    window.supabaseDb = supabaseDb;")
[void]$sb.AppendLine("    window.worldState = worldState;")
[void]$sb.AppendLine("  }")

# Read and append initApp from brain script or template
$brainScript = "C:\Users\jdhmi\.gemini\antigravity\brain\887fd9bc-3093-4b26-ac48-09d200ed9454\scratch\build_clean_bundle.ps1"
$brainContent = [System.IO.File]::ReadAllText($brainScript, [System.Text.Encoding]::UTF8)
$initPart = $brainContent.Substring($brainContent.IndexOf('$initAppCode = @''') + 18)
$initPart = $initPart.Substring(0, $initPart.IndexOf('''@'))
[void]$sb.AppendLine($initPart)

$finalBundle = $sb.ToString()
[System.IO.File]::WriteAllText("$root\bundle.js", $finalBundle, [System.Text.Encoding]::UTF8)

Write-Output "Clean bundle written (v$appVer). Total length: $($finalBundle.Length)"
