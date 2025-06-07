'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Badge } from '@/app/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/ui/dialog';
import { Label } from '@/app/ui/label';
import { Textarea } from '@/app/ui/textarea';
import { Resource } from '@/app/types/resources';
import { Plus, Folder, MoreHorizontal, Edit, Trash2, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';

interface Collection {
  id: string;
  name: string;
  description: string;
  resourceIds: string[];
  createdAt: string;
  color: string;
}

interface ResourceCollectionsProps {
  resources: Resource[];
  collections: Collection[];
  onCreateCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => void;
}

export function ResourceCollections({ resources, collections, onCreateCollection }: ResourceCollectionsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    color: '#3b82f6'
  });

  const handleCreateCollection = () => {
    if (newCollection.name.trim()) {
      onCreateCollection({
        ...newCollection,
        resourceIds: []
      });
      setNewCollection({ name: '', description: '', color: '#3b82f6' });
      setIsCreateDialogOpen(false);
    }
  };

  const getCollectionResources = (collection: Collection) => {
    return resources.filter(resource => collection.resourceIds.includes(resource.id));
  };

  const colorOptions = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // yellow
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f97316', // orange
    '#84cc16', // lime
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Mis Colecciones</h3>
          <p className="text-sm text-muted-foreground">
            Organiza tus recursos en colecciones personalizadas
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Colección
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Colección</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Nombre</Label>
                <Input
                  id="collection-name"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre de la colección"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-description">Descripción</Label>
                <Textarea
                  id="collection-description"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción opcional"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newCollection.color === color ? 'border-foreground' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCollection(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCollection}>
                  Crear Colección
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {collections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Folder className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay colecciones</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Crea tu primera colección para organizar tus recursos
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Colección
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => {
            const collectionResources = getCollectionResources(collection);
            return (
              <Card key={collection.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: collection.color }}
                      />
                      <div className="min-w-0">
                        <CardTitle className="text-base truncate">{collection.name}</CardTitle>
                        {collection.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {collection.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartir
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {collectionResources.length} recursos
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(collection.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {collectionResources.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Recursos recientes:</p>
                        <div className="space-y-1">
                          {collectionResources.slice(0, 3).map((resource) => (
                            <div key={resource.id} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-muted rounded-full flex-shrink-0" />
                              <span className="text-xs truncate">{resource.title}</span>
                            </div>
                          ))}
                          {collectionResources.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{collectionResources.length - 3} más
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Colección
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}