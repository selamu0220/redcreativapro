'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '../../ui/scroll-area';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { useToast } from '../../hooks/use-toast';
import { useQuickRefresh } from '../../hooks/useQuickRefresh';
import { useRouter } from 'next/navigation';
import { generateScriptWithAI } from "../../lib/ai";
import { Send, Bot, Loader2, Settings, Sparkles, Save, Copy, FileText, Star, Calendar, Image, FolderOpen, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, AlertDescription } from '../../ui/alert';
import { AIProviderDialog } from './AIProviderDialog';
import { mockPrompts } from '../../data/mockPrompts';
import { Prompt } from '../../types/prompts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import UsageLimits from "../common/UsageLimits";
import { EventType } from '../../types/calendar';
import { Resource } from '../../types/resources';
import { ThumbnailSettings } from '../../types/thumbnails';
import { mockEvents } from '../../data/mockEvents';
import { mockResources } from '../../data/mockResources';

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
    text: "infografÃ­as",
    action: "infografÃ­as",
    category: 'creative'
  },
  { 
    text: "Generar guion de video",
    action: "Necesito un guion profesional para un video sobre [tema]. El video debe tener una duraciÃ³n aproximada de [X] minutos y estar dirigido a una audiencia de [tipo]. El tono debe ser [formal/informal/educativo/entretenido].",
    category: 'content'
  },
  { 
    text: "Ideas de contenido",
    action: "Genera 10 ideas de contenido para [plataforma] enfocadas en [nicho/tema]. Las ideas deben ser originales, tendencia y tener potencial viral. Incluye tÃ­tulos atractivos y breves descripciones.",
    category: 'content'
  },
  { 
    text: "Estrategia marketing",
    action: "Desarrolla una estrategia de marketing digital para [objetivo]. Incluye canales, tÃ¡cticas, presupuesto estimado, timeline y KPIs.",
    category: 'marketing'
  }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<string>('chat');
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
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Hook para refrescado rÃ¡pido
  const { isRefreshing } = useQuickRefresh({
    onRefresh: async () => {
      // Solo limpiar el input, mantener mensajes
      setInput('');
      
      toast({
        title: 'âœ… Chat actualizado',
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
    
    // Comandos simples y rÃ¡pidos
    if (command.includes('evento') || command.includes('calendario')) {
      return `ðŸ“… **Acceso rÃ¡pido al Calendario**\n\nâœ¨ Haz clic en el botÃ³n "Ir al Calendario" para:\nâ€¢ Ver todos tus eventos\nâ€¢ Crear nuevos eventos fÃ¡cilmente\nâ€¢ Gestionar tu programaciÃ³n\n\nðŸš€ Â¡Es sÃºper fÃ¡cil y rÃ¡pido!`;
    }
    
    if (command.includes('recurso') || command.includes('plantilla') || command.includes('archivo')) {
      return `ðŸ“ **Acceso rÃ¡pido a Recursos**\n\nâœ¨ Haz clic en el botÃ³n "Ir a Recursos" para:\nâ€¢ Buscar cualquier recurso\nâ€¢ Subir nuevos archivos\nâ€¢ Organizar tus plantillas\n\nðŸš€ Â¡Todo en un solo lugar!`;
    }
    
    if (command.includes('miniatura') || command.includes('thumbnail') || command.includes('diseÃ±o')) {
      return `ðŸŽ¨ **Acceso rÃ¡pido a Miniaturas**\n\nâœ¨ Haz clic en el botÃ³n "Ir a Miniaturas" para:\nâ€¢ Crear diseÃ±os increÃ­bles\nâ€¢ Usar plantillas predefinidas\nâ€¢ Personalizar tus miniaturas\n\nðŸš€ Â¡DiseÃ±a en segundos!`;
    }
    
    if (command.includes('infografÃ­a') || command.includes('infographic') || command.includes('grÃ¡fico')) {
      return `ðŸ“Š **Acceso rÃ¡pido a InfografÃ­as**\n\nâœ¨ Haz clic en el botÃ³n "Crear InfografÃ­a" para:\nâ€¢ Generar infografÃ­as con IA\nâ€¢ Usar estilos predefinidos\nâ€¢ Descargar en PNG o video\n\nðŸš€ Â¡Crea contenido visual impactante!`;
    }
    
    // Comando para crear evento
    if (input.startsWith('/crear-evento')) {
      const eventData = input.replace('/crear-evento', '').trim();
      const eventInfo = parseEventCommand(eventData);
      if (eventInfo) {
        return `He procesado tu solicitud para crear un evento:\n\n**${eventInfo.title}**\nðŸ“… Fecha: ${eventInfo.date}\nðŸ• Hora: ${eventInfo.time}\nðŸ“ DescripciÃ³n: ${eventInfo.description}\nðŸ·ï¸ Tipo: ${eventInfo.type}\n\n*Para crear el evento definitivamente, usa el calendario de la aplicaciÃ³n.*`;
      }
      return 'Por favor, proporciona los datos del evento en el formato: TÃ­tulo: [tÃ­tulo] Fecha: [fecha] Hora: [hora] DescripciÃ³n: [descripciÃ³n] Tipo: [tipo]';
    }

    // Comando para buscar recursos
    if (input.startsWith('/buscar-recursos')) {
      const searchQuery = input.replace('/buscar-recursos', '').trim();
      const foundResources = searchResources(searchQuery);
      if (foundResources.length > 0) {
        const resourceList = foundResources.slice(0, 5).map(r => 
          `â€¢ **${r.title}** (${r.type}) - ${r.description}`
        ).join('\n');
        return `EncontrÃ© ${foundResources.length} recursos relacionados:\n\n${resourceList}\n\n*Visita la secciÃ³n de Recursos para ver mÃ¡s detalles.*`;
      }
      return 'No encontrÃ© recursos que coincidan con tu bÃºsqueda. Intenta con otros tÃ©rminos.';
    }

    // Comando para crear miniatura
    if (input.startsWith('/crear-miniatura')) {
      const thumbnailData = input.replace('/crear-miniatura', '').trim();
      const thumbnailInfo = parseThumbnailCommand(thumbnailData);
      if (thumbnailInfo) {
        return `He preparado la configuraciÃ³n para tu miniatura:\n\nðŸŽ¨ **TÃ­tulo:** ${thumbnailInfo.title}\nðŸ“ **Formato:** ${thumbnailInfo.format}\n\n*Ve a la secciÃ³n de Miniaturas para crear y personalizar tu diseÃ±o.*`;
      }
      return 'Por favor, proporciona los datos en el formato: TÃ­tulo: [tÃ­tulo] Formato: [formato]';
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

  // Funciones simplificadas para acceso rÃ¡pido
  const getQuickHelp = () => {
    return `ðŸš€ **Acceso sÃºper rÃ¡pido a tus herramientas**\n\n` +
           `ðŸ“… **Calendario**: Escribe "calendario" o "evento"\n` +
           `ðŸ“ **Recursos**: Escribe "recursos" o "plantillas"\n` +
           `ðŸŽ¨ **Miniaturas**: Escribe "miniaturas" o "diseÃ±o"\n` +
           `ðŸ“Š **InfografÃ­as**: Escribe "infografÃ­as" o "grÃ¡fico"\n\n` +
           `âœ¨ Â¡Es asÃ­ de fÃ¡cil! Solo menciona lo que necesitas.`;
  };

  const parseEventCommand = (data: string) => {
    const titleMatch = data.match(/TÃ­tulo:\s*([^\n]+)/);
    const dateMatch = data.match(/Fecha:\s*([^\n]+)/);
    const timeMatch = data.match(/Hora:\s*([^\n]+)/);
    const descMatch = data.match(/DescripciÃ³n:\s*([^\n]+)/);
    const typeMatch = data.match(/Tipo:\s*([^\n]+)/);

    if (titleMatch && dateMatch) {
      return {
        title: titleMatch[1],
        date: dateMatch[1],
        time: timeMatch?.[1] || 'No especificada',
        description: descMatch?.[1] || 'Sin descripciÃ³n',
        type: typeMatch?.[1] || 'General'
      };
    }
    return null;
  };

  const parseThumbnailCommand = (data: string) => {
    const titleMatch = data.match(/TÃ­tulo:\s*([^\n]+)/);
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
        (resource.description && resource.description.toLowerCase().includes(term)) ||
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

    return `ðŸ“Š **AnÃ¡lisis de Recursos${category ? ` - ${category}` : ''}**\n\n` +
           `ðŸ“ Total de recursos: ${totalResources}\n` +
           `ðŸ·ï¸ Tipos disponibles: ${types.join(', ')}\n` +
           `â­ CalificaciÃ³n promedio: ${avgRating.toFixed(1)}/5\n\n` +
           `**Recomendaciones:**\n` +
           `â€¢ Considera agregar mÃ¡s recursos de tipos menos representados\n` +
           `â€¢ Revisa y actualiza recursos con calificaciones bajas\n` +
           `â€¢ Organiza mejor las etiquetas para facilitar bÃºsquedas`;
  };

  const optimizeCalendar = (month: string): string => {
    const monthEvents = events.filter(event => {
      const eventMonth = new Date(event.start).toLocaleDateString('es-ES', { month: 'long' });
      return month ? eventMonth.toLowerCase().includes(month.toLowerCase()) : true;
    });

    const totalEvents = monthEvents.length;
    const eventTypes = [...new Set(monthEvents.map(e => e.title))];
    const busyDays = [...new Set(monthEvents.map(e => new Date(e.start).getDate()))].length;

    return `ðŸ“… **OptimizaciÃ³n de Calendario${month ? ` - ${month}` : ''}**\n\n` +
           `ðŸ“Š Total de eventos: ${totalEvents}\n` +
           `ðŸ·ï¸ Tipos de eventos: ${eventTypes.join(', ')}\n` +
           `ðŸ“† DÃ­as ocupados: ${busyDays}\n\n` +
           `**Sugerencias de optimizaciÃ³n:**\n` +
           `â€¢ Distribuye mejor los eventos a lo largo del mes\n` +
           `â€¢ Considera agrupar eventos similares\n` +
           `â€¢ Deja espacios libres para contenido espontÃ¡neo\n` +
           `â€¢ Planifica con anticipaciÃ³n eventos importantes`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

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
        <Tabs value={mode} onValueChange={setMode}>
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



      <div className="flex-1 border rounded-lg p-4 mb-4 relative">
        {mode === 'chat' ? (
          <ScrollArea ref={scrollRef} className="h-full pr-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Â¡Hola! Soy tu asistente sÃºper fÃ¡cil</h3>
                  <p className="text-muted-foreground">
                    ðŸš€ Acceso instantÃ¡neo a todas tus herramientas. 
                    Solo escribe lo que necesitas: <strong>calendario</strong>, <strong>recursos</strong> o <strong>miniaturas</strong>.
                    Â¡Es asÃ­ de simple!
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm border border-green-200 dark:border-green-800">
                    <h4 className="font-medium mb-2 text-green-900 dark:text-green-100 flex items-center gap-2">
                      âœ¨ Acceso SÃºper RÃ¡pido
                    </h4>
                    <div className="space-y-1 text-xs text-green-700 dark:text-green-300">
                      <div>âœ¨ Escribe <strong>"calendario"</strong> para gestionar eventos</div>
                      <div>âœ¨ Escribe <strong>"recursos"</strong> para buscar plantillas</div>
                      <div>âœ¨ Escribe <strong>"miniaturas"</strong> para crear diseÃ±os</div>
                      <div>âœ¨ Escribe <strong>"infografÃ­as"</strong> para crear grÃ¡ficos</div>
                      <div className="mt-2 text-green-600 dark:text-green-400">ðŸš€ Â¡Es asÃ­ de fÃ¡cil!</div>
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
                      
                      {/* Botones de acciÃ³n rÃ¡pida para comandos especiales */}
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
                                  description: "Ve a la secciÃ³n de recursos para explorar mÃ¡s"
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
                                  description: "Ve a la secciÃ³n de miniaturas para crear tu diseÃ±o"
                                });
                              }}
                            >
                              <Image className="h-3 w-3 mr-1" />
                              Crear Miniatura
                            </Button>
                          )}
                          {message.content.includes('infografÃ­a') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                // Navegar a infografÃ­as
                                navigate('/infografias');
                                toast({
                                  title: "Navegando a InfografÃ­as",
                                  description: "Ve a la secciÃ³n de infografÃ­as para crear tu diseÃ±o"
                                });
                              }}
                            >
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Crear InfografÃ­a
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
                                  title: "PrÃ³ximamente",
                                  description: "La funciÃ³n de guardar prompts estarÃ¡ disponible pronto"
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
                    <SelectValue placeholder="Filtrar por categorÃ­a" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorÃ­as</SelectItem>
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
                            +{prompt.tags.length - 2} mÃ¡s
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
