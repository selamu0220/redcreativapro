import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

// Cliente de Supabase con service role para operaciones administrativas
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Datos de ejemplo para usuarios
const sampleUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@redcreativa.pro',
    full_name: 'Administrador Red Creativa',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    subscription_status: 'active',
    subscription_tier: 'premium'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'usuario@ejemplo.com',
    full_name: 'Usuario de Ejemplo',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    subscription_status: 'active',
    subscription_tier: 'basic'
  }
];

// Datos de ejemplo para proyectos
const sampleProjects = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Campaña de Marketing Digital',
    description: 'Desarrollo de una campaña integral de marketing digital para cliente corporativo',
    status: 'in_progress',
    priority: 'high',
    category: 'marketing',
    tags: ['marketing', 'digital', 'campaña'],
    deadline: new Date('2024-12-31').toISOString(),
    progress: 65,
    budget: 15000,
    client_name: 'Empresa ABC',
    client_email: 'contacto@empresaabc.com'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Rediseño de Sitio Web',
    description: 'Rediseño completo del sitio web corporativo con enfoque en UX/UI',
    status: 'planning',
    priority: 'medium',
    category: 'web',
    tags: ['web', 'diseño', 'ux', 'ui'],
    deadline: new Date('2024-11-15').toISOString(),
    progress: 25,
    budget: 8000,
    client_name: 'StartUp XYZ',
    client_email: 'info@startupxyz.com'
  }
];

// Datos de ejemplo para tareas
const sampleTasks = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Crear estrategia de contenido',
    description: 'Desarrollar calendario editorial y estrategia de contenido para redes sociales',
    status: 'in_progress',
    priority: 'high',
    category: 'content',
    tags: ['contenido', 'redes sociales', 'estrategia'],
    due_date: new Date('2024-10-30').toISOString(),
    estimated_hours: 8,
    actual_hours: 5,
    assignee: 'Equipo de Contenido'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Diseñar mockups de interfaz',
    description: 'Crear mockups de alta fidelidad para las páginas principales',
    status: 'pending',
    priority: 'medium',
    category: 'design',
    tags: ['diseño', 'mockups', 'ui'],
    due_date: new Date('2024-11-05').toISOString(),
    estimated_hours: 12,
    assignee: 'Diseñador UX/UI'
  }
];

// Datos de ejemplo para eventos de calendario
const sampleCalendarEvents = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Reunión con cliente ABC',
    description: 'Presentación de avances del proyecto de marketing',
    start_time: new Date('2024-10-25T10:00:00').toISOString(),
    end_time: new Date('2024-10-25T11:30:00').toISOString(),
    location: 'Oficina principal',
    attendees: ['cliente@empresaabc.com', 'equipo@redcreativa.pro'],
    reminder_minutes: 30,
    color: '#3b82f6'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Sesión de brainstorming',
    description: 'Generación de ideas para nueva campaña publicitaria',
    start_time: new Date('2024-10-28T14:00:00').toISOString(),
    end_time: new Date('2024-10-28T16:00:00').toISOString(),
    location: 'Sala de reuniones',
    attendees: ['equipo@redcreativa.pro'],
    reminder_minutes: 15,
    color: '#10b981'
  }
];

// Datos de ejemplo para posts de blog
const sampleBlogPosts = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Tendencias de Marketing Digital 2024',
    content: 'El marketing digital continúa evolucionando rápidamente. En este artículo exploramos las principales tendencias que marcarán el 2024...',
    excerpt: 'Descubre las tendencias más importantes del marketing digital para este año',
    slug: 'tendencias-marketing-digital-2024',
    status: 'published',
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['marketing', 'tendencias', '2024', 'digital'],
    category: 'Marketing',
    seo_title: 'Tendencias de Marketing Digital 2024 | Red Creativa Pro',
    seo_description: 'Conoce las tendencias más importantes del marketing digital para 2024 y cómo implementarlas en tu estrategia.',
    published_at: new Date().toISOString()
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Guía Completa de Diseño UX/UI',
    content: 'El diseño de experiencia de usuario (UX) y la interfaz de usuario (UI) son fundamentales para el éxito de cualquier producto digital...',
    excerpt: 'Una guía completa para entender y aplicar principios de diseño UX/UI',
    slug: 'guia-completa-diseno-ux-ui',
    status: 'draft',
    featured_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    tags: ['ux', 'ui', 'diseño', 'guía'],
    category: 'Diseño',
    seo_title: 'Guía Completa de Diseño UX/UI | Red Creativa Pro',
    seo_description: 'Aprende los fundamentos del diseño UX/UI con nuestra guía completa y práctica.'
  }
];

