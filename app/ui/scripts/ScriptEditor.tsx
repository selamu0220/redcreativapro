import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Script, ScriptStatus } from '../../types/scripts';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { v4 } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { generateScriptWithAI } from './c:\Users\programar\Documents\GitHub\redcreativapro\app\lib\ai';
import UsageLimits from './c:\Users\programar\Documents\GitHub\redcreativapro\app\components\common\UsageLimits';
import { AIProviderDialog } from './c:\Users\programar\Documents\GitHub\redcreativapro\app\components\chat\AIProviderDialog';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  status: z.enum(['draft', 'review', 'final']),
  category: z.string().min(1, 'La categoría es requerida'),
  tags: z.string(),
  platforms: z.string(),
  seoKeywords: z.string(),
});

interface ScriptEditorProps {
  script: Script | null;
  onSave: (script: Script) => void;
}

export function ScriptEditor({ script, onSave }: ScriptEditorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      status: 'draft',
      category: '',
      tags: '',
      platforms: '',
      seoKeywords: '',
    },
  });

  useEffect(() => {
    if (script) {
      form.reset({
        title: script.title,
        content: script.content,
        status: script.status,
        category: script.category,
        tags: script.tags.join(', '),
        platforms: script.platforms?.join(', ') || '',
        seoKeywords: script.seoKeywords?.join(', ') || '',
      });
    }
  }, [script, form]);

  const generateWithAI = async () => {
    const title = form.getValues('title');
    const category = form.getValues('category');
    const description = form.getValues('description');
    
    if (!title || !category) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, ingresa el título y la categoría antes de generar el guion",
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

    setIsGenerating(true);

    try {
      const prompt = `Genera un guion detallado para ${category} con el título "${title}"${description ? ` y la siguiente descripción: ${description}` : ''}. El guion debe ser profesional, creativo y estar bien estructurado.`;
      const content = await generateScriptWithAI(prompt);
      form.setValue('content', content);
      
      toast({
        title: "Guion generado",
        description: "Se ha generado un nuevo guion con IA"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo generar el guion. Por favor, verifica tu configuración de IA.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newScript: Script = {
      id: script?.id || v4(),
      title: values.title,
      content: values.content,
      status: values.status as ScriptStatus,
      category: values.category,
      tags: values.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      platforms: values.platforms
        ? values.platforms.split(',').map(p => p.trim()).filter(Boolean)
        : undefined,
      seoKeywords: values.seoKeywords
        ? values.seoKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : undefined,
      createdAt: script?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [
        {
          id: v4(),
          content: values.content,
          createdAt: new Date().toISOString(),
          createdBy: {
            id: '1',
            name: 'Demo User',
          },
          comment: script ? 'Actualización del guion' : 'Versión inicial',
        },
        ...(script?.versions || []),
      ],
      aiGenerated: script?.aiGenerated || false,
    };

    onSave(newScript);
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título del guion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="review">Revisión</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Education">Educación</SelectItem>
                      <SelectItem value="Entertainment">Entretenimiento</SelectItem>
                      <SelectItem value="Social Media">Redes Sociales</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={generateWithAI}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isGenerating ? 'Generando...' : 'Generar con IA'}
                  </Button>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe el contenido del guion aquí..."
                      className="min-h-[400px] font-mono"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiquetas (separadas por comas)</FormLabel>
                <FormControl>
                  <Input placeholder="video, tutorial, producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plataformas (separadas por comas)</FormLabel>
                <FormControl>
                  <Input placeholder="YouTube, Instagram, TikTok" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Palabras clave SEO (separadas por comas)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tutorial, cómo hacer, educación"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {script ? 'Actualizar Guion' : 'Crear Guion'}
          </Button>
        </form>
      </Form>
      
      {/* Usage Limits for Free Users */}
      <div className="mt-6">
        <UsageLimits />
      </div>
      
      <AIProviderDialog
        open={isAIDialogOpen}
        onOpenChange={setIsAIDialogOpen}
        onContinue={generateWithAI}
      />
    </div>
  );
}