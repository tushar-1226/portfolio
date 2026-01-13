'use client';

import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { toast } from 'sonner';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import styles from './Hero.module.css';

export default function Hero() {
    const handleResumeDownload = () => {
        // Trigger the download
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Tushar_Kumar_Resume.pdf';
        link.click();

        // Show success toast
        toast.success('Resume downloaded successfully.', {
            description: 'Thank you for your interest!',
            duration: 3000,
        });
    };

    return (
        <section id="hero" className={styles.hero}>
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 className={styles.title} variants={staggerItem}>
                    <span className="gradient-text">Hello, I'm</span>
                </motion.h1>
                <motion.h2 className={styles.name} variants={staggerItem}>
                    Tushar
                </motion.h2>
                <motion.p className={styles.subtitle} variants={staggerItem}>
                    Python Backend Engineer | AI/ML Enthusiast | Open Source Contributor
                </motion.p>
                <motion.p className={styles.description} variants={staggerItem}>
                    Artificial Intelligence, Machine Learning, and Algorithm Development
                </motion.p>


                <motion.div className={styles.cta} variants={staggerItem}>
                    <motion.button
                        className={styles.primaryButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            document
                                .getElementById('projects')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        View My Work
                    </motion.button>
                    <motion.button
                        onClick={handleResumeDownload}
                        className={styles.secondaryButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Download Resume
                    </motion.button>
                    <motion.button
                        className={styles.secondaryButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            document
                                .getElementById('contact')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        Get In Touch
                    </motion.button>
                </motion.div>

                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.5,
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                >
                    <HiArrowDown size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}
