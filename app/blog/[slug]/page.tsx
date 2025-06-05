import { BlogView } from '../../ui/blog/BlogView';
import AppLayout from '../../components/AppLayout';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return (
    <AppLayout>
      <BlogView />
    </AppLayout>
  );
}