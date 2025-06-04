import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Prompt, PromptCategory, PromptVisibility } from '../../types/prompts';
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
import { Badge } from '../../ui/badge';
import { Plus, X } from 'lucide-react';
import { v4 } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  category: z.enum([
    'blog',
    'social',
    'marketing',
    'seo',
    'creative',
    'video',
    'podcast',
    'email',
    'ads',
    'product',
    'technical',
    'research',
    'storytelling',
    'educational',
    'copywriting'
  ]),
  visibility: z.enum(['private', 'public', 'shared']),
  tags: z.string(),
});

interface PromptEditorProps {
  onSave: (prompt: Prompt) => void;
  prompt?: Prompt | null;
}

export function PromptEditor({ onSave, prompt }: PromptEditorProps) {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(prompt?.tags || []);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: prompt?.title || '',
      content: prompt?.content || '',
      category: prompt?.category || 'blog',
      visibility: prompt?.visibility || 'private',
      tags: prompt?.tags?.join(', ') || '',
    },
  });

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPrompt: Prompt = {
      id: prompt?.id || v4(),
      title: values.title,
      content: values.content,
      category: values.category as PromptCategory,
      visibility: values.visibility as PromptVisibility,
      tags: tags,
      createdAt: prompt?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: prompt?.isFavorite || false,
      usageCount: prompt?.usageCount || 0,
      ownerId: user?.id || '',
      sharedWith: prompt?.sharedWith || [],
    };

    onSave(newPrompt);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          {prompt ? 'Editar Prompt' : 'Crear Nuevo Prompt'}
        </h2>
        <p className="text-sm text-muted-foreground">
          Crea o modifica tu plantilla de prompt.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título del prompt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="social">Redes Sociales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="creative">Creativo</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="ads">Publicidad</SelectItem>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="research">Investigación</SelectItem>
                      <SelectItem value="storytelling">Storytelling</SelectItem>
                      <SelectItem value="educational">Educativo</SelectItem>
                      <SelectItem value="copywriting">Copywriting</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibilidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar visibilidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Privado</SelectItem>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="shared">Compartido</SelectItem>
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
                <FormControl>
                  <Textarea
                    placeholder="Escribe tu plantilla de prompt aquí..."
                    className="min-h-[200px] font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Etiquetas</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 ml-1"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Añadir etiqueta"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {prompt ? 'Actualizar Prompt' : 'Crear Prompt'}
          </Button>
        </form>
      </Form>
    </div>
  );
}