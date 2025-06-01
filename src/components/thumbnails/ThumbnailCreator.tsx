import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ThumbnailSettings, ThumbnailImage, ThumbnailTemplate } from '@/types/thumbnails';
import { ThumbnailTemplateSelector } from './ThumbnailTemplateSelector';
import { v4, cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Image, Type, Palette, Settings, Sparkles, Download, Plus, X, 
  FileImage, Upload, FolderUp, Maximize2, Minimize2, LayoutTemplate, Save
} from 'lucide-react';
import { useThumbnailsSEO } from '@/hooks/useSEO';

const formatPresets = {
  youtube: { width: 1280, height: 720, name: 'YouTube (16:9)' },
  tiktok: { width: 1080, height: 1920, name: 'TikTok/Instagram Stories (9:16)' },
  instagram: { width: 1080, height: 1080, name: 'Instagram Post (1:1)' },
  twitter: { width: 1200, height: 675, name: 'Twitter (16:9)' },
  facebook: { width: 1200, height: 630, name: 'Facebook (1.91:1)' }
};

const defaultSettings: ThumbnailSettings = {
  title: 'Mi Título',
  subtitle: 'Subtítulo opcional',
  bgColor: '#000000',
  textColor: '#ffffff',
  fontFamily: 'Arial',
  width: 1280,
  height: 720,
  titleFontSize: 72,
  subtitleFontSize: 36,
  titlePosition: 50,
  subtitlePosition: 65,
  textShadow: true,
  bgImageOpacity: 100,
  bgType: 'solid',
  gradientAngle: 45,
  gradientStops: [
    { color: '#000000', position: 0 },
    { color: '#ffffff', position: 100 }
  ]
};

