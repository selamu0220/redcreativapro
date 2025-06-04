import { Post } from '../../types/blog';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { formatDate } from './c:\Users\programar\Documents\GitHub\redcreativapro\app\lib\dateUtils';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';

interface BlogPostProps {
  post: Post;
  onBack: () => void;
  onEdit: () => void;
}

export function BlogPost({ post, onBack, onEdit }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
        <Button variant="outline" onClick={onEdit}>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Post
        </Button>
      </div>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.author.avatarUrl} />
          <AvatarFallback>
            {post.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{post.author.name}</h4>
          <p className="text-sm text-muted-foreground">
            Published on {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <ScrollArea className="h-[600px] rounded-md border p-6">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content}
        </div>
      </ScrollArea>
    </article>
  );
}