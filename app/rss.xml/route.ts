import { blogPostsById } from '@/utils/blogData';
import { NextResponse } from 'next/server';

const siteUrl = 'https://yourportfolio.com';

export async function GET() {
  const items = Object.values(blogPostsById)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = items
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.id}</guid>
      <description><![CDATA[${post.description}]]></description>
    </item>`)
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Tushar Portfolio Blog</title>
      <link>${siteUrl}</link>
      <description>Thoughts, tutorials, and research papers</description>
      ${rssItems}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
