import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  id: string;
  title: string;
  type: string;
  date: string; // Keep as string for display, or parse if needed
  readTime: string;
  color: string;
  description: string;
  tags: string[];
  content: string; // raw MDX content
  slug: string;
};

export function getSortedPostsData(): BlogPost[] {
  // Create bucket directory if it doesn't exist (useful for first run)
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPosts = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id/slug
    const slug = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const data = matterResult.data as { date?: Date | string; [key: string]: any };
    // Safe date serialization
    const dateStr = data.date instanceof Date 
      ? data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
      : (data.date as string || '');

    // Combine the data with the id
    return {
      slug,
      content: matterResult.content,
      ...matterResult.data,
      date: dateStr,
    } as BlogPost;
  });

  // Sort posts by date
  return allPosts.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  });
}

export function getPostData(slug: string): BlogPost | undefined {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const data = matterResult.data as { date?: Date | string; [key: string]: any };
  const dateStr = data.date instanceof Date 
    ? data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
    : (data.date as string || '');

  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
    date: dateStr,
  } as BlogPost;
}
