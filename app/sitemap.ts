import { getSortedPostsData } from '@/lib/blog';

export default function sitemap() {
    const baseUrl = 'https://yourportfolio.com'; // TODO: Update with actual domain
    const posts = getSortedPostsData();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}#about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}#projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}#blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}#contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        // Individual blog posts
        ...posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
