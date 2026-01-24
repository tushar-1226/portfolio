'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useThrottledMousePosition } from '@/utils/performance';
import SpaceBackground from './SpaceBackground';
import styles from './Hero.module.css';

export default function Hero() {
    // Use throttled mouse position hook (much more efficient)
    const mousePosition = useThrottledMousePosition(66); // ~15fps
    const { scrollY } = useScroll();

    // Parallax transforms
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Memoize SpaceBackground props to prevent unnecessary re-renders
    const spaceBackgroundProps = useMemo(() => ({ mousePosition }), [mousePosition.x, mousePosition.y]);

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
            {/* Multi-layer Space Background with memoized props */}
            <SpaceBackground layer="back" {...spaceBackgroundProps} />
            <SpaceBackground layer="mid" {...spaceBackgroundProps} />

            {/* Cinematic Glow behind name */}
            <motion.div
                className={styles.cinematicGlow}
                style={{
                    x: mousePosition.x * 1.2,
                    y: mousePosition.y * 1.2,
                }}
            />

            {/* Main Content with Parallax */}
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{
                    opacity,
                    x: mousePosition.x * -2,
                    y: mousePosition.y * -2,
                }}
            >
                {/* Glassmorphic Panel */}
                <motion.div
                    className={styles.glassPanel}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Small intro text */}
                    <motion.h1 className={styles.title} variants={staggerItem}>
                        Hello, I'm
                    </motion.h1>

                    {/* Main name with floating animation */}
                    <motion.h2
                        className={styles.name}
                        variants={staggerItem}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 6, // Reduced from 4s for less CPU usage
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Tushar
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p className={styles.subtitle} variants={staggerItem}>
                        Python Backend Engineer | AI/ML Enthusiast
                    </motion.p>

                    {/* Description */}
                    <motion.p className={styles.description} variants={staggerItem}>
                        Artificial Intelligence, Machine Learning, and Algorithm Development
                    </motion.p>
                </motion.div>

                {/* Glass Buttons */}
                <motion.div className={styles.cta} variants={staggerItem}>
                    <motion.button
                        className={styles.glassButton}
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                        }}
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
                        className={styles.glassButton}
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Download Resume
                    </motion.button>
                    <motion.button
                        className={styles.glassButton}
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                        }}
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

                {/* Scroll Indicator */}
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
