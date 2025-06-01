import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { mockPosts } from '@/data/mockPosts';
import { Post } from '@/types/blog';
import { PlusCircle, Calendar, User } from 'lucide-react';

export function MiniBlog() {
  const { isAuthenticated } = useAuth();
  const [posts] = useState<Post[]>(mockPosts);

  const handleNewPost = () => {
    console.log('Nuevo post');
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                Leer más
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}