'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '../../types/blog';
import { BlogList } from './BlogList';
import BlogPost from './BlogPost';
import { BlogEditor } from './BlogEditor';
import { mockPosts } from '../../data/mockPosts';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useQuickRefresh } from '../../hooks/useQuickRefresh';
import { useRouter, usePathname } from 'next/navigation';
import { slugify } from '../../lib/utils';
import { useSEO, useBlogSEO } from '../../hooks/useSEO';

export function BlogView() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

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
    const path = pathname;
    const match = path.match(/\/blog\/(.+)-([a-zA-Z0-9]+)$/);
    
    if (match) {
      const [, , postId] = match;
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [posts, pathname]);

  // Aplicar SEO específico cuando hay un post seleccionado
  // Los hooks deben llamarse siempre, no condicionalmente
  const postForSEO = selectedPost ? {
    ...selectedPost,
    slug: slugify(selectedPost.title)
  } : null;
  
  useBlogSEO(postForSEO);

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
    // Update URL with Next.js Router
    const url = `/blog/${slugify(post.title)}-${post.id}`;
    router.push(url);
  };

  const handleBack = () => {
    setSelectedPost(null);
    // Update URL with Next.js Router
    router.push('/blog');
  };

  return (
    <div className="space-y-6">

      
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
            post={editingPost || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}