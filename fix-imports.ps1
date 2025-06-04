# Script para corregir todas las importaciones '@/' en el directorio app

# Función para obtener la ruta relativa correcta
function Get-RelativePath {
    param(
        [string]$FromPath,
        [string]$ToPath
    )
    
    $from = $FromPath -replace '\\', '/'
    $to = $ToPath -replace '\\', '/'
    
    # Calcular niveles hacia arriba
    $fromParts = $from.Split('/')
    $toParts = $to.Split('/')
    
    # Encontrar el índice común
    $commonIndex = 0
    for ($i = 0; $i -lt [Math]::Min($fromParts.Length, $toParts.Length); $i++) {
        if ($fromParts[$i] -eq $toParts[$i]) {
            $commonIndex = $i + 1
        } else {
            break
        }
    }
    
    # Calcular niveles hacia arriba
    $levelsUp = $fromParts.Length - $commonIndex - 1
    $upPath = if ($levelsUp -gt 0) { '../' * $levelsUp } else { './' }
    
    # Agregar el resto del path
    $remainingPath = $toParts[$commonIndex..($toParts.Length - 1)] -join '/'
    
    return $upPath + $remainingPath
}

# Función para procesar archivos
function Fix-Imports {
    param([string]$FilePath)
    
    $content = Get-Content $FilePath -Raw
    $modified = $false
    
    # Obtener directorio del archivo
    $fileDir = Split-Path $FilePath -Parent
    $appDir = "c:\Users\programar\Documents\GitHub\redcreativapro\app"
    
    # Mapeo de rutas '@/' a rutas reales
    $mappings = @{
        '@/lib/' = "$appDir\lib"
        '@/types/' = "$appDir\types"
        '@/hooks/' = "$appDir\hooks"
        '@/contexts/' = "$appDir\contexts"
        '@/data/' = "$appDir\data"
        '@/config/' = "$appDir\config"
        '@/components/ui/' = "$appDir\ui"
        '@/components/theme-provider' = "$appDir\ui\theme-provider"
        '@/components/common/' = "$appDir\ui\common"
        '@/components/chat/' = "$appDir\ui\chat"
        '@/components/' = "$appDir\ui"
    }
    
    # Procesar cada mapeo
    foreach ($pattern in $mappings.Keys) {
        $targetDir = $mappings[$pattern]
        
        # Buscar importaciones con este patrón
        $regex = "from ['\"]" + [regex]::Escape($pattern) + "([^'\"]*)['\"];"
        $matches = [regex]::Matches($content, $regex)
        
        foreach ($match in $matches) {
            $fullMatch = $match.Value
            $importPath = $match.Groups[1].Value
            
            # Construir la ruta completa del archivo importado
            $fullImportPath = Join-Path $targetDir $importPath
            
            # Calcular la ruta relativa
            $relativePath = Get-RelativePath $fileDir $fullImportPath
            
            # Reemplazar en el contenido
            $newImport = $fullMatch -replace [regex]::Escape($pattern + $importPath), $relativePath
            $content = $content -replace [regex]::Escape($fullMatch), $newImport
            $modified = $true
            
            Write-Host "Reemplazando en $FilePath: $pattern$importPath -> $relativePath"
        }
    }
    
    # Guardar si se modificó
    if ($modified) {
        Set-Content $FilePath $content -NoNewline
        Write-Host "Archivo actualizado: $FilePath"
    }
}

# Obtener todos los archivos TypeScript y JavaScript en el directorio app
$files = Get-ChildItem -Path "c:\Users\programar\Documents\GitHub\redcreativapro\app" -Recurse -Include "*.ts", "*.tsx", "*.js", "*.jsx"

Write-Host "Procesando $($files.Count) archivos..."

foreach ($file in $files) {
    Fix-Imports $file.FullName
}

Write-Host "Proceso completado."