// Datos de ejemplo para prompts
const samplePrompts = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Generador de Ideas de Contenido',
    content: 'Genera 10 ideas de contenido para redes sociales sobre {tema} dirigido a {audiencia}. Incluye diferentes formatos como posts, stories, reels y videos.',
    category: 'Marketing de Contenido',
    tags: ['contenido', 'redes sociales', 'ideas'],
    is_favorite: true,
    is_public: true,
    usage_count: 25,
    variables: JSON.stringify([{name: 'tema', type: 'text'}, {name: 'audiencia', type: 'text'}])
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Optimizador de Copy Publicitario',
    content: 'Optimiza este copy publicitario para {plataforma}: "{copy_original}". Mejora el engagement, claridad y call-to-action. Audiencia objetivo: {audiencia}.',
    category: 'Copywriting',
    tags: ['copy', 'publicidad', 'optimización'],
    is_favorite: false,
    is_public: true,
    usage_count: 18,
    variables: JSON.stringify([{name: 'plataforma', type: 'select', options: ['Facebook', 'Instagram', 'Google Ads', 'LinkedIn']}, {name: 'copy_original', type: 'textarea'}, {name: 'audiencia', type: 'text'}])
  }
];

// Datos de ejemplo para recursos
const sampleResources = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Template de Presentación Corporativa',
    description: 'Plantilla profesional para presentaciones corporativas con diseño moderno',
    type: 'document',
    url: 'https://example.com/template-presentacion.pptx',
    category: 'Templates',
    tags: ['presentación', 'corporativo', 'template'],
    is_public: true,
    download_count: 45
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Pack de Iconos para Redes Sociales',
    description: 'Colección de 50 iconos vectoriales para uso en redes sociales',
    type: 'image',
    url: 'https://example.com/iconos-redes-sociales.zip',
    category: 'Iconos',
    tags: ['iconos', 'redes sociales', 'vectorial'],
    is_public: true,
    download_count: 78
  }
];

