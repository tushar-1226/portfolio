import { getPostData, getSortedPostsData } from '@/lib/blog';
import BlogPostViewer from '@/components/BlogPostViewer';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

function MarkdownImage({
    src,
    alt,
    width,
    height,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
    if (!src) return null;

    const parsedWidth = typeof width === 'number' ? width : Number.parseInt(String(width || ''), 10);
    const parsedHeight = typeof height === 'number' ? height : Number.parseInt(String(height || ''), 10);

    const hasDimensions = Number.isFinite(parsedWidth) && parsedWidth > 0 && Number.isFinite(parsedHeight) && parsedHeight > 0;

    if (hasDimensions) {
        return (
            <Image
                src={String(src)}
                alt={alt || ''}
                width={parsedWidth}
                height={parsedHeight}
                quality={75}
                sizes="(max-width: 768px) 100vw, 800px"
            />
        );
    }

    return (
        <span style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '16/9' }}>
            <Image
                src={String(src)}
                alt={alt || ''}
                fill
                quality={75}
                sizes="100vw"
                style={{ objectFit: 'contain' }}
            />
        </span>
    );
}

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
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: MarkdownImage,
                }}
            >
                {post.content}
            </ReactMarkdown>
        </BlogPostViewer>
    );
}
