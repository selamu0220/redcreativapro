import React, { useRef } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../dialog';
import { Alert, AlertDescription } from '../alert';
import { Upload, Download, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface CSVManagerProps {
  onImport: (file: File) => Promise<void>;
  onExport: () => void;
  hasChanges?: boolean;
  dataType: string;
  itemCount: number;
}

export function CSVManager({ 
  onImport, 
  onExport, 
  hasChanges = false, 
  dataType, 
  itemCount 
}: CSVManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImportOpen, setIsImportOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        variant: 'destructive',
        title: 'Archivo inválido',
        description: 'Por favor selecciona un archivo CSV válido.'
      });
      return;
    }

    setIsLoading(true);
    try {
      await onImport(file);
      toast({
        title: 'Importación exitosa',
        description: `Los datos de ${dataType} han sido importados correctamente.`
      });
      setIsImportOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al importar',
        description: 'Hubo un problema al importar el archivo CSV. Verifica el formato.'
      });
    } finally {
      setIsLoading(false);
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = () => {
    try {
      onExport();
      toast({
        title: 'Exportación exitosa',
        description: `Los datos de ${dataType} han sido descargados como CSV.`
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al exportar',
        description: 'Hubo un problema al exportar los datos.'
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Indicador de cambios */}
      {hasChanges && (
        <div className="flex items-center gap-1 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <span>Cambios sin guardar</span>
        </div>
      )}

      {/* Botón de importar */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar {dataType} desde CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Al importar un archivo CSV, se reemplazarán todos los {dataType} actuales.
                Asegúrate de exportar tus datos actuales si quieres conservarlos.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Actualmente tienes {itemCount} {dataType}.
              </p>
              
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                disabled={isLoading}
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleImportClick}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Importando...' : 'Seleccionar archivo'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsImportOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botón de exportar */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        disabled={itemCount === 0}
      >
        <Download className="mr-2 h-4 w-4" />
        Exportar CSV
      </Button>
    </div>
  );
}

// Componente simplificado para uso rápido
interface QuickCSVActionsProps {
  onImport: (file: File) => Promise<void>;
  onExport: () => void;
  hasChanges?: boolean;
}

export function QuickCSVActions({ onImport, onExport, hasChanges }: QuickCSVActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await onImport(file);
      toast({
        title: 'Importación exitosa',
        description: 'Los datos han sido importados correctamente.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al importar',
        description: 'Hubo un problema al importar el archivo CSV.'
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
      </Button>
      
      {hasChanges && (
        <div className="w-2 h-2 bg-amber-500 rounded-full" title="Cambios sin guardar" />
      )}
    </div>
  );
}