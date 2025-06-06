'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { Badge } from '@/app/ui/badge';
import { Progress } from '@/app/ui/progress';
import { Resource } from '@/app/lib/types/resources';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

interface ResourceAnalyticsProps {
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
}

export function ResourceAnalytics({ resources, analytics }: ResourceAnalyticsProps) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      document: 'bg-blue-500',
      image: 'bg-green-500',
      video: 'bg-purple-500',
      audio: 'bg-orange-500',
      other: 'bg-gray-500'
    };
    return colors[type] || colors.other;
  };

  const totalFiles = Object.values(analytics.typeDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Recursos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.recentUploads} subidos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamaño Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSize}</div>
            <p className="text-xs text-muted-foreground">
              Espacio utilizado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              De 5.0 estrellas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.favoriteCount}</div>
            <p className="text-xs text-muted-foreground">
              Recursos marcados
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analytics.typeDistribution).map(([type, count]) => {
              const percentage = totalFiles > 0 ? (count / totalFiles) * 100 : 0;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recursos Más Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{resource.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{resource.rating}</span>
                      <span className="text-xs text-muted-foreground">★</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}