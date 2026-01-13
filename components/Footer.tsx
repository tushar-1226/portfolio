'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiArrowUp } from 'react-icons/hi';
import { scrollToTop } from '@/utils/smoothScroll';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3 className={styles.brandName}>Portfolio</h3>
                        <p className={styles.tagline}>
                            Created by Tushar with <FaHeart className={styles.heartIcon} />
                        </p>
                    </div>

                    <div className={styles.links}>
                        <h4 className={styles.linksTitle}>Quick Links</h4>
                        <ul className={styles.linksList}>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#projects">Projects</a>
                            </li>
                            <li>
                                <a href="#achievements">Achievements</a>
                            </li>
                            <li>
                                <a href="#blog">Blog</a>
                            </li>
                            <li>
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.socials}>
                        <h4 className={styles.socialsTitle}>Connect</h4>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://github.com/tushar-1226"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaGithub size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/tushar-kumar-79632b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaLinkedin size={20} />
                            </a>
                            <a
                                href="https://x.com/the_name_Tushar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaXTwitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright} suppressHydrationWarning>
                        © {new Date().getFullYear()} Tushar. All rights reserved.
                    </p>
                </div>

                <motion.button
                    className={styles.backToTop}
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <HiArrowUp size={20} />
                </motion.button>
            </div>
        </footer>
    );
}
