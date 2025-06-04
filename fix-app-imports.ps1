# Script para corregir rutas @/app/components

$files = @(
    'app\calendario\page.tsx',
    'app\recursos\page.tsx',
    'app\prompts\page.tsx',
    'app\proyectos\page.tsx',
    'app\blog\page.tsx',
    'app\chat\page.tsx',
    'app\blog\[slug]\page.tsx',
    'app\tareas\page.tsx',
    'app\aprendizaje\page.tsx',
    'app\scripts\page.tsx',
    'app\miniaturas\page.tsx'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace "@/app/components/AppLayout", "../components/AppLayout"
        $content = $content -replace "@/app/components/HomePage", "../components/HomePage"
        $content = $content -replace "@/components/blog/BlogView", "../../ui/blog/BlogView"
        Set-Content $file $content -NoNewline
        Write-Host "Actualizado: $file"
    }
}

Write-Host "Proceso completado."