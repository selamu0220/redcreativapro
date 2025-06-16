import React from 'react';
import { Post } from '../../types/blog';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { formatDate } from "../../lib/dateUtils";
import { ArrowLeft, Edit2, Clock, Calendar, Share2, BookOpen, Eye } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';
import { Card, CardContent } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { AspectRatio } from '../../ui/aspect-ratio';

interface BlogPostProps {
  post: Post;
  onBack: () => void;
  onEdit: () => void;
}

export default function BlogPost({ post, onBack, onEdit }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit()}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatarUrl} />
                <AvatarFallback className="text-xs">
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author.name}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>1.2k views</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <Card className="mb-12 overflow-hidden border-0 shadow-2xl">
            <AspectRatio ratio={16 / 9}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </AspectRatio>
          </Card>
        )}

        {/* Article Content */}
        <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {/* Reading Progress Indicator */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <BookOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Reading Progress
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-0 transition-all duration-300" style={{width: '0%'}}></div>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">5 min</span>
            </div>

            {/* Content */}
            <div className="max-w-none">
              {post.content.split('\n\n').map((block, index) => {
                const trimmedBlock = block.trim();
                
                // Skip empty blocks
                if (!trimmedBlock) return null;
                
                // Handle main headings (# Title)
                if (trimmedBlock.startsWith('# ')) {
                  const title = trimmedBlock.substring(2);
                  return (
                    <h1 key={index} className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4 leading-tight border-b-2 border-blue-500 pb-3">
                      {title}
                    </h1>
                  );
                }
                
                // Handle section headings (## Section)
                if (trimmedBlock.startsWith('## ')) {
                  const title = trimmedBlock.substring(3);
                  return (
                    <h2 key={index} className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3 leading-tight">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {title}
                      </span>
                    </h2>
                  );
                }
                
                // Handle subsection headings (### Subsection)
                if (trimmedBlock.startsWith('### ')) {
                  const title = trimmedBlock.substring(4);
                  return (
                    <h3 key={index} className="text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-300 mt-5 mb-3 leading-tight">
                      <span className="border-l-4 border-blue-500 pl-4">
                        {title}
                      </span>
                    </h3>
                  );
                }
                
                // Handle sub-subsection headings (#### Sub-subsection)
                if (trimmedBlock.startsWith('#### ')) {
                  const title = trimmedBlock.substring(5);
                  return (
                    <h4 key={index} className="text-base md:text-lg font-semibold text-slate-600 dark:text-slate-400 mt-4 mb-2 leading-tight">
                      {title}
                    </h4>
                  );
                }
                
                // Handle unordered lists
                if (trimmedBlock.includes('\n- ') || trimmedBlock.startsWith('- ')) {
                  const listItems = trimmedBlock.split('\n').filter(line => line.trim().startsWith('- '));
                  return (
                    <ul key={index} className="list-none space-y-3 my-6 pl-0">
                      {listItems.map((item, itemIndex) => {
                        const content = item.substring(2).trim();
                        const processedContent = content
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700 dark:text-slate-300">$1</em>');
                        return (
                          <li key={itemIndex} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
                            <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                            <span 
                              className="text-slate-700 dark:text-slate-300 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: processedContent }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                
                // Handle numbered lists
                if (/^\d+\. /.test(trimmedBlock) || trimmedBlock.includes('\n1. ')) {
                  const listItems = trimmedBlock.split('\n').filter(line => /^\d+\. /.test(line.trim()));
                  return (
                    <ol key={index} className="list-none space-y-3 my-6 pl-0">
                      {listItems.map((item, itemIndex) => {
                        const content = item.replace(/^\d+\. /, '').trim();
                        const processedContent = content
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700 dark:text-slate-300">$1</em>');
                        return (
                          <li key={itemIndex} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-lg border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
                            <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                              {itemIndex + 1}
                            </span>
                            <span 
                              className="text-slate-700 dark:text-slate-300 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: processedContent }}
                            />
                          </li>
                        );
                      })}
                    </ol>
                  );
                }
                
                // Handle regular paragraphs
                if (trimmedBlock) {
                  // Split by single line breaks and join with spaces to create proper paragraphs
                  const cleanText = trimmedBlock
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .join(' ');
                  
                  const processedContent = cleanText
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100 bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700 dark:text-slate-300">$1</em>');
                  
                  return (
                    <p 
                      key={index} 
                      className="text-slate-800 dark:text-slate-200 leading-7 mb-6 text-lg font-normal"
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                  );
                }
                
                return null;
              })}
            </div>

            {/* Article Footer */}
            <Separator className="my-8" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatarUrl} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{post.author.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Content Creator</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Article
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles Placeholder */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-32 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-slate-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors">
                  Related Article Title
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Brief description of the related article...
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-32 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-slate-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors">
                  Another Related Article
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Brief description of another related article...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
