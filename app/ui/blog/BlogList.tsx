import React from 'react';
import { Post } from '../../types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { formatDate } from "../lib\dateUtils";
import { AspectRatio } from '../../ui/aspect-ratio';
import { Link } from '../../ui/link';
import { slugify } from '../../lib/utils';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { Separator } from '../../ui/separator';

interface BlogListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function BlogList({ posts, onPostClick }: BlogListProps) {
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog de Red Creativa Pro</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre las Ãºltimas tendencias en marketing digital, consejos de productividad y estrategias creativas para impulsar tu contenido.
        </p>
        <Separator className="max-w-xs mx-auto" />
      </div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">ArtÃ­culo Destacado</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <AspectRatio ratio={16 / 9}>
                  {posts[0].imageUrl ? (
                    <img
                      src={posts[0].imageUrl}
                      alt={posts[0].title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground text-lg">Red Creativa Pro</span>
                    </div>
                  )}
                </AspectRatio>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={posts[0].author.avatarUrl} />
                    <AvatarFallback>
                      {posts[0].author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{posts[0].author.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(posts[0].createdAt)}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{calculateReadTime(posts[0].content)} min lectura</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/blog/${slugify(posts[0].title)}-${posts[0].id}`}
                  className="no-underline group"
                  onClick={(e) => {
                    e.preventDefault();
                    onPostClick(posts[0]);
                  }}
                >
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {posts[0].excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {posts[0].tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  onClick={() => onPostClick(posts[0])}
                  className="group"
                >
                  Leer ArtÃ­culo Completo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent Posts Grid */}
      {posts.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">ArtÃ­culos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover w-full h-full rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-t-lg">
                        <span className="text-muted-foreground">Red Creativa Pro</span>
                      </div>
                    )}
                  </AspectRatio>
                </CardHeader>
                
                <CardContent className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatarUrl} />
                      <AvatarFallback>
                        {post.author.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{post.author.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>â€¢</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{calculateReadTime(post.content)} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${slugify(post.title)}-${post.id}`}
                    className="no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      onPostClick(post);
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full group"
                    variant="outline"
                    onClick={() => onPostClick(post)}
                  >
                    Leer MÃ¡s
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
