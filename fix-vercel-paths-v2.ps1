# Script para corregir rutas absolutas problemáticas que causan errores en Vercel

# Obtener todos los archivos TypeScript en el directorio app
$files = Get-ChildItem -Path "app" -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.Name -ne "globals.css" }

Write-Host "Corrigiendo rutas absolutas problemáticas..."

foreach ($file in $files) {
    $content = Get-Content $file.FullName | Out-String
    $originalContent = $content
    
    # Corregir imports específicos mencionados en el error
    $content = $content -replace "import \{ Button \} from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\button'", "import { Button } from '../../ui/button'"
    $content = $content -replace "import \{ Separator \} from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\separator'", "import { Separator } from '../../ui/separator'"
    $content = $content -replace "import \{ cn \} from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\utils'", "import { cn } from '../../lib/utils'"
    $content = $content -replace "import type \{ ToastActionElement, ToastProps \} from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\toast'", "import type { ToastActionElement, ToastProps } from '../ui/toast'"
    
    # Corregir rutas absolutas que empiezan con './c:\Users\programar\Documents\GitHub\redcreativapro\app\'
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\", "from '../../ui/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\", "from '../../lib/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\", "from '../../components/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\ui\\", "from '../ui/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\hooks\\", "from '../hooks/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\contexts\\", "from '../contexts/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\types\\", "from '../types/"
    $content = $content -replace "from '\./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\data\\", "from '../data/"
    
    # Corregir rutas sin el prefijo './'
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\", "from '../../ui/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\", "from '../../lib/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\", "from '../../components/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\ui\\", "from '../ui/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\hooks\\", "from '../hooks/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\contexts\\", "from '../contexts/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\types\\", "from '../types/"
    $content = $content -replace "from 'c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\data\\", "from '../data/"
    
    # Corregir rutas problemáticas sin backslashes
    $content = $content -replace "'\./c:UsersprogramarDocumentsGitHubedcreativaproapplibsupabase'", "'../lib/supabase'"
    $content = $content -replace "'\./c:UsersprogramarDocumentsGitHubedcreativapro", "'../"
    
    if ($content -ne $originalContent) {
        $content | Set-Content -Path $file.FullName
        Write-Host "Corregido: $($file.FullName)"
    }
}

Write-Host "Corrección de rutas completada."
Write-Host "Archivos procesados: $($files.Count)"