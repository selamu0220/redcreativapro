import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Cloud, LogIn, FolderOpen, File, Download, Link, Settings, AlertCircle } from 'lucide-react';

// Tipo para la configuración de Google Drive
interface GoogleDriveConfig {
  apiKey: string;
  clientId: string;
  isConfigured: boolean;
}

// Tipo para los archivos de Google Drive
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  iconLink?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export function GoogleDriveIntegration({
  onFileSelect,
  onAuthStatusChange
}: {
  onFileSelect?: (file: DriveFile) => void;
  onAuthStatusChange?: (isAuthenticated: boolean) => void;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [config, setConfig] = useState<GoogleDriveConfig>({
    apiKey: '',
    clientId: '',
    isConfigured: false
  });
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [folderPath, setFolderPath] = useState<{id: string, name: string}[]>([{id: 'root', name: 'Mi unidad'}]);

  // Cargar configuración al inicio
  useEffect(() => {
    const savedConfig = localStorage.getItem('googleDriveConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        
        // Si hay configuración, intentar cargar el SDK de Google
        if (parsedConfig.isConfigured) {
          loadGoogleApi(parsedConfig);
        }
      } catch (error) {
        console.error('Error parsing Google Drive config:', error);
      }
    }
  }, []);

  // Función para cargar el SDK de Google
  const loadGoogleApi = (config: GoogleDriveConfig) => {
    // En una implementación real, aquí cargaríamos el SDK de Google
    // y autenticaríamos al usuario
    console.log('Cargando Google API con configuración:', config);
    
    // Simulación de carga y autenticación
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulamos que el usuario ya está autenticado si hay configuración
      if (config.isConfigured && config.apiKey && config.clientId) {
        setIsAuthenticated(true);
        if (onAuthStatusChange) onAuthStatusChange(true);
        // Cargar archivos de ejemplo
        loadExampleFiles();
      }
    }, 1500);
  };

  // Guardar configuración
  const saveConfig = (newConfig: GoogleDriveConfig) => {
    localStorage.setItem('googleDriveConfig', JSON.stringify(newConfig));
    setConfig(newConfig);
    loadGoogleApi(newConfig);
    setIsConfiguring(false);
  };

  // Autenticar con Google
  const authenticate = () => {
    if (!config.isConfigured) {
      setIsConfiguring(true);
      return;
    }
    
    // Simulación de autenticación
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      if (onAuthStatusChange) onAuthStatusChange(true);
      loadExampleFiles();
    }, 1500);
  };

  // Cerrar sesión
  const signOut = () => {
    setIsAuthenticated(false);
    setFiles([]);
    if (onAuthStatusChange) onAuthStatusChange(false);
  };

  // Cargar archivos de ejemplo (simulación)
  const loadExampleFiles = () => {
    setIsLoading(true);
    
    // Simulamos diferentes archivos según la carpeta actual
    setTimeout(() => {
      let exampleFiles: DriveFile[] = [];
      
      if (currentFolder === 'root') {
        exampleFiles = [
          { id: 'folder1', name: 'Proyectos de Video', mimeType: 'application/vnd.google-apps.folder' },
          { id: 'folder2', name: 'Recursos', mimeType: 'application/vnd.google-apps.folder' },
          { id: 'file1', name: 'Presentación.pptx', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', size: 2500000 },
          { id: 'file2', name: 'Presupuesto.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 150000 }
        ];
      } else if (currentFolder === 'folder1') {
        exampleFiles = [
          { id: 'folder3', name: 'Proyecto A', mimeType: 'application/vnd.google-apps.folder' },
          { id: 'folder4', name: 'Proyecto B', mimeType: 'application/vnd.google-apps.folder' },
          { id: 'file3', name: 'Guión_Final.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 350000 }
        ];
      } else if (currentFolder === 'folder2') {
        exampleFiles = [
          { id: 'file4', name: 'Logo.png', mimeType: 'image/png', size: 500000 },
          { id: 'file5', name: 'Música_Fondo.mp3', mimeType: 'audio/mpeg', size: 4500000 },
          { id: 'file6', name: 'Plantilla.aep', mimeType: 'application/octet-stream', size: 15000000 }
        ];
      } else if (currentFolder === 'folder3') {
        exampleFiles = [
          { id: 'file7', name: 'Entrevista_1.mp4', mimeType: 'video/mp4', size: 250000000 },
          { id: 'file8', name: 'Entrevista_2.mp4', mimeType: 'video/mp4', size: 180000000 },
          { id: 'file9', name: 'B-roll.mp4', mimeType: 'video/mp4', size: 320000000 },
          { id: 'file10', name: 'Notas_Edición.txt', mimeType: 'text/plain', size: 5000 }
        ];
      } else {
        exampleFiles = [
          { id: 'file11', name: 'Documento.pdf', mimeType: 'application/pdf', size: 1200000 }
        ];
      }
      
      setFiles(exampleFiles);
      setIsLoading(false);
    }, 800);
  };

  // Navegar a una carpeta
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    
    // Actualizar la ruta de navegación
    const folderIndex = folderPath.findIndex(folder => folder.id === folderId);
    if (folderIndex >= 0) {
      // Si la carpeta ya está en la ruta, truncar hasta ese punto
      setFolderPath(folderPath.slice(0, folderIndex + 1));
    } else {
      // Añadir la nueva carpeta a la ruta
      setFolderPath([...folderPath, { id: folderId, name: folderName }]);
    }
    
    // Cargar archivos de la carpeta
    loadExampleFiles();
  };

  // Seleccionar un archivo
  const selectFile = (file: DriveFile) => {
    if (file.mimeType.includes('folder')) {
      navigateToFolder(file.id, file.name);
    } else if (onFileSelect) {
      onFileSelect(file);
    }
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Desconocido';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

  // Obtener icono según tipo de archivo
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) return <FolderOpen className="h-5 w-5 text-yellow-500" />;
    if (mimeType.includes('image')) return <File className="h-5 w-5 text-blue-500" />;
    if (mimeType.includes('video')) return <File className="h-5 w-5 text-red-500" />;
    if (mimeType.includes('audio')) return <File className="h-5 w-5 text-purple-500" />;
    if (mimeType.includes('pdf')) return <File className="h-5 w-5 text-red-700" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return <File className="h-5 w-5 text-green-600" />;
    if (mimeType.includes('document') || mimeType.includes('word')) return <File className="h-5 w-5 text-blue-600" />;
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <File className="h-5 w-5 text-orange-600" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Google Drive</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={signOut}>
              Cerrar Sesión
            </Button>
          ) : (
            <Button size="sm" onClick={authenticate}>
              <LogIn className="h-4 w-4 mr-2" />
              Conectar
            </Button>
          )}
          
          <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configuración de Google Drive</DialogTitle>
                <DialogDescription>
                  Configura las credenciales para conectar con Google Drive
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input 
                    value={config.apiKey} 
                    onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                    placeholder="AIzaSyB..." 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Client ID</Label>
                  <Input 
                    value={config.clientId} 
                    onChange={(e) => setConfig({...config, clientId: e.target.value})}
                    placeholder="123456789-abc...apps.googleusercontent.com" 
                  />
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Importante</p>
                      <p>Para obtener estas credenciales, debes crear un proyecto en la 
                        <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Google Cloud Console</a> y 
                        habilitar la API de Google Drive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => saveConfig({...config, isConfigured: true})}>
                  Guardar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estado no autenticado */}
      {!isAuthenticated && (
        <Card>
          <CardContent className="text-center py-12">
            <Cloud className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Conecta con Google Drive</h3>
            <p className="text-gray-600 mb-4">
              Conecta tu cuenta de Google Drive para acceder a tus archivos y organizarlos en tus proyectos
            </p>
            <Button onClick={authenticate}>
              <LogIn className="h-4 w-4 mr-2" />
              Conectar con Google Drive
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Explorador de archivos */}
      {isAuthenticated && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mis Archivos</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-1 overflow-x-auto py-1">
                {folderPath.map((folder, index) => (
                  <React.Fragment key={folder.id}>
                    <button 
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => navigateToFolder(folder.id, folder.name)}
                    >
                      {folder.name}
                    </button>
                    {index < folderPath.length - 1 && (
                      <span className="text-gray-500">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando archivos...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No hay archivos en esta carpeta</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {files.map((file) => (
                      <div 
                        key={file.id} 
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectFile(file)}
                      >
                        <div className="mr-3">
                          {getFileIcon(file.mimeType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}