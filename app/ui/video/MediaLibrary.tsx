'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { ScrollArea } from '../scroll-area';
import { Badge } from '../badge';
import { Input } from '../input';
import { 
  Upload, 
  Search, 
  Video, 
  Music, 
  Image, 
  File, 
  Play, 
  Download,
  Trash2,
  MoreVertical,
  Clock,
  HardDrive
} from 'lucide-react';
import { MediaAsset } from '../../types/video';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';

interface MediaLibraryProps {
  assets: MediaAsset[];
  onAssetsChange: (assets: MediaAsset[]) => void;
  onAddToTimeline: (asset: MediaAsset) => void;
}

export function MediaLibrary({ assets, onAssetsChange, onAddToTimeline }: MediaLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'image'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtrar assets
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || asset.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Manejar subida de archivos con mejor soporte para audio
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    console.log('Files selected:', files.length);
    const newAssets: MediaAsset[] = [];
    let processedCount = 0;
    const totalFiles = files.length;
    
    const updateAssetsWhenReady = () => {
      processedCount++;
      console.log(`Processed ${processedCount}/${totalFiles} files`);
      if (processedCount === totalFiles) {
        console.log('All files processed, updating assets:', newAssets);
        onAssetsChange([...assets, ...newAssets]);
      }
    };
    
    Array.from(files).forEach((file, index) => {
      console.log('Processing file:', file.name, file.type);
      
      const asset: MediaAsset = {
        id: `asset_${Date.now()}_${index}`,
        name: file.name,
        type: getFileType(file.type),
        url: URL.createObjectURL(file),
        duration: 0, // Se calculará después
        size: file.size,
        format: file.type,
        createdAt: new Date(),
        thumbnail: null
      };
      
      newAssets.push(asset);
      
      // Para videos y audios, intentar obtener duración y metadatos
      if (asset.type === 'video' || asset.type === 'audio') {
        const mediaElement = asset.type === 'video' 
          ? document.createElement('video')
          : document.createElement('audio');
        
        mediaElement.src = asset.url;
        mediaElement.preload = 'metadata';
        
        mediaElement.onloadedmetadata = () => {
          console.log('Metadata loaded for:', asset.name, 'duration:', mediaElement.duration);
          asset.duration = mediaElement.duration;
          
          // Para archivos de audio, extraer información adicional
          if (asset.type === 'audio') {
            asset.audioInfo = {
              channels: (mediaElement as any).audioTracks?.length || 2,
              sampleRate: 44100, // Valor por defecto
              bitrate: Math.round(file.size * 8 / mediaElement.duration / 1000) // kbps estimado
            };
          }
          
          updateAssetsWhenReady();
        };
        
        mediaElement.onerror = (error) => {
          console.warn(`Error loading ${asset.type}:`, asset.name, error);
          updateAssetsWhenReady();
        };
        
        // Timeout para evitar que se cuelgue
        setTimeout(() => {
          if (processedCount < totalFiles) {
            console.warn('Timeout loading metadata for:', asset.name);
            updateAssetsWhenReady();
          }
        }, 5000);
      } else {
        // Para imágenes, procesar inmediatamente
        console.log('Image file processed:', asset.name);
        updateAssetsWhenReady();
      }
    });
    
    // Limpiar el input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determinar tipo de archivo
  const getFileType = (mimeType: string): 'video' | 'audio' | 'image' => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('image/')) return 'image';
    return 'video'; // default
  };

  // Obtener icono según tipo
  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'image': return Image;
      default: return File;
    }
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formatear duración
  const formatDuration = (seconds: number) => {
    if (!seconds || seconds === 0) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Eliminar asset
  const deleteAsset = (assetId: string) => {
    const updatedAssets = assets.filter(asset => asset.id !== assetId);
    onAssetsChange(updatedAssets);
    if (selectedAsset?.id === assetId) {
      setSelectedAsset(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Biblioteca de Medios</h3>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir
            </Button>
            
            <Button 
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'audio/*';
                input.onchange = handleFileUpload;
                input.click();
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Music className="w-4 h-4" />
              Solo Audio
            </Button>
            
            <Button 
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'video/*';
                input.onchange = handleFileUpload;
                input.click();
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Solo Video
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar archivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'Todos', icon: File },
            { id: 'video', label: 'Videos', icon: Video },
            { id: 'audio', label: 'Audio', icon: Music },
            { id: 'image', label: 'Imágenes', icon: Image }
          ].map(filterOption => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(filterOption.id as any)}
            >
              <filterOption.icon className="w-4 h-4 mr-1" />
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                {searchTerm ? 'No se encontraron archivos' : 'No hay archivos en la biblioteca'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Sube archivos para comenzar'}
              </p>
              {!searchTerm && (
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Archivos
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredAssets.map(asset => {
                const IconComponent = getAssetIcon(asset.type);
                return (
                  <Card 
                    key={asset.id} 
                    className={`cursor-pointer transition-colors hover:bg-muted ${
            selectedAsset?.id === asset.id ? 'ring-2 ring-primary bg-muted' : 'bg-card'
          }`}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        {/* Thumbnail/Icon */}
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                          {asset.thumbnail ? (
                            <img 
                              src={asset.thumbnail} 
                              alt={asset.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <IconComponent className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{asset.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {asset.type.toUpperCase()}
                            </Badge>
                            {asset.duration > 0 && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {formatDuration(asset.duration)}
                              </div>
                            )}
                            <div className="flex items-center text-xs text-muted-foreground">
                              <HardDrive className="w-3 h-3 mr-1" />
                              {formatFileSize(asset.size)}
                            </div>
                          </div>
                          
                          {/* Información adicional para archivos de audio */}
                          {asset.type === 'audio' && asset.audioInfo && (
                            <div className="text-xs text-muted-foreground mt-1">
                              <div className="flex items-center gap-2">
                                <span>{asset.audioInfo.channels} canales</span>
                                <span>•</span>
                                <span>{asset.audioInfo.bitrate} kbps</span>
                                <span>•</span>
                                <span>{(asset.audioInfo.sampleRate / 1000).toFixed(1)} kHz</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToTimeline(asset);
                            }}
                            title="Agregar a timeline"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => onAddToTimeline(asset)}>
                                <Play className="w-4 h-4 mr-2" />
                                Agregar a Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Descargar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteAsset(asset.id)}
                                className="text-red-400"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Asset Details */}
      {selectedAsset && (
        <div className="border-t border-border p-4">
          <h4 className="font-medium mb-2">Detalles del Archivo</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nombre:</span>
              <span className="truncate ml-2">{selectedAsset.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo:</span>
              <span>{selectedAsset.type.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tamaño:</span>
              <span>{formatFileSize(selectedAsset.size)}</span>
            </div>
            {selectedAsset.duration > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duración:</span>
                <span>{formatDuration(selectedAsset.duration)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Formato:</span>
              <span>{selectedAsset.format}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*,image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}