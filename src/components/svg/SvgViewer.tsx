import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Upload, Eye, Code, Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const defaultSvg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial" font-size="16">SVG Viewer</text>
</svg>`;

export function SvgViewer() {
  const [svgCode, setSvgCode] = useState(defaultSvg);
  const [fileName, setFileName] = useState('mi-svg');
  const [isValidSvg, setIsValidSvg] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const validateSvg = (code: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      return !parserError;
    } catch {
      return false;
    }
  };

  const handleSvgChange = (value: string) => {
    setSvgCode(value);
    setIsValidSvg(validateSvg(value));
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          handleSvgChange(content);
          setFileName(file.name.replace('.svg', ''));
          toast({
            title: "Archivo importado",
            description: `SVG "${file.name}" cargado correctamente.`,
          });
        };
        reader.readAsText(file);
      } else {
        toast({
          title: "Error",
          description: "Por favor selecciona un archivo SVG válido.",
          variant: "destructive",
        });
      }
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Descarga completada",
      description: `SVG descargado como "${fileName}.svg".`,
    });
  };

  const downloadPng = async () => {
    if (!isValidSvg) {
      toast({
        title: "Error",
        description: "El código SVG no es válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Crear un canvas temporal
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo crear el contexto del canvas');

      // Crear una imagen desde el SVG
      const img = new Image();
      const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Configurar el tamaño del canvas
        canvas.width = img.width || 200;
        canvas.height = img.height || 200;
        
        // Fondo blanco
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar el SVG
        ctx.drawImage(img, 0, 0);
        
        // Descargar como PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `${fileName}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
            
            toast({
              title: "Descarga completada",
              description: `PNG descargado como "${fileName}.png".`,
            });
          }
        }, 'image/png');
        
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        toast({
          title: "Error",
          description: "No se pudo convertir el SVG a PNG.",
          variant: "destructive",
        });
      };

      img.src = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al generar el PNG.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgCode).then(() => {
      toast({
        title: "Copiado",
        description: "Código SVG copiado al portapapeles.",
      });
    });
  };

  const resetToDefault = () => {
    handleSvgChange(defaultSvg);
    setFileName('mi-svg');
    toast({
      title: "Reiniciado",
      description: "SVG reiniciado al ejemplo por defecto.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SVG Viewer & Editor
          </h1>
          <p className="text-gray-600">
            Importa, edita y convierte archivos SVG a PNG
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Editor SVG
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Controles de archivo */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importar SVG
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFileImport}
                className="hidden"
              />

              {/* Nombre del archivo */}
              <div>
                <Label htmlFor="filename">Nombre del archivo</Label>
                <Input
                  id="filename"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="nombre-archivo"
                />
              </div>

              {/* Editor de código */}
              <div>
                <Label htmlFor="svgcode">Código SVG</Label>
                <Textarea
                  id="svgcode"
                  value={svgCode}
                  onChange={(e) => handleSvgChange(e.target.value)}
                  className={`font-mono text-sm min-h-[300px] ${
                    !isValidSvg ? 'border-red-500' : ''
                  }`}
                  placeholder="Pega tu código SVG aquí..."
                />
                {!isValidSvg && (
                  <p className="text-red-500 text-sm mt-1">
                    El código SVG no es válido
                  </p>
                )}
              </div>

              {/* Botones de descarga */}
              <div className="flex gap-2">
                <Button
                  onClick={downloadSvg}
                  disabled={!isValidSvg}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar SVG
                </Button>
                <Button
                  onClick={downloadPng}
                  disabled={!isValidSvg}
                  variant="secondary"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PNG
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Panel de Vista Previa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Vista Previa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                  <TabsTrigger value="code">Código</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-lg p-4 bg-white min-h-[400px] flex items-center justify-center">
                    {isValidSvg ? (
                      <div
                        ref={svgRef}
                        dangerouslySetInnerHTML={{ __html: svgCode }}
                        className="max-w-full max-h-full"
                      />
                    ) : (
                      <div className="text-gray-500 text-center">
                        <p>SVG no válido</p>
                        <p className="text-sm">Corrige el código para ver la vista previa</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="code" className="mt-4">
                  <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                    <pre className="text-sm overflow-auto whitespace-pre-wrap break-words">
                      <code>{svgCode}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">📁 Importar</h4>
                <p className="text-gray-600">
                  Carga archivos SVG desde tu computadora
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✏️ Editar</h4>
                <p className="text-gray-600">
                  Modifica el código SVG en tiempo real con vista previa
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💾 Exportar</h4>
                <p className="text-gray-600">
                  Descarga como SVG o convierte a PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}