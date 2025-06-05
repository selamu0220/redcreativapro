# Script para corregir rutas de importación incorrectas restantes

# Obtener todos los archivos .ts y .tsx en el directorio app/ui
$files = Get-ChildItem -Path "app\ui" -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.Name -ne "globals.css" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Corregir rutas con múltiples niveles de '../' - usando patrones más simples
    $content = $content -replace "\.\.(/\.\.){5,}/ui/", "../"
    $content = $content -replace "\.\.(/\.\.){5,}/hooks/", "../../hooks/"
    $content = $content -replace "\.\.(/\.\.){5,}/components/", "../../components/"
    
    # Corregir rutas específicas encontradas
    $content = $content -replace "from '../../../../../../../../../ui/button'", "from '../button'"
    $content = $content -replace 'from "../../../../../../../../../ui/button"', 'from "../button"'
    $content = $content -replace "from '../../../../../../../../../ui/toast'", "from '../toast'"
    $content = $content -replace 'from "../../../../../../../../../ui/toast"', 'from "../toast"'
    $content = $content -replace "from '../../../../../../../../../ui/toggle'", "from '../toggle'"
    $content = $content -replace 'from "../../../../../../../../../ui/toggle"', 'from "../toggle"'
    $content = $content -replace "from '../../../../../../../../../ui/dialog'", "from '../dialog'"
    $content = $content -replace 'from "../../../../../../../../../ui/dialog"', 'from "../dialog"'
    $content = $content -replace "from '../../../../../../../../../ui/input'", "from '../input'"
    $content = $content -replace 'from "../../../../../../../../../ui/input"', 'from "../input"'
    $content = $content -replace "from '../../../../../../../../../ui/label'", "from '../label'"
    $content = $content -replace 'from "../../../../../../../../../ui/label"', 'from "../label"'
    $content = $content -replace "from '../../../../../../../../../ui/radio-group'", "from '../radio-group'"
    $content = $content -replace 'from "../../../../../../../../../ui/radio-group"', 'from "../radio-group"'
    $content = $content -replace "from '../../../../../../../../../ui/card'", "from '../card'"
    $content = $content -replace 'from "../../../../../../../../../ui/card"', 'from "../card"'
    $content = $content -replace "from '../../../../../../../../../hooks/use-toast'", "from '../../hooks/use-toast'"
    $content = $content -replace 'from "../../../../../../../../../hooks/use-toast"', 'from "../../hooks/use-toast"'
    $content = $content -replace "from '../../../../../../../../../components/theme-provider'", "from '../../components/theme-provider'"
    $content = $content -replace 'from "../../../../../../../../../components/theme-provider"', 'from "../../components/theme-provider"'
    
    # Guardar solo si hubo cambios
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Corregido: $($file.FullName)"
    }
}

Write-Host "Script completado."