'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { staggerContainer, staggerItem } from '@/utils/animations';
import ParticleField from './ParticleField';
import styles from './Hero.module.css';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Tushar_Kumar_Resume.pdf';
        link.click();

        toast.success('Resume downloaded successfully.', {
            description: 'Thank you for your interest!',
            duration: 3000,
        });
    };

    return (
        <section id="hero" className={styles.hero}>
            {/* Animated gradient orbs */}
            <motion.div
                className={styles.gradientOrb1}
                style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                }}
            />
            <motion.div
                className={styles.gradientOrb2}
                style={{
                    x: mousePosition.x * -1.5,
                    y: mousePosition.y * -1.5,
                }}
            />

            {/* Particle field */}
            <ParticleField />

            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ opacity }}
            >
                <motion.div
                    style={{
                        x: mousePosition.x * -0.5,
                        y: mousePosition.y * -0.5,
                    }}
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
                </motion.div>

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
                    style={{ y: y2 }}
                >
                    <HiArrowDown size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}
