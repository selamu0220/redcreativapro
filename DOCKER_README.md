# Docker Setup para Red Creativa Pro

Este proyecto incluye configuración completa de Docker para desarrollo y producción.

## Archivos Docker

- `Dockerfile` - Imagen optimizada para producción
- `Dockerfile.dev` - Imagen para desarrollo con hot-reload
- `docker-compose.yml` - Orquestación de servicios
- `.dockerignore` - Archivos excluidos del build
- `docker-start.ps1` - Script de PowerShell para facilitar el uso

## Comandos Rápidos

### Usando PowerShell Script
```powershell
# Desarrollo
.\docker-start.ps1 dev

# Producción
.\docker-start.ps1 prod

# Construir imágenes
.\docker-start.ps1 build

# Detener servicios
.\docker-start.ps1 stop

# Limpiar todo
.\docker-start.ps1 clean

# Ver logs
.\docker-start.ps1 logs
```

### Usando Docker Compose directamente

#### Desarrollo
```bash
# Iniciar en modo desarrollo
docker-compose up --build app-dev

# En segundo plano
docker-compose up -d --build app-dev
```

#### Producción
```bash
# Iniciar en modo producción
docker-compose --profile production up --build app-prod

# En segundo plano
docker-compose --profile production up -d --build app-prod
```

#### Gestión
```bash
# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir sin caché
docker-compose build --no-cache
```

## Puertos

- **Desarrollo**: http://localhost:3000
- **Producción**: http://localhost:3001
- **PostgreSQL**: localhost:5432 (si se usa el perfil database)

## Perfiles Docker Compose

- `default` - Solo servicios básicos
- `production` - Incluye servicio de producción
- `database` - Incluye PostgreSQL

### Usar con base de datos
```bash
docker-compose --profile database up
```

## Variables de Entorno

Crea un archivo `.env.local` para variables específicas:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
DATABASE_URL=postgresql://postgres:password@postgres:5432/redcreativa
```

## Troubleshooting

### Problema: Puerto ocupado
```bash
# Verificar qué usa el puerto
netstat -ano | findstr :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3002:3000"  # Usar puerto 3002 en lugar de 3000
```

### Problema: Cambios no se reflejan
```bash
# Reconstruir sin caché
docker-compose build --no-cache app-dev

# Verificar volúmenes
docker-compose down -v
docker-compose up --build app-dev
```

### Problema: Memoria insuficiente
```bash
# Limpiar sistema Docker
docker system prune -a

# Aumentar memoria en Docker Desktop
# Settings > Resources > Memory > 4GB+
```

## Deployment a Vercel con Docker

1. **Build local**:
   ```bash
   docker build -t redcreativa-prod .
   ```

2. **Test local**:
   ```bash
   docker run -p 3000:3000 redcreativa-prod
   ```

3. **Deploy a Vercel**:
   ```bash
   vercel --prod
   ```

## Optimizaciones

- **Multi-stage build** para reducir tamaño de imagen
- **Node user** para seguridad
- **Standalone output** para mejor performance
- **Layer caching** para builds más rápidos

## Monitoreo

```bash
# Ver recursos usados
docker stats

# Inspeccionar contenedor
docker inspect <container_id>

# Ejecutar comandos dentro del contenedor
docker exec -it <container_id> sh
```