# Script para corregir importaciones incorrectas en archivos UI
$files = Get-ChildItem -Path "app\ui" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./lib/utils') {
        $newContent = $content -replace '\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./lib/utils', '../lib/utils'
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Completed fixing UI imports"