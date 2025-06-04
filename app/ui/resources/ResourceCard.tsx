import { useState } from 'react';
import { Resource } from '@/types/resources';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ResourceDetail } from './ResourceDetail';
import { getResourceIcon } from '@/lib/resourceUtils';
import { cn } from '@/lib/utils';
import { Star, MoreHorizontal, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ResourceIcon = getResourceIcon(resource.type);
  const { toast } = useToast();

  const handleClick = () => {
    setIsDetailOpen(true);
  };

  const isAccessible = true;

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md group relative">
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
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
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
            <div className="space-y-1">
              <h3 className="font-medium leading-none line-clamp-1">
                {resource.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {resource.description}
              </p>
            </div>
            <div className="flex items-center">
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
          <div className="flex flex-wrap gap-1">
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
            className="ml-auto text-xs"
            onClick={handleClick}
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
            <ResourceDetail resource={resource} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}