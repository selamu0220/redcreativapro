import React, { useState, useEffect } from 'react';
import { Post } from '@/types/blog';
import { BlogList } from './BlogList';
import { BlogPost } from './BlogPost';
import { BlogEditor } from './BlogEditor';
import { mockPosts } from '@/data/mockPosts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuickRefresh } from '@/hooks/useQuickRefresh';
import { useNavigate, useLocation } from 'react-router-dom';
import { slugify } from '@/lib/utils';
import { useSEO, useBlogSEO } from '@/hooks/useSEO';
import { BlogArticleStructuredData } from '@/components/SEO/StructuredData';

export function BlogView() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Hook para refrescado rápido
  const { isRefreshing } = useQuickRefresh({
    onRefresh: async () => {
      // Actualizar posts
      setPosts([...mockPosts]);
      
      toast({
        title: '✅ Blog actualizado',
        description: 'Los posts se han actualizado correctamente',
      });
    }
  });

  // SEO para la página principal del blog
  useSEO({
    title: selectedPost ? undefined : 'Blog | Red Creativa - Contenido sobre Marketing Digital y Creatividad',
    description: selectedPost ? undefined : 'Descubre las últimas tendencias en marketing digital, consejos de productividad y estrategias creativas. Artículos especializados para creadores de contenido.',
    keywords: selectedPost ? undefined : ['blog marketing digital', 'contenido creativo', 'estrategias marketing', 'productividad', 'redes sociales', 'SEO', 'creadores contenido'],
    canonical: selectedPost ? undefined : 'https://redcreativa.pro/blog'
  });

  // SEO dinámico para posts individuales
  useEffect(() => {
    if (selectedPost) {
      // Crear slug para el post
      const slug = slugify(selectedPost.title);
      
      // Aplicar SEO específico del post
      const postWithSlug = {
        ...selectedPost,
        slug: slug
      };
      
      // El hook useBlogSEO se encargará del SEO
      // Se ejecutará automáticamente cuando selectedPost cambie
    }
  }, [selectedPost]);

  // Handle URL-based navigation
  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/blog\/(.+)-([a-zA-Z0-9]+)$/);
    
    if (match) {
      const [, , postId] = match;
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [posts, location.pathname]);

  // Aplicar SEO específico cuando hay un post seleccionado
  if (selectedPost) {
    const slug = slugify(selectedPost.title);
    const postWithSlug = {
      ...selectedPost,
      slug: slug
    };
    useBlogSEO(postWithSlug);
  }

  const handleSavePost = (post: Post) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === post.id ? post : p));
      toast({
        title: 'Post updated',
        description: 'Your post has been updated successfully.',
      });
    } else {
      setPosts([post, ...posts]);
      toast({
        title: 'Post published',
        description: 'Your post has been published successfully.',
      });
    }
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setSelectedPost(null);
    setIsEditorOpen(true);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    // Update URL with React Router
    const url = `/blog/${slugify(post.title)}-${post.id}`;
    navigate(url, { replace: true });
  };

  const handleBack = () => {
    setSelectedPost(null);
    // Update URL with React Router
    navigate('/blog', { replace: true });
  };

  return (
    <div className="space-y-6">
      {/* Datos estructurados para artículos específicos */}
      {selectedPost && (
        <BlogArticleStructuredData
          title={selectedPost.title}
          description={selectedPost.excerpt}
          author={selectedPost.author.name}
          publishedDate={selectedPost.createdAt}
          modifiedDate={selectedPost.updatedAt}
          imageUrl={selectedPost.imageUrl}
          articleUrl={`https://redcreativa.pro/blog/${slugify(selectedPost.title)}-${selectedPost.id}`}
          keywords={selectedPost.tags}
        />
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Read and publish articles about content creation and digital marketing.
          </p>
        </div>
        <Button onClick={handleNewPost}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {selectedPost ? (
        <BlogPost
          post={selectedPost}
          onBack={handleBack}
          onEdit={() => handleEditPost(selectedPost)}
        />
      ) : (
        <BlogList
          posts={posts}
          onPostClick={handlePostSelect}
        />
      )}

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'New Post'}</DialogTitle>
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