import { Post } from "../types/blog";

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Content Creation',
    content: `# Getting Started with Content Creation

Creating engaging content is essential for building an audience and establishing your brand. Here are some key tips to get started:

## 1. Know Your Audience

Understanding who you're creating content for is crucial. Research your target audience's:
- Interests
- Pain points
- Preferred platforms
- Content consumption habits

## 2. Plan Your Content Strategy

Develop a content calendar that includes:
- Topics
- Publishing schedule
- Content types
- Distribution channels

## 3. Focus on Quality

Quality always trumps quantity. Ensure your content is:
- Well-researched
- Original
- Valuable to your audience
- Professionally presented`,
    excerpt: 'Learn the fundamentals of content creation and how to build an effective content strategy.',
    author: {
      id: '1',
      name: 'Demo User',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
    tags: ['content creation', 'strategy', 'marketing'],
    imageUrl: 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Social Media Marketing Tips for 2025',
    content: `# Social Media Marketing Tips for 2025

Stay ahead of the curve with these essential social media marketing strategies for 2025.

## Emerging Trends

- AI-powered content creation
- Virtual reality experiences
- Short-form video dominance
- Community-driven content

## Best Practices

1. Authenticity is key
2. Engage with your audience
3. Leverage user-generated content
4. Monitor analytics regularly

## Platform-Specific Strategies

### Instagram
- Focus on Reels
- Use interactive stickers
- Optimize your bio

### TikTok
- Participate in trends
- Use popular sounds
- Create native content

### LinkedIn
- Share industry insights
- Engage with thought leaders
- Post consistently`,
    excerpt: 'Discover the latest social media marketing trends and strategies for 2025.',
    author: {
      id: '2',
      name: 'Alex Johnson',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-14T15:30:00Z',
    updatedAt: '2025-03-14T15:30:00Z',
    tags: ['social media', 'marketing', 'trends'],
    imageUrl: 'https://images.pexels.com/photos/3850250/pexels-photo-3850250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Cómo Organizar tus Recursos Creativos de Forma Eficiente',
    content: `# Cómo Organizar tus Recursos Creativos de Forma Eficiente

La gestión efectiva de recursos creativos es fundamental para mantener la productividad y la calidad en tus proyectos.

## Sistema de Categorización

### Por Tipo de Contenido
- **Imágenes**: Fotografías, ilustraciones, iconos
- **Videos**: Clips, animaciones, plantillas
- **Audio**: Música, efectos de sonido, voces
- **Documentos**: Plantillas, guías, referencias

### Por Proyecto
Organiza los recursos según el proyecto específico:
- Campaña de marketing
- Contenido para redes sociales
- Material educativo
- Branding corporativo

## Herramientas de Gestión

### Etiquetado Inteligente
Usa etiquetas descriptivas:
- Colores dominantes
- Estilo visual
- Emociones transmitidas
- Público objetivo

### Metadatos Útiles
- Fecha de creación
- Autor o fuente
- Licencia de uso
- Resolución o calidad

## Mejores Prácticas

1. **Nomenclatura Consistente**: Usa un sistema de nombres claro
2. **Backup Regular**: Mantén copias de seguridad
3. **Revisión Periódica**: Elimina recursos obsoletos
4. **Acceso Compartido**: Facilita la colaboración en equipo

## Beneficios de una Buena Organización

- Ahorro de tiempo en búsquedas
- Mejor colaboración en equipo
- Reutilización eficiente de recursos
- Mantenimiento de estándares de calidad`,
    excerpt: 'Aprende a organizar y gestionar tus recursos creativos para maximizar tu productividad.',
    author: {
      id: '3',
      name: 'María González',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-13T09:15:00Z',
    updatedAt: '2025-03-13T09:15:00Z',
    tags: ['organización', 'recursos', 'productividad', 'gestión'],
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4a',
    title: 'Prompts de IA: Guía Completa para Crear Contenido Efectivo',
    content: `# Prompts de IA: Guía Completa para Crear Contenido Efectivo

Los prompts bien estructurados son la clave para obtener resultados excepcionales con herramientas de inteligencia artificial.

## Anatomía de un Prompt Efectivo

### Componentes Esenciales
1. **Contexto**: Establece el escenario
2. **Tarea**: Define qué quieres lograr
3. **Formato**: Especifica cómo quieres el resultado
4. **Tono**: Indica el estilo de comunicación
5. **Restricciones**: Establece límites y requisitos

### Ejemplo de Estructura
\`\`\`
Contexto: Eres un experto en marketing digital
Tarea: Crear un plan de contenido para redes sociales
Formato: Lista con 10 ideas específicas
Tono: Profesional pero accesible
Restricciones: Para una empresa de tecnología, audiencia joven
\`\`\`

## Tipos de Prompts por Categoría

### Para Escritura
- Artículos de blog
- Copys publicitarios
- Guiones para videos
- Descripciones de productos

### Para Creatividad Visual
- Descripciones para generación de imágenes
- Conceptos de diseño
- Paletas de colores
- Composiciones visuales

### Para Análisis
- Investigación de mercado
- Análisis de competencia
- Evaluación de tendencias
- Optimización de contenido

## Técnicas Avanzadas

### Chain of Thought
Guía a la IA paso a paso:
1. Analiza el problema
2. Considera las opciones
3. Evalúa pros y contras
4. Proporciona la solución

### Few-Shot Learning
Proporciona ejemplos específicos:
- Ejemplo 1: [input] → [output deseado]
- Ejemplo 2: [input] → [output deseado]
- Ahora hazlo con: [nuevo input]

## Errores Comunes a Evitar

- Prompts demasiado vagos
- Falta de contexto específico
- No especificar el formato deseado
- Ignorar las limitaciones de la IA
- No iterar y mejorar los prompts

## Biblioteca de Prompts Útiles

Mantén una colección organizada de prompts que funcionen bien para diferentes situaciones y úsalos como base para crear nuevos.`,
    excerpt: 'Domina el arte de crear prompts efectivos para herramientas de IA y mejora la calidad de tus resultados.',
    author: {
      id: '4',
      name: 'Carlos Ruiz',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-12T14:20:00Z',
    updatedAt: '2025-03-12T14:20:00Z',
    tags: ['IA', 'prompts', 'inteligencia artificial', 'contenido'],
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'Planificación Editorial: Cómo Crear un Calendario de Contenido Exitoso',
    content: `# Planificación Editorial: Cómo Crear un Calendario de Contenido Exitoso

Un calendario editorial bien estructurado es la columna vertebral de cualquier estrategia de contenido exitosa.

## Beneficios de la Planificación Editorial

### Consistencia
- Publicaciones regulares
- Mantenimiento de la audiencia
- Construcción de autoridad
- Mejor posicionamiento SEO

### Eficiencia
- Producción en lotes
- Mejor uso del tiempo
- Reducción del estrés
- Optimización de recursos

## Elementos Clave del Calendario

### Información Básica
- **Fecha de publicación**
- **Plataforma de destino**
- **Tipo de contenido**
- **Tema principal**
- **Palabras clave objetivo**

### Detalles de Producción
- **Responsable de creación**
- **Fecha límite de entrega**
- **Estado del contenido**
- **Recursos necesarios**
- **Aprobaciones requeridas**

## Estrategias de Contenido

### Regla 80/20
- 80% contenido de valor
- 20% contenido promocional

### Variedad de Formatos
- Artículos informativos
- Tutoriales paso a paso
- Casos de estudio
- Contenido visual
- Videos explicativos

### Temas Estacionales
- Eventos del calendario
- Tendencias temporales
- Fechas especiales del sector
- Lanzamientos de productos

## Herramientas Recomendadas

### Gratuitas
- Google Calendar
- Trello
- Notion
- Airtable (plan básico)

### De Pago
- CoSchedule
- Hootsuite
- Buffer
- Sprout Social

## Proceso de Implementación

1. **Auditoría de contenido actual**
2. **Definición de objetivos**
3. **Investigación de audiencia**
4. **Creación del calendario base**
5. **Asignación de responsabilidades**
6. **Establecimiento de flujos de trabajo**
7. **Monitoreo y ajustes**

## Métricas de Seguimiento

- Engagement por tipo de contenido
- Alcance y impresiones
- Tráfico generado
- Conversiones
- Tiempo de permanencia

## Consejos para el Éxito

- Mantén flexibilidad para contenido oportuno
- Revisa y ajusta regularmente
- Involucra a todo el equipo
- Documenta lo que funciona
- Planifica con al menos un mes de anticipación`,
    excerpt: 'Descubre cómo crear y mantener un calendario editorial que impulse tu estrategia de contenido.',
    author: {
      id: '5',
      name: 'Ana Martínez',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-11T11:45:00Z',
    updatedAt: '2025-03-11T11:45:00Z',
    tags: ['planificación', 'calendario editorial', 'estrategia', 'contenido'],
    imageUrl: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];
