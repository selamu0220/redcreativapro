# Script de PowerShell para manejar Docker en Red Creativa Pro

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod", "build", "stop", "clean", "logs")]
    [string]$Action
)

Write-Host "Red Creativa Pro - Docker Manager" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

switch ($Action) {
    "dev" {
        Write-Host "Iniciando entorno de desarrollo..." -ForegroundColor Yellow
        docker-compose up --build app-dev
    }
    "prod" {
        Write-Host "Iniciando entorno de producción..." -ForegroundColor Yellow
        docker-compose --profile production up --build app-prod
    }
    "build" {
        Write-Host "Construyendo imágenes Docker..." -ForegroundColor Yellow
        docker-compose build
    }
    "stop" {
        Write-Host "Deteniendo todos los servicios..." -ForegroundColor Yellow
        docker-compose down
    }
    "clean" {
        Write-Host "Limpiando contenedores e imágenes..." -ForegroundColor Red
        docker-compose down --rmi all --volumes --remove-orphans
        docker system prune -f
    }
    "logs" {
        Write-Host "Mostrando logs..." -ForegroundColor Cyan
        docker-compose logs -f
    }
}

Write-Host "Operación completada." -ForegroundColor Green