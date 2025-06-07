import { Resource, ResourceComment } from '../../types/resources';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { getResourceIcon } from "../../lib/resourceUtils";
import { formatDate } from "../../lib/dateUtils";
import { Download, Link as LinkIcon, ExternalLink, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { v4 } from '../../lib/utils';

interface ResourceDetailProps {
  resource: Resource;
  onAddComment: (resourceId: string, comment: ResourceComment) => void;
}

export function ResourceDetail({ resource, onAddComment }: ResourceDetailProps) {
  const [newComment, setNewComment] = useState('');
  const ResourceIcon = getResourceIcon(resource.type);
  const { user } = useAuth();

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: ResourceComment = {
      id: v4(),
      resourceId: resource.id,
      userId: user.id,
      userName: user.name,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAddComment(resource.id, comment);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ResourceIcon className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{resource.title}</h2>
            <p className="text-muted-foreground">{resource.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="comments">Comentarios</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="min-h-[300px] border rounded-md mt-4">
              {resource.thumbnailUrl ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={resource.thumbnailUrl}
                    alt={resource.title}
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-muted">
                  <ResourceIcon className="h-20 w-20 text-muted-foreground" />
                </div>
              )}
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <div className="space-y-4">
                {user && (
                  <div className="flex gap-4">
                    <Textarea
                      placeholder="Añade un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment}>Comentar</Button>
                  </div>
                )}
                
                {resource.comments?.length ? (
                  <div className="space-y-4">
                    {resource.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.userAvatar} />
                          <AvatarFallback>
                            {comment.userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.userName}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No hay comentarios aÃºn
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="history">
              <div className="p-4 text-center text-muted-foreground">
                Historial de versiones próximamente
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium">Información</h3>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium capitalize">{resource.type.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Añadido</span>
                <span>{formatDate(resource.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tamaño</span>
                <span>{resource.size || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span>{resource.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {resource.url && (
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Enlace Externo</h3>
              <Button variant="outline" className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir URL
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
