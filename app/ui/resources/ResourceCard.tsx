import { useState } from 'react';
import { Resource } from '@/app/types/resources';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { AspectRatio } from '../../ui/aspect-ratio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ResourceDetail } from './ResourceDetail';
import { getResourceIcon } from "../../lib/resourceUtils";
import { cn } from '../../lib/utils';
import { Star, MoreHorizontal, Lock, Heart, Eye, Download, Share2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function ResourceCard({ 
  resource, 
  onClick,
  viewMode = 'grid',
  isFavorite = false,
  onToggleFavorite
}: ResourceCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ResourceIcon = getResourceIcon(resource.type);
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsDetailOpen(true);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  const isAccessible = true;

  if (viewMode === 'list') {
    return (
      <>
        <Card className="overflow-hidden transition-all hover:shadow-md group cursor-pointer" onClick={handleClick}>
          <div className="flex items-center p-4 gap-4">
            {/* Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0">
              <div
                className={cn(
                  'flex items-center justify-center w-full h-full rounded-lg',
                  resource.thumbnailUrl
                    ? 'bg-cover bg-center'
                    : 'bg-muted'
                )}
                style={
                  resource.thumbnailUrl
                    ? { backgroundImage: `url(${resource.thumbnailUrl})` }
                    : {}
                }
              >
                {!resource.thumbnailUrl && (
                  <ResourceIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-medium leading-none truncate">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {resource.type}
                    </Badge>
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{resource.rating}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavoriteClick}
                    className="p-1"
                  >
                    <Heart 
                      className={cn(
                        'h-4 w-4',
                        isFavorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      )} 
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <VisuallyHidden>
              <DialogHeader>
                <DialogTitle>Resource Details</DialogTitle>
              </DialogHeader>
            </VisuallyHidden>
            <ResourceDetail resource={resource} onAddComment={() => {}} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Grid view (default)
  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md group relative cursor-pointer" onClick={handleClick}>
        {!isAccessible && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <div
              className={cn(
                'flex items-center justify-center w-full h-full relative',
                resource.thumbnailUrl
                  ? 'bg-cover bg-center'
                  : 'bg-muted'
              )}
              style={
                resource.thumbnailUrl
                  ? { backgroundImage: `url(${resource.thumbnailUrl})` }
                  : {}
              }
            >
              {!resource.thumbnailUrl && (
                <ResourceIcon className="h-12 w-12 text-muted-foreground" />
              )}
              {isAccessible && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                    onClick={handleFavoriteClick}
                  >
                    <Heart 
                      className={cn(
                        'h-4 w-4',
                        isFavorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-white'
                      )} 
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-medium leading-none line-clamp-1">
                {resource.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {resource.description}
              </p>
            </div>
            <div className="flex items-center ml-2">
              <Star
                className={cn(
                  'h-4 w-4',
                  resource.rating >= 4
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground'
                )}
              />
              <span className="ml-1 text-xs">{resource.rating}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-wrap gap-2">
          <div className="flex flex-wrap gap-1 flex-1">
            <Badge variant="outline" className="text-xs capitalize">
              {resource.type}
            </Badge>
            {resource.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {resource.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{resource.tags.length - 2}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Details
          </Button>
        </CardFooter>
      </Card>

      {isAccessible && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{resource.title}</DialogTitle>
            </DialogHeader>
            <ResourceDetail resource={resource} onAddComment={(resourceId, comment) => {
              // TODO: Implement actual comment adding logic
              console.log('Add comment:', resourceId, comment);
            }} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
