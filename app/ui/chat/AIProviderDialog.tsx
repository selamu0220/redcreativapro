import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AIProvider, GeminiModel } from '../../types/ai';
import { useToast } from '../../hooks/use-toast';

interface AIProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function AIProviderDialog({ open, onOpenChange, onContinue }: AIProviderDialogProps) {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState<GeminiModel>('gemini-2.0-flash');
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

  const handleSave = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    console.log('=== INICIO handleSave ===');
    console.log('Provider:', provider);
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 5)}...` : 'vacía');
    console.log('API Key length:', apiKey.length);
    
    // Validación básica
    if (!apiKey || apiKey.trim().length === 0) {
      console.log('ERROR: API key vacía');
      toast({
        title: "Error",
        description: "Por favor ingresa una API key",
        variant: "destructive"
      });
      return;
    }
    
    const trimmedKey = apiKey.trim();
    
    // Validación específica por proveedor
    let isValid = false;
    switch (provider) {
      case 'gemini':
        isValid = trimmedKey.startsWith('AI') && trimmedKey.length >= 30;
        break;
      case 'openai':
        isValid = trimmedKey.startsWith('sk-') && trimmedKey.length >= 40;
        break;
      case 'anthropic':
        isValid = trimmedKey.startsWith('sk-ant-') && trimmedKey.length >= 40;
        break;
    }
    
    if (!isValid) {
      console.log('ERROR: API key inválida para', provider);
      toast({
        title: "API Key inválida",
        description: `La API key de ${provider} no tiene el formato correcto`,
        variant: "destructive"
      });
      return;
    }
    
    console.log('Validación exitosa');
    
    try {
      const settings = {
        provider,
        apiKey: trimmedKey,
        model: provider === 'gemini' ? geminiModel : undefined
      };
      
      console.log('Guardando configuración:', settings);
      localStorage.setItem('aiSettings', JSON.stringify(settings));
      
      console.log('Configuración guardada exitosamente');
      
      toast({
        title: "¡Configuración guardada!",
        description: "Ya puedes usar el chat de IA"
      });
      
      // Pequeño delay para asegurar que el toast se muestre
      setTimeout(() => {
        console.log('Cerrando diálogo...');
        onContinue();
        onOpenChange(false);
      }, 500);
      
    } catch (error) {
      console.error('Error guardando configuración:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración",
        variant: "destructive"
      });
    }
    
    console.log('=== FIN handleSave ===');
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

          {provider === 'gemini' && (
            <div className="grid gap-2">
              <Label>Modelo de Gemini</Label>
              <Select
                value={geminiModel}
                onValueChange={(value: GeminiModel) => setGeminiModel(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash (Recomendado)</SelectItem>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                  <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
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

          <Button 
              onClick={handleSave} 
              className="w-full"
              type="button"
            >
              Guardar y Continuar
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}