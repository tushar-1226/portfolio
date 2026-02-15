'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiCalendar, HiClock, HiDocument } from 'react-icons/hi';
import styles from './BlogPostViewer.module.css';
import { BlogPost } from '@/lib/blog';
import { ReactNode } from 'react';

interface BlogPostViewerProps {
    post: BlogPost;
    children: ReactNode;
}

export default function BlogPostViewer({ post, children }: BlogPostViewerProps) {
    const router = useRouter();

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
                    {children}
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
