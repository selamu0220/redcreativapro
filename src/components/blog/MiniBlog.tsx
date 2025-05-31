import React, { useState, useEffect } from 'react';
import { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDate } from '@/lib/dateUtils';
import { PlusCircle, ArrowRight, Edit2, Trash2, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockResources } from '@/data/mockResources';
import { BlogEditor } from './BlogEditor';
import { slugify } from '@/lib/utils';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Tendencias en Marketing Digital 2025',
    content: `# Tendencias en Marketing Digital 2025

El marketing digital está en constante evolución. En este artículo exploraremos las tendencias más importantes que dominarán el panorama digital en 2025.

## 1. Inteligencia Artificial en Marketing

La IA está revolucionando la forma en que creamos y distribuimos contenido. Algunas aplicaciones clave incluyen:
- Generación de contenido personalizado
- Análisis predictivo de audiencias
- Optimización automática de campañas

## 2. Video Marketing Inmersivo

El contenido en video sigue siendo rey, pero con nuevas características:
- Realidad aumentada integrada
- Experiencias interactivas
- Formatos verticales optimizados

## 3. Marketing Conversacional

La interacción directa con la audiencia es más importante que nunca:
- Chatbots avanzados
- Mensajería personalizada
- Engagement en tiempo real

## Recursos Recomendados

Para mantenerte actualizado con estas tendencias, te recomendamos:

1. **Herramientas de IA**: Explora nuestra sección de recursos de IA para encontrar las mejores herramientas de generación de contenido.

2. **Plantillas de Video**: Accede a nuestras plantillas profesionales para crear contenido visual impactante.

3. **Guías de Marketing**: Descarga nuestras guías actualizadas sobre estrategias digitales.

¡Regístrate para acceder a todos estos recursos y más!`,
    excerpt: 'Descubre las últimas tendencias que dominarán el marketing digital en 2025.',
    author: {
      id: '1',
      name: 'Red Creativa',
      avatarUrl: '/logo.svg'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['marketing', 'tendencias', '2025'],
    imageUrl: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg'
  },
  {
    id: '2',
    title: 'Guía de SEO para Creadores de Contenido',
    content: `# Guía de SEO para Creadores de Contenido

Optimizar tu contenido para buscadores es esencial para aumentar tu visibilidad online. Esta guía te ayudará a dominar los fundamentos del SEO.

## Fundamentos del SEO

1. Investigación de palabras clave
2. Optimización on-page
3. Creación de contenido valioso
4. Estrategias de linkbuilding

## Herramientas Esenciales

Para mejorar tu SEO necesitarás:
- Herramientas de análisis de keywords
- Plugins de optimización
- Herramientas de análisis de competencia

## Recursos Recomendados

Para mejorar tu estrategia SEO, te recomendamos:

1. **Plantillas SEO**: Accede a nuestras plantillas de auditoría y seguimiento SEO.

2. **Herramientas de Análisis**: Descubre las mejores herramientas en nuestra biblioteca de recursos.

3. **Guías de Optimización**: Encuentra guías detalladas en nuestra sección de recursos.

¡Únete a nuestra comunidad para acceder a recursos exclusivos de SEO!`,
    excerpt: 'Aprende las mejores prácticas de SEO para mejorar la visibilidad de tu contenido.',
    author: {
      id: '1',
      name: 'Red Creativa',
      avatarUrl: '/logo.svg'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['seo', 'contenido', 'guía'],
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg'
  }
];

export function MiniBlog() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/blog\/(.+)$/);
    
    if (match) {
      const [, slug] = match;
      const post = posts.find(p => `${slugify(p.title)}-${p.id}` === slug);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [posts, location.pathname]);

  const recommendedResources = mockResources
    .filter(resource => 
      selectedPost?.tags.some(tag => 
        resource.tags.includes(tag)
      )
    )
    .slice(0, 3);

  const handleResourceClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Regístrate o inicia sesión para acceder a los recursos",
        variant: "destructive"
      });
      return;
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setSelectedPost(null);
    setIsEditorOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    setSelectedPost(null);
    if (selectedPost?.id === postId) {
      navigate('/blog', { replace: true });
    }
    toast({
      title: "Artículo eliminado",
      description: "El artículo ha sido eliminado correctamente"
    });
  };

  const handleSavePost = (post: Post) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === post.id ? post : p));
      toast({
        title: "Artículo actualizado",
        description: "Los cambios han sido guardados correctamente"
      });
    } else {
      setPosts([post, ...posts]);
      toast({
        title: "Artículo publicado",
        description: "Tu artículo ha sido publicado correctamente"
      });
    }
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    const slug = `${slugify(post.title)}-${post.id}`;
    navigate(`/blog/${slug}`, { replace: true });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    navigate('/blog', { replace: true });
  };

  const handleCopyLink = (post: Post) => {
    const slug = `${slugify(post.title)}-${post.id}`;
    const url = `${location.protocol}//${location.host}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Artículos y recursos sobre marketing digital y creación de contenido
          </p>
        </div>
        {isAuthenticated && (
          <Button onClick={handleNewPost}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-video relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatarUrl} />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handlePostClick(post)}
                >
                  Leer más
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyLink(post)}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
                {isAuthenticated && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPost} onOpenChange={handleClosePost}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Artículo</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="mt-6 space-y-6">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedPost.author.avatarUrl} />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedPost.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedPost.createdAt)}
                  </p>
                </div>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {selectedPost.content}
              </div>

              {recommendedResources.length > 0 && (
                <div className="border rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4">Recursos Recomendados</h3>
                  <div className="grid gap-4">
                    {recommendedResources.map((resource) => (
                      <Card key={resource.id} className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {resource.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleResourceClick}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {!isAuthenticated && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Regístrate para acceder a estos recursos y más
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}
            </DialogTitle>
          </DialogHeader>
          <BlogEditor
            onSave={handleSavePost}
            post={editingPost}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}