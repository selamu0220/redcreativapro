import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateScriptWithAI } from '@/lib/ai';
import { Send, Bot, Loader2, Settings, Sparkles, Save, Copy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIProviderDialog } from './AIProviderDialog';

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
    text: "Generar guion de video",
    action: "Necesito un guion profesional para un video sobre [tema]. El video debe tener una duración aproximada de [X] minutos y estar dirigido a una audiencia de [tipo]. El tono debe ser [formal/informal/educativo/entretenido].",
    category: 'content'
  },
  { 
    text: "Optimizar miniatura",
    action: "Analiza esta miniatura para YouTube: [título]. Necesito sugerencias para mejorar el impacto visual, la legibilidad y la tasa de clics. Considera elementos como colores, tipografía, composición y elementos visuales.",
    category: 'creative'
  },
  { 
    text: "Ideas de contenido",
    action: "Genera 10 ideas de contenido para [plataforma] enfocadas en [nicho/tema]. Las ideas deben ser originales, tendencia y tener potencial viral. Incluye títulos atractivos y breves descripciones.",
    category: 'content'
  },
  { 
    text: "Optimización SEO",
    action: "Analiza y optimiza el SEO para este contenido: [texto]. Necesito palabras clave principales y secundarias, meta descripción, estructura de encabezados y sugerencias para mejorar el posicionamiento.",
    category: 'seo'
  },
  { 
    text: "Calendario editorial",
    action: "Crea un calendario editorial para [mes] enfocado en [tema/nicho]. Incluye fechas, tipos de contenido, plataformas, objetivos y métricas de éxito.",
    category: 'marketing'
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    setInput('');
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

  const filteredSuggestions = selectedCategory === 'all'
    ? suggestions
    : suggestions.filter(s => s.category === selectedCategory);

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
        <ScrollArea ref={scrollRef} className="h-full pr-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <Bot className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">¡Bienvenido al Chat IA!</h3>
                <p className="text-sm text-muted-foreground">
                  Pregúntame cualquier cosa sobre gestión de contenido, marketing digital o creación de contenido.
                </p>
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
              disabled={isLoading || !isAuthenticated}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim() || !isAuthenticated}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </>
        ) : (
          <Textarea
            placeholder="Escribe o edita tu prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px] font-mono"
            disabled={!isAuthenticated}
          />
        )}
      </div>

      <AIProviderDialog
        open={isAIDialogOpen}
        onOpenChange={setIsAIDialogOpen}
        onContinue={handleSend}
      />
    </div>
  );
}