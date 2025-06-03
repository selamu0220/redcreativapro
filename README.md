# Red Creativa Pro

Plataforma integral para profesionales creativos y agencias.

## Requisitos

- Node.js (versión especificada en `.nvmrc`)
- Supabase (cuenta y proyecto configurado)

## Configuración del entorno

### Node.js

Este proyecto utiliza una versión específica de Node.js definida en el archivo `.nvmrc`. Para utilizarla:

```bash
# Si tienes nvm instalado
nvm use

# O instala manualmente la versión especificada en .nvmrc
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_de_supabase
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo con Vite
npm run dev

# O iniciar servidor de desarrollo con Next.js
npm run next:dev
```

## Base de datos

### Inicialización de la base de datos

El proyecto incluye un script para inicializar la base de datos con datos de ejemplo.

```bash
# Insertar datos de ejemplo
npm run db:seed

# Limpiar todos los datos
npm run db:clear

# Reiniciar la base de datos (limpiar e insertar datos nuevos)
npm run db:reset
```

### Estructura de la base de datos

La base de datos incluye las siguientes tablas principales:

- `users`: Perfiles de usuarios
- `projects`: Proyectos creativos
- `tasks`: Tareas asociadas a proyectos
- `calendar_events`: Eventos de calendario
- `blog_posts`: Publicaciones de blog
- `prompts`: Plantillas de prompts para IA
- `resources`: Recursos digitales
- `scripts`: Guiones y scripts creativos

## Construcción para producción

```bash
# Construir con Vite
npm run build

# O construir con Next.js
npm run next:build
```

## Licencia

Todos los derechos reservados © Red Creativa Pro