'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations';
import AnimatedCounter from './AnimatedCounter';
import SpaceBackground from './SpaceBackground';
import styles from './About.module.css';

export default function About() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    return (
        <section id="about" className={styles.about} ref={ref}>
            <SpaceBackground layer="back" mousePosition={mousePosition} />
            <SpaceBackground layer="mid" mousePosition={mousePosition} />
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    About Me
                </motion.h2>

                <div className={styles.content}>
                    <motion.div
                        className={styles.imageContainer}
                        variants={fadeInRight}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Tushar Kumar - Python Backend Engineer"
                            width={400}
                            height={600}
                            className={styles.profileImage}
                            priority
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 400px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxAQHw/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                    </motion.div>

                    <motion.div
                        className={styles.text}
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        <p className={styles.paragraph}>
                            I am a passionate Python developer with a strong focus on building robust, efficient, and scalable software solutions. With a keen eye for clean architecture and maintainable code, I transform complex ideas into reliable applications using Python and its modern ecosystems.
                        </p>
                        <p className={styles.paragraph}>
                            My journey in technology has been shaped by curiosity and a commitment to continuous learning. I specialize in developing backend systems, automation tools, data-driven applications, and APIs that are designed for performance, scalability, and long-term reliability.
                        </p>
                        <p className={styles.paragraph}>
                            Beyond development, I actively explore emerging technologies, contribute to open-source projects, and share insights with the developer community. I believe in writing code that not only works but is readable, testable, and built to evolve with changing requirements.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <h3><AnimatedCounter end={1} suffix="+" /></h3>
                                <p>Years Experience</p>
                            </div>
                            <div className={styles.stat}>
                                <h3><AnimatedCounter end={5} suffix="+" /></h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className={styles.stat}>
                                <h3><AnimatedCounter end={10} suffix="+" /></h3>
                                <p>Happy Clients</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
