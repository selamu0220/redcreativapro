# Script para corregir rutas de importación @/ a rutas relativas

# Función para obtener ruta relativa
function Get-RelativePath {
    param(
        [string]$From,
        [string]$To
    )
    
    $relativePath = [System.IO.Path]::GetRelativePath($From, $To)
    return $relativePath -replace '\\', '/'
}

# Función para procesar archivos
function Fix-Imports {
    param(
        [string]$FilePath
    )
    
    $content = Get-Content $FilePath -Raw
    $fileDir = Split-Path $FilePath -Parent
    $modified = $false
    
    # Mapeos de rutas @/ a directorios reales
    $mappings = @{
        '@/lib/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\lib'
        '@/types/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\types'
        '@/hooks/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\hooks'
        '@/contexts/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\contexts'
        '@/data/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\data'
        '@/config/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\config'
        '@/components/ui/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\ui'
        '@/components/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\components'
        '@/ui/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\ui'
        '@/pages/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\components'
    }
    
    # Procesar cada mapeo
    foreach ($pattern in $mappings.Keys) {
        $targetDir = $mappings[$pattern]
        
        # Buscar todas las importaciones con este patrón
        $regex = "from ['\"]" + [regex]::Escape($pattern) + "([^'\"]*)['\"]" 
        $matches = [regex]::Matches($content, $regex)
        
        foreach ($match in $matches) {
            $fullMatch = $match.Value
            $importPath = $match.Groups[1].Value
            
            # Construir la ruta completa del archivo importado
            $fullImportPath = Join-Path $targetDir $importPath
            
            # Calcular la ruta relativa
            $relativePath = Get-RelativePath $fileDir $fullImportPath
            
            # Asegurar que empiece con ./
            if (-not $relativePath.StartsWith('./') -and -not $relativePath.StartsWith('../')) {
                $relativePath = './' + $relativePath
            }
            
            # Reemplazar en el contenido
            $newImport = $fullMatch.Replace($pattern + $importPath, $relativePath)
            $content = $content.Replace($fullMatch, $newImport)
            $modified = $true
            
            Write-Host "Reemplazando en $($FilePath): $($pattern)$($importPath) -> $($relativePath)"
        }
    }
    
    # Guardar si se modificó
    if ($modified) {
        Set-Content $FilePath $content -NoNewline
        Write-Host "Archivo actualizado: $FilePath"
    }
}

# Buscar todos los archivos TypeScript y TSX en el directorio app
$files = Get-ChildItem -Path "c:\Users\programar\Documents\GitHub\redcreativapro\app" -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.Name -ne "globals.css" }

Write-Host "Procesando $($files.Count) archivos..."

foreach ($file in $files) {
    Fix-Imports $file.FullName
}

Write-Host "Proceso completado."