// Datos de ejemplo para scripts
const sampleScripts = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Script para Video Promocional',
    content: 'FADE IN:\n\nINT. OFICINA MODERNA - DÍA\n\nUna oficina luminosa y moderna. MARÍA (30s), profesional y confiada, trabaja en su escritorio.\n\nMARÍA\n(mirando a cámara)\n¿Cansado de las mismas estrategias de marketing?\n\n(pausa dramática)\n\nEn Red Creativa Pro, transformamos ideas en resultados extraordinarios.\n\nCUT TO:\n\nMONTAJE - CASOS DE ÉXITO\n\nSecuencia rápida mostrando diferentes proyectos exitosos.\n\nMARÍA (V.O.)\nMás de 500 empresas confían en nosotros.\n\nFADE OUT.',
    type: 'youtube',
    language: 'es',
    duration_seconds: 60,
    word_count: 85,
    status: 'published',
    tags: ['promocional', 'video', 'marketing']
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Guión para Podcast Episodio 1',
    content: '[INTRO MUSICAL - 10 segundos]\n\nHOST: Bienvenidos a "Creatividad Sin Límites", el podcast donde exploramos las últimas tendencias en marketing digital y creatividad.\n\nSoy [NOMBRE], y en este primer episodio hablaremos sobre cómo las pequeñas empresas pueden competir con las grandes corporaciones usando estrategias creativas de bajo costo.\n\n[PAUSA]\n\nPero antes, déjame contarte una historia...',
    type: 'general',
    language: 'es',
    duration_seconds: 1800,
    word_count: 250,
    status: 'draft',
    tags: ['podcast', 'marketing', 'creatividad']
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando proceso de seed de la base de datos...');

    // Insertar usuarios de ejemplo
    console.log('👥 Insertando usuarios...');
    const { error: usersError } = await supabase
      .from('users')
      .upsert(sampleUsers, { onConflict: 'id' });
    
    if (usersError) {
      console.error('Error insertando usuarios:', usersError);
    } else {
      console.log('✅ Usuarios insertados correctamente');
    }

    // Insertar proyectos
    console.log('📁 Insertando proyectos...');
    const { error: projectsError } = await supabase
      .from('projects')
      .insert(sampleProjects);
    
    if (projectsError) {
      console.error('Error insertando proyectos:', projectsError);
    } else {
      console.log('✅ Proyectos insertados correctamente');
    }

    // Insertar tareas
    console.log('✅ Insertando tareas...');
    const { error: tasksError } = await supabase
      .from('tasks')
      .insert(sampleTasks);
    
    if (tasksError) {
      console.error('Error insertando tareas:', tasksError);
    } else {
      console.log('✅ Tareas insertadas correctamente');
    }

    // Insertar eventos de calendario
    console.log('📅 Insertando eventos de calendario...');
    const { error: eventsError } = await supabase
      .from('calendar_events')
      .insert(sampleCalendarEvents);
    
    if (eventsError) {
      console.error('Error insertando eventos:', eventsError);
    } else {
      console.log('✅ Eventos insertados correctamente');
    }

    // Insertar posts de blog
    console.log('📝 Insertando posts de blog...');
    const { error: postsError } = await supabase
      .from('blog_posts')
      .insert(sampleBlogPosts);
    
    if (postsError) {
      console.error('Error insertando posts:', postsError);
    } else {
      console.log('✅ Posts insertados correctamente');
    }

    // Insertar prompts
    console.log('💡 Insertando prompts...');
    const { error: promptsError } = await supabase
      .from('prompts')
      .insert(samplePrompts);
    
    if (promptsError) {
      console.error('Error insertando prompts:', promptsError);
    } else {
      console.log('✅ Prompts insertados correctamente');
    }

    // Insertar recursos
    console.log('📚 Insertando recursos...');
    const { error: resourcesError } = await supabase
      .from('resources')
      .insert(sampleResources);
    
    if (resourcesError) {
      console.error('Error insertando recursos:', resourcesError);
    } else {
      console.log('✅ Recursos insertados correctamente');
    }

    // Insertar scripts
    console.log('🎬 Insertando scripts...');
    const { error: scriptsError } = await supabase
      .from('scripts')
      .insert(sampleScripts);
    
    if (scriptsError) {
      console.error('Error insertando scripts:', scriptsError);
    } else {
      console.log('✅ Scripts insertados correctamente');
    }

    console.log('🎉 ¡Proceso de seed completado exitosamente!');
    console.log('\n📊 Resumen de datos insertados:');
    console.log(`   • ${sampleUsers.length} usuarios`);
    console.log(`   • ${sampleProjects.length} proyectos`);
    console.log(`   • ${sampleTasks.length} tareas`);
    console.log(`   • ${sampleCalendarEvents.length} eventos de calendario`);
    console.log(`   • ${sampleBlogPosts.length} posts de blog`);
    console.log(`   • ${samplePrompts.length} prompts`);
    console.log(`   • ${sampleResources.length} recursos`);
    console.log(`   • ${sampleScripts.length} scripts`);
    
  } catch (error) {
    console.error('❌ Error durante el proceso de seed:', error);
  }
}

// Función para limpiar la base de datos (opcional)
async function clearDatabase() {
  try {
    console.log('🧹 Limpiando base de datos...');
    
    const tables = ['scripts', 'resources', 'prompts', 'blog_posts', 'calendar_events', 'tasks', 'projects', 'users'];
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Eliminar todos excepto un ID imposible
      
      if (error) {
        console.error(`Error limpiando tabla ${table}:`, error);
      } else {
        console.log(`✅ Tabla ${table} limpiada`);
      }
    }
    
    console.log('🎉 Base de datos limpiada exitosamente');
  } catch (error) {
    console.error('❌ Error limpiando la base de datos:', error);
  }
}

// Ejecutar según el argumento de línea de comandos
const command = process.argv[2];

if (command === 'clear') {
  clearDatabase();
} else if (command === 'seed') {
  seedDatabase();
} else if (command === 'reset') {
  console.log('🔄 Reiniciando base de datos...');
  await clearDatabase();
  await seedDatabase();
} else {
  console.log('\n🌱 Script de Seed para Red Creativa Pro');
  console.log('\nUso:');
  console.log('  node seed.js seed   - Insertar datos de ejemplo');
  console.log('  node seed.js clear  - Limpiar todos los datos');
  console.log('  node seed.js reset  - Limpiar e insertar datos nuevos');
  console.log('\n⚠️  Asegúrate de configurar las variables de entorno:');
  console.log('  VITE_SUPABASE_URL');
  console.log('  SUPABASE_SERVICE_ROLE_KEY');
}