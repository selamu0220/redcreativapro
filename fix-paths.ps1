# Script para corregir rutas absolutas problemáticas

$files = Get-ChildItem -Path "c:\Users\programar\Documents\GitHub\redcreativapro\app" -Recurse -Include "*.ts", "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Reemplazar todas las rutas absolutas problemáticas
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\([^']+)'", "from '../`$1'"
    $content = $content -replace "} from \"\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\([^\"]+)\"", "} from \"../`$1\""
    
    # Guardar si hubo cambios
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Actualizado: $($file.FullName)"
    }
}

Write-Host "Proceso completado."