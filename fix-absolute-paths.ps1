# Script para corregir rutas absolutas problemáticas

# Función para calcular ruta relativa
function Get-RelativePath {
    param(
        [string]$FromPath,
        [string]$ToPath
    )
    
    $fromParts = $FromPath.Split('\') | Where-Object { $_ -ne '' }
    $toParts = $ToPath.Split('\') | Where-Object { $_ -ne '' }
    
    # Encontrar el índice común más largo
    $commonIndex = 0
    while ($commonIndex -lt $fromParts.Length -and $commonIndex -lt $toParts.Length -and $fromParts[$commonIndex] -eq $toParts[$commonIndex]) {
        $commonIndex++
    }
    
    # Calcular niveles hacia arriba
    $upLevels = $fromParts.Length - $commonIndex - 1
    
    # Construir ruta relativa
    $relativeParts = @()
    for ($i = 0; $i -lt $upLevels; $i++) {
        $relativeParts += '..'
    }
    
    # Agregar partes restantes del destino
    for ($i = $commonIndex; $i -lt $toParts.Length; $i++) {
        $relativeParts += $toParts[$i]
    }
    
    return ($relativeParts -join '/')
}

# Obtener todos los archivos TypeScript
$files = Get-ChildItem -Path "c:\Users\programar\Documents\GitHub\redcreativapro\app" -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.Name -ne "globals.css" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Buscar y reemplazar rutas absolutas problemáticas
    $pattern = "import\s+.*?from\s+['\"]\./c:\\\\Users\\\\programar\\\\Documents\\\\GitHub\\\\redcreativapro\\\\app\\\\([^'\"]+)['\"];"
    
    $matches = [regex]::Matches($content, $pattern)
    
    foreach ($match in $matches) {
        $fullMatch = $match.Value
        $targetPath = $match.Groups[1].Value
        
        # Calcular ruta relativa
        $fromDir = Split-Path $file.FullName -Parent
        $toPath = "c:\Users\programar\Documents\GitHub\redcreativapro\app\$targetPath"
        
        # Determinar la ruta relativa correcta
        $relativePath = ""
        
        # Casos específicos comunes
        if ($targetPath -match "^lib\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^types\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^components\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^ui\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^data\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^hooks\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        elseif ($targetPath -match "^contexts\\") {
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        else {
            # Caso general
            $levels = ($fromDir.Replace("c:\Users\programar\Documents\GitHub\redcreativapro\app\\", "").Split('\\') | Where-Object { $_ -ne "" }).Length
            $relativePath = ("../" * $levels) + $targetPath.Replace("\\", "/")
        }
        
        # Crear el reemplazo
        $newImport = $fullMatch -replace "\./c:\\\\Users\\\\programar\\\\Documents\\\\GitHub\\\\redcreativapro\\\\app\\\\[^'\"]+", $relativePath
        
        $content = $content.Replace($fullMatch, $newImport)
    }
    
    # Guardar si hubo cambios
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Actualizado: $($file.FullName)"
    }
}

Write-Host "Proceso completado."