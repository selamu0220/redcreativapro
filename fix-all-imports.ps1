# Script para corregir todas las rutas absolutas incorrectas

# Función para calcular ruta relativa
function Get-RelativePath {
    param(
        [string]$From,
        [string]$To
    )
    
    $fromParts = $From.Split('\') | Where-Object { $_ -ne '' }
    $toParts = $To.Split('\') | Where-Object { $_ -ne '' }
    
    # Encontrar el índice común
    $commonIndex = 0
    while ($commonIndex -lt $fromParts.Length -and $commonIndex -lt $toParts.Length -and $fromParts[$commonIndex] -eq $toParts[$commonIndex]) {
        $commonIndex++
    }
    
    # Calcular cuántos niveles subir
    $upLevels = $fromParts.Length - $commonIndex - 1
    
    # Construir la ruta relativa
    $relativePath = ''
    for ($i = 0; $i -lt $upLevels; $i++) {
        $relativePath += '../'
    }
    
    # Agregar la parte restante del destino
    for ($i = $commonIndex; $i -lt $toParts.Length; $i++) {
        $relativePath += $toParts[$i]
        if ($i -lt $toParts.Length - 1) {
            $relativePath += '/'
        }
    }
    
    if ($relativePath -eq '') {
        return './'
    }
    
    return $relativePath
}

# Obtener todos los archivos .tsx y .ts en la carpeta app/ui
$files = Get-ChildItem -Path "app\ui" -Recurse -Include "*.tsx", "*.ts" | Where-Object { $_.Name -ne "globals.css" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Reemplazar rutas absolutas con rutas relativas
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\utils';", "from '../lib/utils';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\([^']+)';", "from '../ui/`$1';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\hooks\\([^']+)';", "from '../hooks/`$1';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\contexts\\([^']+)';", "from '../contexts/`$1';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\types\\([^']+)';", "from '../types/`$1';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\data\\([^']+)';", "from '../data/`$1';"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\theme-provider';", "from '../components/theme-provider';"
    
    # Para archivos en subdirectorios, ajustar las rutas
    $relativePath = $file.DirectoryName.Replace((Get-Location).Path + "\app\ui\", "")
    if ($relativePath -ne "") {
        $levels = ($relativePath.Split('\').Length)
        $prefix = "../" * ($levels + 1)
        
        $content = $content -replace "from '\.\./lib/utils';", "from '${prefix}lib/utils';"
        $content = $content -replace "from '\.\./ui/([^']+)';", "from '${prefix}ui/`$1';"
        $content = $content -replace "from '\.\./hooks/([^']+)';", "from '${prefix}hooks/`$1';"
        $content = $content -replace "from '\.\./contexts/([^']+)';", "from '${prefix}contexts/`$1';"
        $content = $content -replace "from '\.\./types/([^']+)';", "from '${prefix}types/`$1';"
        $content = $content -replace "from '\.\./data/([^']+)';", "from '${prefix}data/`$1';"
        $content = $content -replace "from '\.\./components/theme-provider';", "from '${prefix}components/theme-provider';"
    }
    
    # Manejar imports dinámicos
    $content = $content -replace "import\('\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\ai'\)", "import('../lib/ai')"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Actualizado: $($file.FullName)"
    }
}

Write-Host "Proceso completado."