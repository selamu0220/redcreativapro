# Guía de Módulos CSS

## ¿Qué son los Módulos CSS?

Los módulos CSS son una forma de escribir CSS que evita conflictos de nombres de clases al generar nombres únicos automáticamente. Esto previene que los estilos de un componente afecten a otros componentes.

## Estructura Implementada

Se han creado módulos CSS para los siguientes componentes:

### Componentes Principales
- `app/ui/HomePage.module.css` - Página principal
- `app/components/AppLayout.module.css` - Layout principal de la aplicación

### Componentes de Navegación
- `app/ui/common/MainNav.module.css` - Navegación principal
- `app/ui/common/SideNav.module.css` - Navegación lateral

### Componentes de Blog
- `app/ui/blog/BlogList.module.css` - Lista de artículos del blog

### Componentes de Tareas
- `app/ui/tasks/TasksView.module.css` - Vista de tareas

### Componentes de Recursos
- `app/ui/resources/ResourcesView.module.css` - Vista de recursos

## Cómo Usar los Módulos CSS

### 1. Importar el módulo
```tsx
import styles from './ComponentName.module.css';
```

### 2. Usar las clases
```tsx
<div className={styles.container}>
  <h1 className={styles.title}>Título</h1>
  <p className={styles.description}>Descripción</p>
</div>
```

### 3. Combinar con clases condicionales
```tsx
<div className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
  Contenido
</div>
```

## Ventajas de los Módulos CSS

1. **Evita conflictos**: Cada clase tiene un nombre único
2. **Mejor mantenimiento**: Los estilos están organizados por componente
3. **Autocompletado**: Los IDEs pueden sugerir nombres de clases
4. **Detección de errores**: Se detectan clases no utilizadas
5. **Mejor rendimiento**: Solo se cargan los estilos necesarios

## Convenciones de Nomenclatura

- **Contenedores**: `container`, `wrapper`, `layout`
- **Encabezados**: `header`, `title`, `subtitle`
- **Navegación**: `nav`, `navItem`, `navItemActive`
- **Tarjetas**: `card`, `cardContent`, `cardHeader`
- **Botones**: `button`, `buttonPrimary`, `buttonSecondary`
- **Estados**: `active`, `disabled`, `loading`, `error`

## Migración de Componentes Existentes

Para migrar un componente existente:

1. Crear el archivo `.module.css` correspondiente
2. Mover las clases CSS al módulo
3. Importar el módulo en el componente
4. Reemplazar `className="clase"` por `className={styles.clase}`
5. Probar que los estilos se aplican correctamente

## Configuración de Next.js

La configuración en `next.config.js` está optimizada para:
- Soporte completo de CSS Modules
- Nombres de clases legibles en desarrollo
- Optimización para producción
- Compatibilidad con Tailwind CSS

## Mejores Prácticas

1. **Un módulo por componente**: Cada componente debe tener su propio archivo `.module.css`
2. **Nombres descriptivos**: Usar nombres que describan la función, no la apariencia
3. **Organización**: Agrupar estilos relacionados
4. **Reutilización**: Crear clases base que se puedan extender
5. **Documentación**: Comentar estilos complejos

## Solución de Problemas

### Los estilos no se aplican
- Verificar que el archivo `.module.css` esté importado correctamente
- Comprobar que el nombre de la clase existe en el módulo
- Revisar la consola del navegador para errores

### Conflictos con Tailwind
- Los módulos CSS y Tailwind pueden coexistir
- Usar `@apply` en los módulos para aprovechar las utilidades de Tailwind
- Priorizar módulos CSS para estilos específicos del componente

### Autocompletado no funciona
- Instalar extensiones de CSS Modules para tu editor
- Verificar que TypeScript esté configurado correctamente
- Reiniciar el servidor de desarrollo

## Próximos Pasos

1. Migrar componentes restantes a módulos CSS
2. Crear un sistema de design tokens
3. Implementar temas dinámicos
4. Optimizar la carga de CSS
5. Documentar patrones de diseño comunes