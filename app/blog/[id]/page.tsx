import { getPostData, getSortedPostsData } from '@/lib/blog';
import BlogPostViewer from '@/components/BlogPostViewer';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = getPostData(id);

    if (!post) {
        notFound();
    }

    return (
        <BlogPostViewer post={post}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
            </ReactMarkdown>
        </BlogPostViewer>
    );
}
