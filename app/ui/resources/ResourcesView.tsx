'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ResourceHeader } from './ResourceHeader';
import { ResourceGrid } from './ResourceGrid';
import { ResourceFilters } from './ResourceFilters';
import { ResourceUploader } from './ResourceUploader';
import { ResourceDetail } from './ResourceDetail';
import { ResourceAnalytics } from './ResourceAnalytics';
import { ResourceCollections } from './ResourceCollections';
import { ResourceDashboard } from './ResourceDashboard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { useToast } from '../../hooks/use-toast';
import { useQuickRefresh } from '../../hooks/useQuickRefresh';
import { mockResources } from '../../data/mockResources';
import { Resource, ResourceComment } from '../../types/resources';
import { useResourceSEO } from '../../hooks/useSEO';
import { 
  LayoutGrid, 
  List, 
  BarChart3, 
  Heart, 
  Star, 
  TrendingUp, 
  Filter,
  Search,
  FolderPlus,
  Download,
  Share2,
  Eye,
  Calendar,
  Tag,
  Users
} from 'lucide-react';

export function ResourcesView() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Aplicar SEO específico para la página de recursos
  useResourceSEO();

  // Hook para refrescado rápido
  const { isRefreshing } = useQuickRefresh({
    onRefresh: async () => {
      // Actualizar recursos sin cambiar referencias innecesariamente
      setResources([...mockResources]);
      setFilteredResources([...mockResources]);
      
      toast({
        title: '✅ Recursos actualizados',
        description: 'Los recursos se han actualizado correctamente',
      });
    }
  });

  // Funciones avanzadas
  const toggleFavorite = useCallback((resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
    toast({
      title: favorites.includes(resourceId) ? 'Eliminado de favoritos' : 'Añadido a favoritos',
      description: 'Tus favoritos han sido actualizados',
    });
  }, [favorites, toast]);

  const createCollection = useCallback((name: string, resourceIds: string[]) => {
    const newCollection = {
      id: Date.now().toString(),
      name,
      resourceIds,
      createdAt: new Date().toISOString(),
      description: `Colección con ${resourceIds.length} recursos`
    };
    setCollections(prev => [...prev, newCollection]);
    toast({
      title: 'Colección creada',
      description: `La colección "${name}" ha sido creada exitosamente`,
    });
  }, [toast]);

  // Búsqueda y filtrado avanzado
  const advancedFilteredResources = useMemo(() => {
    let filtered = [...resources];

    // Búsqueda por texto
    if (searchQuery) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'size':
          const sizeA = parseFloat(a.size?.replace(/[^0-9.]/g, '') || '0');
          const sizeB = parseFloat(b.size?.replace(/[^0-9.]/g, '') || '0');
          comparison = sizeA - sizeB;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [resources, searchQuery, sortBy, sortOrder]);

  // Analytics calculados
  const analytics = useMemo(() => {
    const totalResources = resources.length;
    const totalSize = resources.reduce((acc, resource) => {
      const size = parseFloat(resource.size?.replace(/[^0-9.]/g, '') || '0');
      return acc + size;
    }, 0);
    const avgRating = resources.reduce((acc, resource) => acc + resource.rating, 0) / totalResources;
    const typeDistribution = resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const recentUploads = resources.filter(resource => {
      const uploadDate = new Date(resource.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate > weekAgo;
    }).length;

    return {
      totalResources,
      totalSize: totalSize.toFixed(1),
      avgRating: avgRating.toFixed(1),
      typeDistribution,
      recentUploads,
      favoriteCount: favorites.length,
      collectionCount: collections.length
    };
  }, [resources, favorites, collections]);
  
  const handleAddResource = (resource: Resource) => {
    setResources([...resources, resource]);
    setFilteredResources([...resources, resource]);
    setIsUploaderOpen(false);
    toast({
      title: 'Recurso añadido',
      description: 'Tu recurso ha sido añadido correctamente',
    });
  };

  const handleFilter = useCallback((filtered: Resource[]) => {
    setFilteredResources(filtered);
  }, []);

  const handleAddComment = (resourceId: string, comment: ResourceComment) => {
    const updatedResources = resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          comments: [...(resource.comments || []), comment]
        };
      }
      return resource;
    });

    setResources(updatedResources);
    setFilteredResources(updatedResources);
    
    // Update the selected resource to show the new comment immediately
    const updatedResource = updatedResources.find(r => r.id === resourceId);
    if (updatedResource) {
      setSelectedResource(updatedResource);
    }

    toast({
      title: 'Comentario añadido',
      description: 'Tu comentario ha sido añadido correctamente'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header avanzado con búsqueda y controles */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Centro de Recursos</h1>
          <p className="text-muted-foreground">
            Gestiona tus recursos creativos con herramientas avanzadas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar recursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsUploaderOpen(true)} className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Subir Recurso
          </Button>
        </div>
      </div>

      {/* Pestañas principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Recursos
          </TabsTrigger>
          <TabsTrigger value="collections" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Colecciones
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Recursos</CardTitle>
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalResources}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.recentUploads} nuevos esta semana
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamaño Total</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalSize} MB</div>
                <p className="text-xs text-muted-foreground">
                  Espacio utilizado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.avgRating}</div>
                <p className="text-xs text-muted-foreground">
                  De 5 estrellas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.favoriteCount}</div>
                <p className="text-xs text-muted-foreground">
                  Recursos marcados
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Distribución por tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Tipo</CardTitle>
              <CardDescription>
                Visualización de tus recursos por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analytics.typeDistribution).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(count / analytics.totalResources) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recursos recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Recientes</CardTitle>
              <CardDescription>
                Últimos recursos añadidos a tu biblioteca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resources.slice(0, 5).map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Tag className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(resource.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(resource.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.includes(resource.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Controles de filtrado y ordenamiento */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Ordenar por:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="date">Fecha</option>
                <option value="name">Nombre</option>
                <option value="rating">Rating</option>
                <option value="size">Tamaño</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={favorites.length > 0 ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  if (favorites.length > 0) {
                    setFilteredResources(resources.filter(r => favorites.includes(r.id)));
                  } else {
                    setFilteredResources(advancedFilteredResources);
                  }
                }}
              >
                <Heart className="h-4 w-4 mr-1" />
                Solo Favoritos
              </Button>
            </div>
          </div>

          <ResourceFilters resources={resources} onFilter={handleFilter} />
          <ResourceGrid 
            resources={searchQuery ? advancedFilteredResources : filteredResources} 
            onResourceClick={setSelectedResource}
            viewMode={viewMode}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mis Colecciones</CardTitle>
              <CardDescription>
                Organiza tus recursos en colecciones personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {collections.length === 0 ? (
                <div className="text-center py-8">
                  <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tienes colecciones</h3>
                  <p className="text-muted-foreground mb-4">
                    Crea tu primera colección para organizar tus recursos
                  </p>
                  <Button onClick={() => createCollection('Mi Primera Colección', [])}>
                    Crear Colección
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {collections.map((collection) => (
                    <Card key={collection.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{collection.name}</CardTitle>
                        <CardDescription>{collection.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {collection.resourceIds.length} recursos
                          </span>
                          <Button variant="outline" size="sm">
                            Ver Colección
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Uso</CardTitle>
                <CardDescription>
                  Métricas detalladas de tu biblioteca de recursos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Recursos Totales</span>
                  <Badge variant="secondary">{analytics.totalResources}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tamaño Total</span>
                  <Badge variant="secondary">{analytics.totalSize} MB</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rating Promedio</span>
                  <Badge variant="secondary">{analytics.avgRating}/5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Subidas Recientes</span>
                  <Badge variant="secondary">{analytics.recentUploads}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas acciones en tu biblioteca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Recurso añadido</p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Favorito marcado</p>
                      <p className="text-xs text-muted-foreground">Hace 1 día</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <Share2 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Recurso compartido</p>
                      <p className="text-xs text-muted-foreground">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Diálogos */}
      <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subir Recurso</DialogTitle>
          </DialogHeader>
          <ResourceUploader onAddResource={handleAddResource} />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={!!selectedResource} 
        onOpenChange={(open) => !open && setSelectedResource(null)}
      >
        <DialogContent className="sm:max-w-[900px]">
          {selectedResource && (
            <ResourceDetail 
              resource={selectedResource}
              onAddComment={handleAddComment}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}