'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { HiDocument, HiExternalLink } from 'react-icons/hi';
import styles from './Blog.module.css';
import { blogSummaries } from '@/utils/blogData';

export default function Blog() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section id="blog" className={styles.blog} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Blog &amp; Research
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Thoughts, tutorials, and research papers
                </motion.p>

                <motion.div
                    className={styles.notesGrid}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {blogSummaries.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                            <motion.div
                                className={`${styles.note} ${styles[post.color]}`}
                                variants={staggerItem}
                                whileHover={{
                                    rotate: Math.random() * 4 - 2,
                                    scale: 1.05,
                                    y: -8
                                }}
                            >
                                <div className={styles.notePin}></div>
                                <div className={styles.noteHeader}>
                                    <HiDocument size={20} />
                                    <span className={styles.noteType}>{post.type}</span>
                                </div>
                                <h3 className={styles.noteTitle}>{post.title}</h3>
                                <p className={styles.noteDate}>{post.date}</p>
                                <p className={styles.noteDescription}>{post.description}</p>
                                <div className={styles.noteFooter}>
                                    <HiExternalLink size={16} />
                                    <span>Read More</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
