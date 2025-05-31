import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/dateUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from '@/components/ui/link';
import { slugify } from '@/lib/utils';

interface BlogListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function BlogList({ posts, onPostClick }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader className="p-0">
            <AspectRatio ratio={16 / 9}>
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
                  <span className="text-muted-foreground">No image</span>
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
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </span>
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
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => onPostClick(post)}
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}