export function ThumbnailCreator() {
  const [settings, setSettings] = useState<ThumbnailSettings>(defaultSettings);
  const [images, setImages] = useState<ThumbnailImage[]>([]);
  const [activeTab, setActiveTab] = useState('text');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateCategory, setTemplateCategory] = useState<'gaming' | 'tech' | 'lifestyle' | 'education' | 'business'>('tech');
  const [selectedFormat, setSelectedFormat] = useState<keyof typeof formatPresets>('youtube');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Aplicar SEO específico para la página de miniaturas
  useThumbnailsSEO();

  useEffect(() => {
    renderThumbnail();
  }, [settings, images]);

  const renderThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar fondo
    if (settings.bgType === 'solid') {
      ctx.fillStyle = settings.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const gradient = settings.bgType === 'linear-gradient' 
        ? ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        : ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width/2
          );

      settings.gradientStops.forEach(stop => {
        gradient.addColorStop(stop.position / 100, stop.color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Dibujar imágenes
    images.forEach(img => {
      const image = new Image();
      image.src = img.url;
      ctx.drawImage(image, img.x, img.y, img.width, img.height);
    });

    // Configurar texto
    ctx.textAlign = 'center';
    ctx.fillStyle = settings.textColor;

    // Título
    ctx.font = `bold ${settings.titleFontSize}px ${settings.fontFamily}`;
    if (settings.textShadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
    }
    ctx.fillText(
      settings.title,
      canvas.width / 2,
      (canvas.height * settings.titlePosition) / 100
    );

    // Subtítulo
    if (settings.subtitle) {
      ctx.font = `${settings.subtitleFontSize}px ${settings.fontFamily}`;
      ctx.fillText(
        settings.subtitle,
        canvas.width / 2,
        (canvas.height * settings.subtitlePosition) / 100
      );
    }

    // Resetear sombra
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const newWidth = Math.min(settings.width / 2, img.width);
          const newHeight = newWidth / aspectRatio;
          
          setImages(prev => [...prev, {
            id: v4(),
            url: event.target?.result as string,
            x: (settings.width - newWidth) / 2,
            y: (settings.height - newHeight) / 2,
            width: newWidth,
            height: newHeight
          }]);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'thumbnail.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleTemplateSelect = (template: ThumbnailTemplate) => {
    setSettings(template.settings);
    // Actualizar el formato seleccionado basado en las dimensiones de la plantilla
    const templateFormat = Object.entries(formatPresets).find(
      ([_, preset]) => preset.width === template.settings.width && preset.height === template.settings.height
    );
    if (templateFormat) {
      setSelectedFormat(templateFormat[0] as keyof typeof formatPresets);
    }
    toast({
      title: 'Plantilla cargada',
      description: `Se ha cargado la plantilla "${template.name}"`
    });
  };

  const handleFormatChange = (format: keyof typeof formatPresets) => {
    const preset = formatPresets[format];
    setSelectedFormat(format);
    
    // Ajustar tamaños de fuente basados en el formato
    let titleFontSize = 72;
    let subtitleFontSize = 36;
    
    if (format === 'tiktok') {
      // Para formato vertical, usar fuentes más grandes
      titleFontSize = 96;
      subtitleFontSize = 48;
    } else if (format === 'instagram') {
      // Para formato cuadrado, usar fuentes medianas
      titleFontSize = 80;
      subtitleFontSize = 40;
    }
    
    setSettings({
      ...settings,
      width: preset.width,
      height: preset.height,
      titleFontSize,
      subtitleFontSize
    });
    
    toast({
      title: 'Formato cambiado',
      description: `Cambiado a ${preset.name}`
    });
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: 'Error',
        description: 'El nombre de la plantilla es requerido',
        variant: 'destructive'
      });
      return;
    }

    const newTemplate: ThumbnailTemplate = {
      id: v4(),
      name: templateName,
      description: templateDescription || 'Plantilla personalizada',
      preview: '', // Se podría generar una imagen preview del canvas
      category: templateCategory,
      settings: { ...settings }
    };

    // Aquí se guardaría en localStorage o base de datos
    const savedTemplates = JSON.parse(localStorage.getItem('customThumbnailTemplates') || '[]');
    savedTemplates.push(newTemplate);
    localStorage.setItem('customThumbnailTemplates', JSON.stringify(savedTemplates));

    toast({
      title: 'Plantilla guardada',
      description: `La plantilla "${templateName}" se ha guardado correctamente`
    });

    // Limpiar formulario
    setTemplateName('');
    setTemplateDescription('');
    setTemplateCategory('tech');
    setIsSaveTemplateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creador de Miniaturas</h1>
          <p className="text-muted-foreground">
            Crea miniaturas impactantes para tus videos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsTemplateSelectorOpen(true)}>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            Plantillas
          </Button>
          <Button onClick={() => setIsSaveTemplateOpen(true)} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Guardar Plantilla
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4">
          <div className="relative border rounded-lg overflow-hidden bg-neutral-950">
            <canvas
              ref={canvasRef}
              width={settings.width}
              height={settings.height}
              className={cn(
                "w-full h-auto",
                isFullscreen && "fixed inset-0 z-50 w-screen h-screen object-contain bg-black"
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/75"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Imagen
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="text" className="flex-1">
                <Type className="h-4 w-4 mr-2" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1">
                <Palette className="h-4 w-4 mr-2" />
                Estilo
              </TabsTrigger>
              <TabsTrigger value="images" className="flex-1">
                <FileImage className="h-4 w-4 mr-2" />
                Imágenes
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[600px] p-4">
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={settings.title}
                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={settings.subtitle}
                    onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fuente</Label>
                  <Select
                    value={settings.fontFamily}
                    onValueChange={(value) => setSettings({ ...settings, fontFamily: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Impact">Impact</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tamaño del Título</Label>
                  <Input
                    type="number"
                    value={settings.titleFontSize}
                    onChange={(e) => setSettings({ ...settings, titleFontSize: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tamaño del Subtítulo</Label>
                  <Input
                    type="number"
                    value={settings.subtitleFontSize}
                    onChange={(e) => setSettings({ ...settings, subtitleFontSize: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Posición del Título (%)</Label>
                  <Input
                    type="number"
                    value={settings.titlePosition}
                    onChange={(e) => setSettings({ ...settings, titlePosition: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Posición del Subtítulo (%)</Label>
                  <Input
                    type="number"
                    value={settings.subtitlePosition}
                    onChange={(e) => setSettings({ ...settings, subtitlePosition: Number(e.target.value) })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.textShadow}
                    onCheckedChange={(checked) => setSettings({ ...settings, textShadow: checked })}
                  />
                  <Label>Sombra de Texto</Label>
                </div>
              </div>
            )}

            {activeTab === 'style' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Fondo</Label>
                  <Select
                    value={settings.bgType}
                    onValueChange={(value: 'solid' | 'linear-gradient' | 'radial-gradient') => 
                      setSettings({ ...settings, bgType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Color Sólido</SelectItem>
                      <SelectItem value="linear-gradient">Degradado Lineal</SelectItem>
                      <SelectItem value="radial-gradient">Degradado Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.bgType === 'solid' ? (
                  <div className="space-y-2">
                    <Label>Color de Fondo</Label>
                    <Input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {settings.bgType === 'linear-gradient' && (
                      <div className="space-y-2">
                        <Label>Ángulo del Degradado</Label>
                        <Input
                          type="number"
                          value={settings.gradientAngle}
                          onChange={(e) => setSettings({ ...settings, gradientAngle: Number(e.target.value) })}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>Colores del Degradado</Label>
                      {settings.gradientStops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={stop.color}
                            onChange={(e) => {
                              const newStops = [...settings.gradientStops];
                              newStops[index].color = e.target.value;
                              setSettings({ ...settings, gradientStops: newStops });
                            }}
                          />
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={stop.position}
                            onChange={(e) => {
                              const newStops = [...settings.gradientStops];
                              newStops[index].position = Number(e.target.value);
                              setSettings({ ...settings, gradientStops: newStops });
                            }}
                          />
                          {index > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newStops = settings.gradientStops.filter((_, i) => i !== index);
                                setSettings({ ...settings, gradientStops: newStops });
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {settings.gradientStops.length < 5 && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            const newStops = [...settings.gradientStops, { color: '#ffffff', position: 50 }];
                            setSettings({ ...settings, gradientStops: newStops });
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Añadir Color
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Color del Texto</Label>
                  <Input
                    type="color"
                    value={settings.textColor}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Formato de Miniatura</Label>
                  <Select
                    value={selectedFormat}
                    onValueChange={(value: keyof typeof formatPresets) => handleFormatChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(formatPresets).map(([key, preset]) => (
                        <SelectItem key={key} value={key}>
                          {preset.name} ({preset.width}x{preset.height})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Ancho personalizado</Label>
                    <Input
                      type="number"
                      value={settings.width}
                      onChange={(e) => setSettings({ ...settings, width: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alto personalizado</Label>
                    <Input
                      type="number"
                      value={settings.height}
                      onChange={(e) => setSettings({ ...settings, height: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={image.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Imagen {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setImages(images.filter(img => img.id !== image.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Posición X</Label>
                      <Input
                        type="number"
                        value={image.x}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].x = Number(e.target.value);
                          setImages(newImages);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Posición Y</Label>
                      <Input
                        type="number"
                        value={image.y}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].y = Number(e.target.value);
                          setImages(newImages);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ancho</Label>
                      <Input
                        type="number"
                        value={image.width}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].width = Number(e.target.value);
                          setImages(newImages);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Alto</Label>
                      <Input
                        type="number"
                        value={image.height}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].height = Number(e.target.value);
                          setImages(newImages);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Imagen
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <ThumbnailTemplateSelector
        open={isTemplateSelectorOpen}
        onOpenChange={setIsTemplateSelectorOpen}
        onSelectTemplate={handleTemplateSelect}
      />

      <Dialog open={isSaveTemplateOpen} onOpenChange={setIsSaveTemplateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardar como plantilla</DialogTitle>
            <DialogDescription>
              Guarda la configuración actual como una plantilla personalizada para usar en el futuro.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Nombre de la plantilla *</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Ej: Mi plantilla profesional"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-description">Descripción</Label>
              <Input
                id="template-description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Ej: Plantilla con fondo degradado y texto moderno"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-category">Categoría</Label>
              <Select 
                value={templateCategory} 
                onValueChange={(value: 'gaming' | 'tech' | 'lifestyle' | 'education' | 'business') => 
                  setTemplateCategory(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="tech">Tecnología</SelectItem>
                  <SelectItem value="lifestyle">Estilo de vida</SelectItem>
                  <SelectItem value="education">Educación</SelectItem>
                  <SelectItem value="business">Negocios</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveTemplateOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveTemplate}>Guardar plantilla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}