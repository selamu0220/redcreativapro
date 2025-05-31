import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AIProvider } from '@/types/ai';
import { useToast } from '@/hooks/use-toast';

interface AIProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function AIProviderDialog({ open, onOpenChange, onContinue }: AIProviderDialogProps) {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const validateApiKey = (key: string, selectedProvider: AIProvider): boolean => {
    const trimmedKey = key.trim();
    
    if (!trimmedKey) {
      toast({
        title: "API Key requerida",
        description: "Por favor, ingresa una API key válida",
        variant: "destructive"
      });
      return false;
    }

    switch (selectedProvider) {
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

  const handleSave = () => {
    if (!validateApiKey(apiKey, provider)) {
      return;
    }

    localStorage.setItem('aiSettings', JSON.stringify({
      provider,
      apiKey: apiKey.trim()
    }));

    toast({
      title: "Configuración guardada",
      description: "La configuración de IA ha sido guardada correctamente"
    });

    onContinue();
    onOpenChange(false);
  };

  const getProviderInstructions = () => {
    switch (provider) {
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
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurar Proveedor de IA</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Proveedor de IA</Label>
            <Select
              value={provider}
              onValueChange={(value: AIProvider) => setProvider(value)}
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

          <Button onClick={handleSave} className="w-full">
            Guardar y Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}