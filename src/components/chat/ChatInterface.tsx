import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useQuickRefresh } from '@/hooks/useQuickRefresh';
import { useNavigate } from 'react-router-dom';
import { generateScriptWithAI } from '@/lib/ai';
import { Send, Bot, Loader2, Settings, Sparkles, Save, Copy, FileText, Star, Calendar, Image, FolderOpen, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIProviderDialog } from './AIProviderDialog';
import { mockPrompts } from '@/data/mockPrompts';
import { Prompt } from '@/types/prompts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UsageLimits from '@/components/common/UsageLimits';
import { EventType } from '@/types/calendar';
import { Resource } from '@/types/resources';
import { ThumbnailSettings } from '@/types/thumbnails';
import { mockEvents } from '@/data/mockEvents';
import { mockResources } from '@/data/mockResources';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSuggestion {
  text: string;
  action: string;
  category: 'content' | 'marketing' | 'seo' | 'creative';
}

const suggestions: ChatSuggestion[] = [
  { 
    text: "calendario",
    action: "calendario",
    category: 'content'
  },
  { 
    text: "recursos",
    action: "recursos",
    category: 'content'
  },
  { 
    text: "miniaturas",
    action: "miniaturas",
    category: 'creative'
  },
  { 
    text: "infografías",
    action: "infografías",
    category: 'creative'
  },
  { 
    text: "Generar guion de video",
    action: "Necesito un guion profesional para un video sobre [tema]. El video debe tener una duración aproximada de [X] minutos y estar dirigido a una audiencia de [tipo]. El tono debe ser [formal/informal/educativo/entretenido].",
    category: 'content'
  },
  { 
    text: "Ideas de contenido",
    action: "Genera 10 ideas de contenido para [plataforma] enfocadas en [nicho/tema]. Las ideas deben ser originales, tendencia y tener potencial viral. Incluye títulos atractivos y breves descripciones.",
    category: 'content'
  },
  { 
    text: "Estrategia marketing",
    action: "Desarrolla una estrategia de marketing digital para [objetivo]. Incluye canales, tácticas, presupuesto estimado, timeline y KPIs.",
    category: 'marketing'
  }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'prompt'>('chat');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [prompts] = useState<Prompt[]>(mockPrompts);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [promptCategory, setPromptCategory] = useState<string>('all');
  const [events] = useState<EventType[]>(mockEvents);
  const [resources] = useState<Resource[]>(mockResources);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Hook para refrescado rápido
  const { isRefreshing } = useQuickRefresh({
    onRefresh: async () => {
      // Solo limpiar el input, mantener mensajes
      setInput('');
      
      toast({
        title: '✅ Chat actualizado',
        description: 'El chat se ha refrescado correctamente',
      });
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const processSpecialCommands = async (input: string): Promise<string | null> => {
    const command = input.toLowerCase().trim();
    
    // Comandos simples y rápidos
    if (command.includes('evento') || command.includes('calendario')) {
      return `📅 **Acceso rápido al Calendario**\n\n✨ Haz clic en el botón "Ir al Calendario" para:\n• Ver todos tus eventos\n• Crear nuevos eventos fácilmente\n• Gestionar tu programación\n\n🚀 ¡Es súper fácil y rápido!`;
    }
    
    if (command.includes('recurso') || command.includes('plantilla') || command.includes('archivo')) {
      return `📁 **Acceso rápido a Recursos**\n\n✨ Haz clic en el botón "Ir a Recursos" para:\n• Buscar cualquier recurso\n• Subir nuevos archivos\n• Organizar tus plantillas\n\n🚀 ¡Todo en un solo lugar!`;
    }
    
    if (command.includes('miniatura') || command.includes('thumbnail') || command.includes('diseño')) {
      return `🎨 **Acceso rápido a Miniaturas**\n\n✨ Haz clic en el botón "Ir a Miniaturas" para:\n• Crear diseños increíbles\n• Usar plantillas predefinidas\n• Personalizar tus miniaturas\n\n🚀 ¡Diseña en segundos!`;
    }
    
    if (command.includes('infografía') || command.includes('infographic') || command.includes('gráfico')) {
      return `📊 **Acceso rápido a Infografías**\n\n✨ Haz clic en el botón "Crear Infografía" para:\n• Generar infografías con IA\n• Usar estilos predefinidos\n• Descargar en PNG o video\n\n🚀 ¡Crea contenido visual impactante!`;
    }
    
    // Comando para crear evento
    if (input.startsWith('/crear-evento')) {
      const eventData = input.replace('/crear-evento', '').trim();
      const eventInfo = parseEventCommand(eventData);
      if (eventInfo) {
        return `He procesado tu solicitud para crear un evento:\n\n**${eventInfo.title}**\n📅 Fecha: ${eventInfo.date}\n🕐 Hora: ${eventInfo.time}\n📝 Descripción: ${eventInfo.description}\n🏷️ Tipo: ${eventInfo.type}\n\n*Para crear el evento definitivamente, usa el calendario de la aplicación.*`;
      }
      return 'Por favor, proporciona los datos del evento en el formato: Título: [título] Fecha: [fecha] Hora: [hora] Descripción: [descripción] Tipo: [tipo]';
    }

    // Comando para buscar recursos
    if (input.startsWith('/buscar-recursos')) {
      const searchQuery = input.replace('/buscar-recursos', '').trim();
      const foundResources = searchResources(searchQuery);
      if (foundResources.length > 0) {
        const resourceList = foundResources.slice(0, 5).map(r => 
          `• **${r.title}** (${r.type}) - ${r.description}`
        ).join('\n');
        return `Encontré ${foundResources.length} recursos relacionados:\n\n${resourceList}\n\n*Visita la sección de Recursos para ver más detalles.*`;
      }
      return 'No encontré recursos que coincidan con tu búsqueda. Intenta con otros términos.';
    }

    // Comando para crear miniatura
    if (input.startsWith('/crear-miniatura')) {
      const thumbnailData = input.replace('/crear-miniatura', '').trim();
      const thumbnailInfo = parseThumbnailCommand(thumbnailData);
      if (thumbnailInfo) {
        return `He preparado la configuración para tu miniatura:\n\n🎨 **Título:** ${thumbnailInfo.title}\n📐 **Formato:** ${thumbnailInfo.format}\n\n*Ve a la sección de Miniaturas para crear y personalizar tu diseño.*`;
      }
      return 'Por favor, proporciona los datos en el formato: Título: [título] Formato: [formato]';
    }

    // Comando para analizar recursos
    if (input.startsWith('/analizar-recursos')) {
      const category = input.replace('/analizar-recursos', '').trim();
      const analysis = analyzeResources(category);
      return analysis;
    }

    // Comando para optimizar calendario
    if (input.startsWith('/optimizar-calendario')) {
      const month = input.replace('/optimizar-calendario', '').trim();
      const optimization = optimizeCalendar(month);
      return optimization;
    }

    return null;
  };

  // Funciones simplificadas para acceso rápido
  const getQuickHelp = () => {
    return `🚀 **Acceso súper rápido a tus herramientas**\n\n` +
           `📅 **Calendario**: Escribe "calendario" o "evento"\n` +
           `📁 **Recursos**: Escribe "recursos" o "plantillas"\n` +
           `🎨 **Miniaturas**: Escribe "miniaturas" o "diseño"\n` +
           `📊 **Infografías**: Escribe "infografías" o "gráfico"\n\n` +
           `✨ ¡Es así de fácil! Solo menciona lo que necesitas.`;
  };

  const parseEventCommand = (data: string) => {
    const titleMatch = data.match(/Título:\s*([^\n]+)/);
    const dateMatch = data.match(/Fecha:\s*([^\n]+)/);
    const timeMatch = data.match(/Hora:\s*([^\n]+)/);
    const descMatch = data.match(/Descripción:\s*([^\n]+)/);
    const typeMatch = data.match(/Tipo:\s*([^\n]+)/);

    if (titleMatch && dateMatch) {
      return {
        title: titleMatch[1],
        date: dateMatch[1],
        time: timeMatch?.[1] || 'No especificada',
        description: descMatch?.[1] || 'Sin descripción',
        type: typeMatch?.[1] || 'General'
      };
    }
    return null;
  };

  const parseThumbnailCommand = (data: string) => {
    const titleMatch = data.match(/Título:\s*([^\n]+)/);
    const formatMatch = data.match(/Formato:\s*([^\n]+)/);

    if (titleMatch) {
      return {
        title: titleMatch[1],
        format: formatMatch?.[1] || 'youtube'
      };
    }
    return null;
  };

  const searchResources = (query: string): Resource[] => {
    const searchTerms = query.toLowerCase().split(' ');
    return resources.filter(resource => 
      searchTerms.some(term => 
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.type.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      )
    );
  };

  const analyzeResources = (category: string): string => {
    const categoryResources = category ? 
      resources.filter(r => r.type.toLowerCase().includes(category.toLowerCase())) : 
      resources;

    const totalResources = categoryResources.length;
    const types = [...new Set(categoryResources.map(r => r.type))];
    const avgRating = categoryResources.reduce((sum, r) => sum + (r.rating || 0), 0) / totalResources;

    return `📊 **Análisis de Recursos${category ? ` - ${category}` : ''}**\n\n` +
           `📁 Total de recursos: ${totalResources}\n` +
           `🏷️ Tipos disponibles: ${types.join(', ')}\n` +
           `⭐ Calificación promedio: ${avgRating.toFixed(1)}/5\n\n` +
           `**Recomendaciones:**\n` +
           `• Considera agregar más recursos de tipos menos representados\n` +
           `• Revisa y actualiza recursos con calificaciones bajas\n` +
           `• Organiza mejor las etiquetas para facilitar búsquedas`;
  };

  const optimizeCalendar = (month: string): string => {
    const monthEvents = events.filter(event => {
      const eventMonth = new Date(event.date).toLocaleDateString('es-ES', { month: 'long' });
      return month ? eventMonth.toLowerCase().includes(month.toLowerCase()) : true;
    });

    const totalEvents = monthEvents.length;
    const eventTypes = [...new Set(monthEvents.map(e => e.type))];
    const busyDays = [...new Set(monthEvents.map(e => new Date(e.date).getDate()))].length;

    return `📅 **Optimización de Calendario${month ? ` - ${month}` : ''}**\n\n` +
           `📊 Total de eventos: ${totalEvents}\n` +
           `🏷️ Tipos de eventos: ${eventTypes.join(', ')}\n` +
           `📆 Días ocupados: ${busyDays}\n\n` +
           `**Sugerencias de optimización:**\n` +
           `• Distribuye mejor los eventos a lo largo del mes\n` +
           `• Considera agrupar eventos similares\n` +
           `• Deja espacios libres para contenido espontáneo\n` +
           `• Planifica con anticipación eventos importantes`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Regístrate o inicia sesión para usar el chat de IA",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Primero verificar si es un comando especial
      const specialResponse = await processSpecialCommands(currentInput);
      
      if (specialResponse) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: specialResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setShowActionButtons(true);
      } else {
        // Check if AI settings are configured
        const aiSettings = localStorage.getItem('aiSettings');
        if (!aiSettings) {
          setIsAIDialogOpen(true);
          return;
        }

        // Procesar con IA normal
        const response = await generateScriptWithAI(currentInput);
        
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: ChatSuggestion) => {
    setInput(suggestion.action);
  };

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copiado",
        description: "El contenido ha sido copiado al portapapeles"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el contenido",
        variant: "destructive"
      });
    }
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setInput(prompt.content);
  };

  const handleUsePrompt = async () => {
    if (!selectedPrompt || !input.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Regístrate o inicia sesión para usar los prompts",
        variant: "destructive"
      });
      return;
    }

    // Check if AI settings are configured
    const aiSettings = localStorage.getItem('aiSettings');
    if (!aiSettings) {
      setIsAIDialogOpen(true);
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateScriptWithAI(input);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Switch to chat mode to see the conversation
      setMode('chat');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSuggestions = selectedCategory === 'all'
    ? suggestions
    : suggestions.filter(s => s.category === selectedCategory);

  const filteredPrompts = promptCategory === 'all'
    ? prompts
    : prompts.filter(p => p.category === promptCategory);

  const promptCategories = Array.from(new Set(prompts.map(p => p.category)));

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat IA</h1>
          <p className="text-muted-foreground">
            Gestiona tu contenido con ayuda de IA
          </p>
        </div>
        <Tabs value={mode} onValueChange={(value: 'chat' | 'prompt') => setMode(value)}>
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Prompts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {!isAuthenticated && (
        <Alert className="mb-4">
          <AlertDescription className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Inicia sesión para usar el chat de IA y acceder a todas las funcionalidades
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 border rounded-lg p-4 mb-4 relative">
        {mode === 'chat' ? (
          <ScrollArea ref={scrollRef} className="h-full pr-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">¡Hola! Soy tu asistente súper fácil</h3>
                  <p className="text-muted-foreground">
                    🚀 Acceso instantáneo a todas tus herramientas. 
                    Solo escribe lo que necesitas: <strong>calendario</strong>, <strong>recursos</strong> o <strong>miniaturas</strong>.
                    ¡Es así de simple!
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm border border-green-200 dark:border-green-800">
                    <h4 className="font-medium mb-2 text-green-900 dark:text-green-100 flex items-center gap-2">
                      ✨ Acceso Súper Rápido
                    </h4>
                    <div className="space-y-1 text-xs text-green-700 dark:text-green-300">
                      <div>✨ Escribe <strong>"calendario"</strong> para gestionar eventos</div>
                      <div>✨ Escribe <strong>"recursos"</strong> para buscar plantillas</div>
                      <div>✨ Escribe <strong>"miniaturas"</strong> para crear diseños</div>
                      <div>✨ Escribe <strong>"infografías"</strong> para crear gráficos</div>
                      <div className="mt-2 text-green-600 dark:text-green-400">🚀 ¡Es así de fácil!</div>
                    </div>
                  </div>
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="content">Contenido</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="creative">Creatividad</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex flex-wrap gap-2 justify-center">
                  {filteredSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion.text}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.text}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'assistant'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert">
                        {message.content}
                      </div>
                      
                      {/* Botones de acción rápida para comandos especiales */}
                      {message.role === 'assistant' && showActionButtons && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.content.includes('evento') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                // Navegar al calendario
                                navigate('/calendario');
                                toast({
                                  title: "Navegando al Calendario",
                                  description: "Ve al calendario para crear tu evento"
                                });
                              }}
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              Ir al Calendario
                            </Button>
                          )}
                          {message.content.includes('recursos') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                // Navegar a recursos
                                navigate('/recursos');
                                toast({
                                  title: "Navegando a Recursos",
                                  description: "Ve a la sección de recursos para explorar más"
                                });
                              }}
                            >
                              <FolderOpen className="h-3 w-3 mr-1" />
                              Ver Recursos
                            </Button>
                          )}
                          {message.content.includes('miniatura') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                // Navegar a miniaturas
                                navigate('/thumbnails');
                                toast({
                                  title: "Navegando a Miniaturas",
                                  description: "Ve a la sección de miniaturas para crear tu diseño"
                                });
                              }}
                            >
                              <Image className="h-3 w-3 mr-1" />
                              Crear Miniatura
                            </Button>
                          )}
                          {message.content.includes('infografía') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                // Navegar a infografías
                                navigate('/infografias');
                                toast({
                                  title: "Navegando a Infografías",
                                  description: "Ve a la sección de infografías para crear tu diseño"
                                });
                              }}
                            >
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Crear Infografía
                            </Button>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center justify-between text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyMessage(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {message.role === 'assistant' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => {
                                // Implementar guardado de prompts
                                toast({
                                  title: "Próximamente",
                                  description: "La función de guardar prompts estará disponible pronto"
                                });
                              }}
                            >
                              <Save className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        ) : (
          <div className="h-full flex">
            {/* Lista de prompts */}
            <div className="w-1/2 border-r pr-4">
              <div className="mb-4">
                <Select value={promptCategory} onValueChange={setPromptCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {promptCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[calc(100%-60px)]">
                <div className="space-y-2">
                  {filteredPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedPrompt?.id === prompt.id
                          ? 'bg-accent border-primary'
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handlePromptSelect(prompt)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-sm">{prompt.title}</h4>
                          {prompt.isFavorite && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {prompt.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {prompt.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {prompt.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {prompt.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{prompt.tags.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Vista previa del prompt */}
            <div className="w-1/2 pl-4">
              {selectedPrompt ? (
                <div className="h-full flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{selectedPrompt.title}</h3>
                      {selectedPrompt.isFavorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{selectedPrompt.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Usado {selectedPrompt.usageCount} veces
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPrompt.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">Contenido del prompt:</p>
                    <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                      {selectedPrompt.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Selecciona un prompt</h3>
                    <p className="text-sm text-muted-foreground">
                      Elige un prompt de la lista para verlo y editarlo
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {mode === 'chat' ? (
          <>
            <Input
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </>
        ) : (
          <>
            <Textarea
              placeholder={selectedPrompt ? "Edita el prompt seleccionado..." : "Escribe tu prompt personalizado..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] font-mono flex-1"
              disabled={false}
            />
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleUsePrompt} 
                disabled={isLoading || !input.trim()}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Usar Prompt
                  </>
                )}
              </Button>
              {selectedPrompt && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setInput('');
                    setSelectedPrompt(null);
                  }}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      <AIProviderDialog
        open={isAIDialogOpen}
        onOpenChange={setIsAIDialogOpen}
        onContinue={handleSend}
      />
      
      {/* Usage Limits for Free Users */}
      <div className="mt-4">
        <UsageLimits />
      </div>
    </div>
  );
}