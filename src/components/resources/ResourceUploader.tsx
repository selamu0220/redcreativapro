import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Resource, ResourceType } from '@/types/resources';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { v4 as uuidv4 } from '@/lib/utils';
import { Upload, Link as LinkIcon, FolderUp, X, Plus } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  type: z.enum(['document', 'image', 'link', 'ai-tool']),
  url: z.string().optional(),
  tags: z.string(),
});

interface ResourceUploaderProps {
  onAddResource: (resource: Resource) => void;
}

export function ResourceUploader({ onAddResource }: ResourceUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'document',
      url: '',
      tags: '',
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      setLinks(prev => [...prev, newLink.trim()]);
      setNewLink('');
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Procesar archivos
    selectedFiles.forEach(file => {
      const resource: Resource = {
        id: uuidv4(),
        title: file.name,
        description: values.description,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        tags: tags,
        createdAt: new Date().toISOString(),
        rating: 0,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };
      onAddResource(resource);
    });

    // Procesar enlaces
    links.forEach(link => {
      const resource: Resource = {
        id: uuidv4(),
        title: values.title || link,
        description: values.description,
        type: values.type,
        tags: tags,
        createdAt: new Date().toISOString(),
        rating: 0,
        url: link,
      };
      onAddResource(resource);
    });

    // Limpiar formulario
    setSelectedFiles([]);
    setLinks([]);
    setTags([]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="files">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="files">Archivos</TabsTrigger>
          <TabsTrigger value="links">Enlaces</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Subir Archivos
            </Button>
            <Button
              variant="outline"
              onClick={() => folderInputRef.current?.click()}
              className="w-full"
            >
              <FolderUp className="mr-2 h-4 w-4" />
              Subir Carpeta
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <input
            ref={folderInputRef}
            type="file"
            multiple
            webkitdirectory=""
            className="hidden"
            onChange={handleFolderSelect}
          />

          {selectedFiles.length > 0 && (
            <ScrollArea className="h-[200px] border rounded-md p-2">
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://ejemplo.com"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddLink();
                }
              }}
            />
            <Button onClick={handleAddLink} disabled={!newLink.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {links.length > 0 && (
            <ScrollArea className="h-[200px] border rounded-md p-2">
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">{link}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del recurso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Breve descripción del recurso"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="document">Documento</SelectItem>
                    <SelectItem value="image">Imagen</SelectItem>
                    <SelectItem value="link">Enlace</SelectItem>
                    <SelectItem value="ai-tool">Herramienta IA</SelectItem>
                  </SelectContent>
                </Select>
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

          <Button
            type="submit"
            className="w-full"
            disabled={selectedFiles.length === 0 && links.length === 0}
          >
            Subir Recursos
          </Button>
        </form>
      </Form>
    </div>
  );
}