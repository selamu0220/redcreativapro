'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { CreditCard, LogOut, Settings, User, Crown } from 'lucide-react';
import { AIProvider, AIModel, GeminiModel, OpenAIModel, AnthropicModel, CohereModel, MistralModel } from '../../types/ai';

export function UserNav() {
  const { user, logout, hasActiveSubscription } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [aiProvider, setAIProvider] = useState<AIProvider>('gemini');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-pro');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const { toast } = useToast();

  useEffect(() => {
    if (isSettingsOpen) {
      const storedSettings = localStorage.getItem('aiSettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setAIProvider(settings.provider || 'gemini');
        setSelectedModel(settings.model || 'gemini-pro');
        setApiKey(settings.apiKey || '');
        setBaseUrl(settings.baseUrl || '');
        setTemperature(settings.temperature || 0.7);
        setMaxTokens(settings.maxTokens || 2048);
      }
    }
  }, [isSettingsOpen]);

  const validateApiKey = (key: string, provider: AIProvider): boolean => {
    const trimmedKey = key.trim();
    
    if (!trimmedKey) {
      toast({
        title: "API Key requerida",
        description: "Por favor, ingresa una API key válida",
        variant: "destructive"
      });
      return false;
    }

    switch (provider) {
      case 'gemini':
        if (!trimmedKey.startsWith('AI') || trimmedKey.length < 40) {
          toast({
            title: "API Key inválida",
            description: "La API key de Google AI Studio debe comenzar con 'AI' y tener al menos 40 caracteres",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 'openai':
        if (!trimmedKey.startsWith('sk-') || trimmedKey.length < 40) {
          toast({
            title: "API Key inválida",
            description: "La API key de OpenAI debe comenzar con 'sk-' y tener al menos 40 caracteres",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 'anthropic':
        if (!trimmedKey.startsWith('sk-ant-') || trimmedKey.length < 40) {
          toast({
            title: "API Key inválida",
            description: "La API key de Anthropic debe comenzar con 'sk-ant-' y tener al menos 40 caracteres",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 'cohere':
        if (trimmedKey.length < 20) {
          toast({
            title: "API Key inválida",
            description: "La API key de Cohere debe tener al menos 20 caracteres",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 'mistral':
        if (trimmedKey.length < 20) {
          toast({
            title: "API Key inválida",
            description: "La API key de Mistral debe tener al menos 20 caracteres",
            variant: "destructive"
          });
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  };

  const getAvailableModels = () => {
    switch (aiProvider) {
      case 'gemini':
        return [
          { value: 'gemini-pro', label: 'Gemini Pro' },
          { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
          { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
          { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
        ];
      case 'openai':
        return [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-4o', label: 'GPT-4o' },
          { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ];
      case 'anthropic':
        return [
          { value: 'claude-3-opus', label: 'Claude 3 Opus' },
          { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
          { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
          { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' }
        ];
      case 'cohere':
        return [
          { value: 'command-r', label: 'Command R' },
          { value: 'command-r-plus', label: 'Command R Plus' },
          { value: 'command-light', label: 'Command Light' }
        ];
      case 'mistral':
        return [
          { value: 'mistral-large', label: 'Mistral Large' },
          { value: 'mistral-medium', label: 'Mistral Medium' },
          { value: 'mistral-small', label: 'Mistral Small' },
          { value: 'codestral', label: 'Codestral' }
        ];
      default:
        return [];
    }
  };

  const handleSaveSettings = () => {
    if (!validateApiKey(apiKey, aiProvider)) {
      return;
    }

    const settings = {
      provider: aiProvider,
      model: selectedModel,
      apiKey: apiKey.trim(),
      temperature,
      maxTokens,
      ...(baseUrl && { baseUrl: baseUrl.trim() })
    };

    localStorage.setItem('aiSettings', JSON.stringify(settings));

    toast({
      title: "Configuración guardada",
      description: "La configuración de IA ha sido actualizada"
    });
    
    setIsSettingsOpen(false);
  };

  const getProviderInstructions = () => {
    switch (aiProvider) {
      case 'gemini':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key de Google AI Studio:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
              <li>Inicia sesión con tu cuenta de Google</li>
              <li>Crea una nueva API key o usa una existente</li>
              <li>La key debe comenzar con 'AI'</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelos disponibles:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Gemini Pro: Modelo estable</li>
              <li>Gemini 1.5 Pro: Modelo avanzado</li>
              <li>Gemini 2.0 Flash: Modelo más reciente y rápido</li>
            </ul>
          </div>
        );
      case 'openai':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key del panel de OpenAI:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Dashboard</a></li>
              <li>Crea una nueva API key</li>
              <li>La key debe comenzar con 'sk-'</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelos disponibles:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>GPT-4: Modelo estable</li>
              <li>GPT-4 Turbo: Modelo mejorado</li>
              <li>GPT-4o: Modelo más reciente y potente</li>
              <li>GPT-3.5 Turbo: Modelo más económico</li>
            </ul>
          </div>
        );
      case 'anthropic':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key del panel de Anthropic:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Console</a></li>
              <li>Crea una nueva API key</li>
              <li>La key debe comenzar con 'sk-ant-'</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelos disponibles:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Claude 3 Opus: Modelo más potente</li>
              <li>Claude 3 Sonnet: Equilibrio entre rendimiento y velocidad</li>
              <li>Claude 3 Haiku: Modelo más rápido</li>
              <li>Claude 3.5 Sonnet: Modelo más reciente</li>
            </ul>
          </div>
        );
      case 'cohere':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key del panel de Cohere:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cohere Dashboard</a></li>
              <li>Crea una nueva API key</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelos disponibles:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Command R: Modelo estándar</li>
              <li>Command R Plus: Modelo avanzado</li>
              <li>Command Light: Modelo ligero y rápido</li>
            </ul>
          </div>
        );
      case 'mistral':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key del panel de Mistral:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://console.mistral.ai/api-keys/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mistral Console</a></li>
              <li>Crea una nueva API key</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelos disponibles:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Mistral Large: Modelo más potente</li>
              <li>Mistral Medium: Equilibrio entre rendimiento y velocidad</li>
              <li>Mistral Small: Modelo más económico</li>
              <li>Codestral: Especializado en código</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <p>Selecciona un proveedor de IA para ver las instrucciones.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
              aria-label="User menu"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/124599?v=4"
                  alt={user?.name || 'User avatar'}
                />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'John Doe'}
                  </p>
                  {hasActiveSubscription() && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                      <Crown className="h-3 w-3" />
                      <span>PRO</span>
                    </div>
                  )}
                </div>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'john@example.com'}
                </p>
                {hasActiveSubscription() && (
                  <p className="text-xs leading-none text-green-600 font-medium">
                    Plan Pro Activo
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Facturación</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ajustes</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajustes de IA</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Proveedor de IA</Label>
              <Select
                value={aiProvider}
                onValueChange={(value: AIProvider) => setAIProvider(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic/Claude</SelectItem>
                  <SelectItem value="cohere">Cohere</SelectItem>
                  <SelectItem value="mistral">Mistral AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Modelo</Label>
              <Select
                value={selectedModel}
                onValueChange={(value: AIModel) => setSelectedModel(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableModels().map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>API Key</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Ingresa tu API key"
              />
              <div className="text-sm text-muted-foreground">
                {getProviderInstructions()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Temperatura</Label>
                <Input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  placeholder="0.7"
                />
                <div className="text-xs text-muted-foreground">
                  Controla la creatividad (0-2)
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Tokens Máximos</Label>
                <Input
                  type="number"
                  min="1"
                  max="8192"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  placeholder="2048"
                />
                <div className="text-xs text-muted-foreground">
                  Longitud máxima de respuesta
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>URL Base (Opcional)</Label>
              <Input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.ejemplo.com/v1"
              />
              <div className="text-xs text-muted-foreground">
                Para proveedores personalizados o proxies
              </div>
            </div>

            <Button onClick={handleSaveSettings} className="w-full">
              Guardar Configuración
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}