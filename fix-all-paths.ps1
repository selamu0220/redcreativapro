# Script completo para corregir todas las rutas problemáticas
$appPath = "app"

# Buscar todos los archivos .ts y .tsx en el directorio app
$files = Get-ChildItem -Path $appPath -Filter "*.ts*" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Corregir rutas con muchos ../
    $content = $content -replace '\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./\.\./lib/utils', '../lib/utils'
    
    # Corregir rutas absolutas problemáticas
    $content = $content -replace 'from ["'']\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\([^"'']+)["'']', 'from "../$1"'
    
    # Corregir rutas específicas
    $content = $content -replace 'from ["'']\./c:\\Users\\programar[^"'']*["'']', 'from "../lib/utils"'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Completed fixing all paths"