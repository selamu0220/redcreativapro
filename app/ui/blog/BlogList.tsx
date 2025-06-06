'use client';
import React from 'react';
import { Post } from '../../types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { formatDate } from "../../lib/dateUtils";
import { AspectRatio } from '../../ui/aspect-ratio';
import { Link } from '../../ui/link';
import { slugify } from '../../lib/utils';
import { Clock, Eye, ArrowRight, Calendar, User, TrendingUp, BookOpen } from 'lucide-react';
import { Separator } from '../../ui/separator';
import { cn } from '../../lib/utils';

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

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Blog Profesional</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Red Creativa
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Pro Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Descubre estrategias avanzadas de marketing digital, técnicas de creatividad y consejos profesionales para impulsar tu negocio al siguiente nivel.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{posts.length} Artículos</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Expertos en Marketing</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Actualizado Semanalmente</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Article */}
        {featuredPost && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Artículo Destacado
              </h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group">
              <div className="lg:flex">
                <div className="lg:w-3/5 relative overflow-hidden">
                  <AspectRatio ratio={16 / 10}>
                    {featuredPost.imageUrl ? (
                      <img
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <BookOpen className="h-16 w-16 mx-auto text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400 text-xl font-medium">Red Creativa Pro</span>
                        </div>
                      </div>
                    )}
                  </AspectRatio>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                      Destacado
                    </Badge>
                  </div>
                </div>
                
                <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
                        <AvatarImage src={featuredPost.author.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                          {featuredPost.author.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{featuredPost.author.name}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(featuredPost.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{calculateReadTime(featuredPost.content)} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {featuredPost.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                       {featuredPost.tags.slice(0, 3).map((tag) => (
                         <Badge key={tag} variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                           {tag}
                         </Badge>
                       ))}
                     </div>
                   </div>
                   
                   <Button 
                     onClick={() => onPostClick(featuredPost)}
                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                     size="lg"
                   >
                     <span className="mr-2">Leer Artículo Completo</span>
                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                   </Button>
                 </div>
               </div>
             </Card>
           </section>
         )}

         {/* Regular Posts Grid */}
         {regularPosts.length > 0 && (
           <section>
             <div className="flex items-center gap-3 mb-12">
               <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                 Más Artículos
               </h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {regularPosts.map((post) => (
                 <Card 
                   key={post.id} 
                   className="group cursor-pointer overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                   onClick={() => onPostClick(post)}
                 >
                   <div className="relative overflow-hidden">
                     <AspectRatio ratio={16 / 9}>
                       {post.imageUrl ? (
                         <img
                           src={post.imageUrl}
                           alt={post.title}
                           className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                         />
                       ) : (
                         <div className="w-full h-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 flex items-center justify-center">
                           <BookOpen className="h-12 w-12 text-slate-400" />
                         </div>
                       )}
                     </AspectRatio>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                   
                   <CardContent className="p-6 space-y-4">
                     <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                       <div className="flex items-center gap-1">
                         <Calendar className="h-4 w-4" />
                         <span>{formatDate(post.createdAt)}</span>
                       </div>
                       <div className="flex items-center gap-1">
                         <Clock className="h-4 w-4" />
                         <span>{calculateReadTime(post.content)} min</span>
                       </div>
                     </div>
                     
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                       {post.title}
                     </h3>
                     
                     <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                       {post.excerpt}
                     </p>
                     
                     <div className="flex flex-wrap gap-2">
                       {post.tags.slice(0, 2).map((tag) => (
                         <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                           {tag}
                         </Badge>
                       ))}
                     </div>
                   </CardContent>
                   
                   <CardFooter className="p-6 pt-0">
                     <div className="flex items-center justify-between w-full">
                       <div className="flex items-center gap-3">
                         <Avatar className="h-8 w-8">
                           <AvatarImage src={post.author.avatarUrl} />
                           <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-600 text-white text-xs font-bold">
                             {post.author.name.charAt(0).toUpperCase()}
                           </AvatarFallback>
                         </Avatar>
                         <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                           {post.author.name}
                         </span>
                       </div>
                       <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                     </div>
                   </CardFooter>
                 </Card>
               ))}
             </div>
           </section>
         )}

         {/* Empty State */}
         {posts.length === 0 && (
           <div className="text-center py-20">
             <BookOpen className="h-20 w-20 mx-auto mb-6 text-slate-400" />
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
               No hay artículos disponibles
             </h3>
             <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
               Aún no se han publicado artículos en el blog. ¡Vuelve pronto para ver contenido nuevo!
             </p>
           </div>
         )}
       </div>
     </div>
  );
}
