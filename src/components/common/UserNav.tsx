import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { AIProvider, GeminiModel } from '@/types/ai';

export function UserNav() {
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [aiProvider, setAIProvider] = useState<AIProvider>('gemini');
  const [geminiModel, setGeminiModel] = useState<GeminiModel>('gemini-pro');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isSettingsOpen) {
      const storedSettings = localStorage.getItem('aiSettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setAIProvider(settings.provider || 'gemini');
        setGeminiModel(settings.model || 'gemini-pro');
        setApiKey(settings.apiKey || '');
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
    }

    return true;
  };

  const handleSaveSettings = () => {
    if (!validateApiKey(apiKey, aiProvider)) {
      return;
    }

    localStorage.setItem('aiSettings', JSON.stringify({
      provider: aiProvider,
      model: geminiModel,
      apiKey: apiKey.trim()
    }));

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
              <li>Gemini Pro: Modelo más reciente y potente</li>
              <li>Gemini 1.5 Pro: Próximamente disponible</li>
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
              Modelo utilizado: GPT-4 Turbo
            </p>
          </div>
        );
      case 'anthropic':
        return (
          <div className="space-y-2">
            <p>Obtén tu API key del panel de Anthropic:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Ve a <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Console</a></li>
              <li>Crea una nueva API key</li>
              <li>La key debe comenzar con 'sk-ant-'</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              Modelo utilizado: Claude 3 Opus
            </p>
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
                <p className="text-sm font-medium leading-none">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'john@example.com'}
                </p>
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
                </SelectContent>
              </Select>
            </div>

            {aiProvider === 'gemini' && (
              <div className="grid gap-2">
                <Label>Modelo</Label>
                <Select
                  value={geminiModel}
                  onValueChange={(value: GeminiModel) => setGeminiModel(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro (Próximamente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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

            <Button onClick={handleSaveSettings} className="w-full">
              Guardar Configuración
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}