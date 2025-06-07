'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { Badge } from '@/app/ui/badge';
import { Button } from '@/app/ui/button';
import { Progress } from '@/app/ui/progress';
import { Resource } from '@/app/types/resources';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Star, 
  TrendingUp, 
  Clock, 
  Heart,
  Folder,
  Upload
} from 'lucide-react';

interface ResourceDashboardProps {
  resources: Resource[];
  analytics: {
    totalResources: number;
    totalSize: string;
    averageRating: number;
    typeDistribution: Record<string, number>;
    recentUploads: number;
    favoriteCount: number;
    collectionCount: number;
  };
  favorites: string[];
  onUploadClick: () => void;
}

export function ResourceDashboard({ 
  resources, 
  analytics, 
  favorites,
  onUploadClick 
}: ResourceDashboardProps) {
  const getTypeIcon = (type: string) => {
    const icons = {
      document: FileText,
      image: Image,
      video: Video,
      audio: Music,
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      document: 'text-blue-500',
      image: 'text-green-500',
      video: 'text-purple-500',
      audio: 'text-orange-500',
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  const recentResources = resources
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topRatedResources = resources
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const favoriteResources = resources.filter(resource => favorites.includes(resource.id));

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">¡Bienvenido a tus Recursos!</h2>
            <p className="text-muted-foreground">
              Gestiona, organiza y comparte tus recursos creativos de manera eficiente.
            </p>
          </div>
          <Button onClick={onUploadClick} size="lg">
            <Upload className="h-4 w-4 mr-2" />
            Subir Recurso
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recursos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.recentUploads} esta semana
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colecciones</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.collectionCount}</div>
            <p className="text-xs text-muted-foreground">
              Organizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Promedio general
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Distribución por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.typeDistribution).map(([type, count]) => {
                const Icon = getTypeIcon(type);
                const percentage = analytics.totalResources > 0 
                  ? (count / analytics.totalResources) * 100 
                  : 0;
                
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${getTypeColor(type)}`} />
                        <Badge variant="outline" className="capitalize">
                          {type}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResources.length > 0 ? (
                recentResources.map((resource) => {
                  const Icon = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${getTypeColor(resource.type)} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resource.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay recursos recientes
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Mejor Calificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRatedResources.length > 0 ? (
                topRatedResources.map((resource, index) => {
                  const Icon = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                        {index + 1}
                      </div>
                      <Icon className={`h-4 w-4 ${getTypeColor(resource.type)} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{resource.title}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs">{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay recursos calificados
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recursos Favoritos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {favoriteResources.length > 0 ? (
                favoriteResources.slice(0, 5).map((resource) => {
                  const Icon = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${getTypeColor(resource.type)} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{resource.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4">
                  <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No tienes recursos favoritos aún
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}