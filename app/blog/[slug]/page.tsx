import { BlogView } from '@/components/blog/BlogView';
import AppLayout from '@/app/components/AppLayout';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <AppLayout>
      <BlogView />
    </AppLayout>
  );
}