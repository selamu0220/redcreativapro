# Script para corregir rutas de importación @/ a rutas relativas correctas

# Función para calcular ruta relativa correcta
function Get-CorrectRelativePath {
    param(
        [string]$FromFile,
        [string]$ToFile
    )
    
    $fromDir = Split-Path $FromFile -Parent
    $toDir = Split-Path $ToFile -Parent
    $toFileName = Split-Path $ToFile -Leaf
    
    # Convertir a arrays de partes del path
    $fromParts = $fromDir -split '\\'
    $toParts = $toDir -split '\\'
    
    # Encontrar el índice común
    $commonIndex = 0
    $minLength = [Math]::Min($fromParts.Length, $toParts.Length)
    
    for ($i = 0; $i -lt $minLength; $i++) {
        if ($fromParts[$i] -eq $toParts[$i]) {
            $commonIndex = $i + 1
        } else {
            break
        }
    }
    
    # Calcular niveles hacia arriba
    $levelsUp = $fromParts.Length - $commonIndex
    
    # Construir la ruta relativa
    $relativePath = ''
    
    if ($levelsUp -eq 0) {
        $relativePath = './'
    } else {
        for ($i = 0; $i -lt $levelsUp; $i++) {
            $relativePath += '../'
        }
    }
    
    # Agregar las partes restantes del path de destino
    for ($i = $commonIndex; $i -lt $toParts.Length; $i++) {
        $relativePath += $toParts[$i] + '/'
    }
    
    # Agregar el nombre del archivo sin extensión
    $fileNameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($toFileName)
    $relativePath += $fileNameWithoutExt
    
    return $relativePath
}

# Función para procesar archivos
function Fix-Imports {
    param(
        [string]$FilePath
    )
    
    $content = Get-Content $FilePath -Raw
    $modified = $false
    
    # Mapeos de rutas @/ a directorios reales
    $mappings = @{
        '@/lib/utils' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\lib\utils.ts'
        '@/lib/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\lib\'
        '@/types/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\types\'
        '@/hooks/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\hooks\'
        '@/contexts/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\contexts\'
        '@/data/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\data\'
        '@/config/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\config\'
        '@/components/ui/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\ui\'
        '@/components/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\components\'
        '@/ui/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\ui\'
        '@/pages/' = 'c:\Users\programar\Documents\GitHub\redcreativapro\app\components\'
    }
    
    # Procesar cada mapeo
    foreach ($pattern in $mappings.Keys) {
        $targetPath = $mappings[$pattern]
        
        # Buscar todas las ocurrencias del patrón
        if ($content.Contains($pattern)) {
            $lines = $content -split "`n"
            for ($i = 0; $i -lt $lines.Length; $i++) {
                $line = $lines[$i]
                if ($line.Contains($pattern)) {
                    # Casos especiales
                    if ($pattern -eq '@/lib/utils') {
                        $relativePath = Get-CorrectRelativePath $FilePath $targetPath
                        $lines[$i] = $line.Replace('@/lib/utils', $relativePath)
                        $modified = $true
                        Write-Host "Reemplazando: @/lib/utils -> $relativePath"
                    }
                    else {
                        # Extraer la parte después del patrón
                        $startIndex = $line.IndexOf($pattern)
                        if ($startIndex -ge 0) {
                            $afterPattern = $line.Substring($startIndex + $pattern.Length)
                            
                            # Encontrar el final de la importación (comilla)
                            $endQuote = $afterPattern.IndexOfAny(@('"', "'"))
                            if ($endQuote -ge 0) {
                                $importPath = $afterPattern.Substring(0, $endQuote)
                                
                                # Construir la ruta completa del archivo importado
                                $fullImportPath = $targetPath + $importPath + '.ts'
                                if (-not (Test-Path $fullImportPath)) {
                                    $fullImportPath = $targetPath + $importPath + '.tsx'
                                }
                                
                                # Calcular la ruta relativa
                                $relativePath = Get-CorrectRelativePath $FilePath $fullImportPath
                                
                                # Reemplazar en la línea
                                $oldImport = $pattern + $importPath
                                $lines[$i] = $line.Replace($oldImport, $relativePath)
                                $modified = $true
                                
                                Write-Host "Reemplazando: $oldImport -> $relativePath"
                            }
                        }
                    }
                }
            }
            
            if ($modified) {
                $content = $lines -join "`n"
            }
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