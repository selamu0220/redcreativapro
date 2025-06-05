# Script para corregir todas las rutas problemáticas de utils en archivos UI

# Obtener todos los archivos TypeScript en el directorio app/ui
$files = Get-ChildItem -Path "app\ui" -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.Name -ne "globals.css" }

Write-Host "Corrigiendo rutas de utils en archivos UI..."

$totalFixed = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Corregir la ruta problemática específica
    $content = $content -replace "from '../../../../../../../../../lib/utils'", "from '../lib/utils'"
    $content = $content -replace 'from "../../../../../../../../../lib/utils"', 'from "../lib/utils"'
    
    if ($content -ne $originalContent) {
        $content | Set-Content -Path $file.FullName -NoNewline
        Write-Host "Corregido: $($file.FullName)"
        $totalFixed++
    }
}

Write-Host "Corrección completada."
Write-Host "Archivos corregidos: $totalFixed"
Write-Host "Archivos procesados: $($files.Count)"