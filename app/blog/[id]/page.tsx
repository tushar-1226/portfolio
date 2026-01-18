'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiCalendar, HiClock, HiDocument } from 'react-icons/hi';
import styles from './page.module.css';
import { blogPostsById } from '@/utils/blogData';

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const post = blogPostsById[id];

    if (!post) {
        return (
            <div className={styles.container}>
                <h1>Blog post not found</h1>
                <button onClick={() => router.push('/#blog')}>Go back</button>
            </div>
        );
    }

    return (
        <div className={styles.blogPost}>
            <div className={styles.container}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => router.push('/#blog')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -5 }}
                >
                    <HiArrowLeft size={20} />
                    <span>Back to Blog</span>
                </motion.button>

                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={styles.metadata}>
                        <span className={`${styles.badge} ${styles[post.color]}`}>
                            <HiDocument size={16} />
                            {post.type}
                        </span>
                        <span className={styles.metaItem}>
                            <HiCalendar size={16} />
                            {post.date}
                        </span>
                        <span className={styles.metaItem}>
                            <HiClock size={16} />
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.description}>{post.description}</p>

                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.article
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {post.content.split('\n\n').map((paragraph, index) => {
                        // Handle headings
                        if (paragraph.startsWith('# ')) {
                            return (
                                <h1 key={index} className={styles.h1}>
                                    {paragraph.replace('# ', '')}
                                </h1>
                            );
                        }
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={index} className={styles.h2}>
                                    {paragraph.replace('## ', '')}
                                </h2>
                            );
                        }
                        if (paragraph.startsWith('### ')) {
                            return (
                                <h3 key={index} className={styles.h3}>
                                    {paragraph.replace('### ', '')}
                                </h3>
                            );
                        }

                        // Handle code blocks
                        if (paragraph.startsWith('```')) {
                            const code = paragraph.replace(/```\w*\n?/g, '').trim();
                            return (
                                <pre key={index} className={styles.codeBlock}>
                                    <code>{code}</code>
                                </pre>
                            );
                        }

                        // Handle lists
                        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                            const items = paragraph.split('\n');
                            return (
                                <ul key={index} className={styles.list}>
                                    {items.map((item, i) => (
                                        <li key={i}>{item.replace(/^[-*]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                                    ))}
                                </ul>
                            );
                        }

                        // Handle numbered lists
                        if (/^\d+\./.test(paragraph)) {
                            const items = paragraph.split('\n');
                            return (
                                <ol key={index} className={styles.orderedList}>
                                    {items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{
                                            __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        }} />
                                    ))}
                                </ol>
                            );
                        }

                        // Handle bold text in paragraphs
                        const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>');

                        // Regular paragraph
                        return (
                            <p
                                key={index}
                                className={styles.paragraph}
                                dangerouslySetInnerHTML={{ __html: formattedText }}
                            />
                        );
                    })}
                </motion.article>

                <motion.div
                    className={styles.footer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <button className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Back to Top ↑
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
