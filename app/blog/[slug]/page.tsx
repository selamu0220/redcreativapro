import { BlogView } from '../../ui/blog/BlogView';
import AppLayout from '../../components/AppLayout';

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