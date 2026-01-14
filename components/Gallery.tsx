'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/utils/animations';
import styles from './Gallery.module.css';

const photos = [
    { id: 1, src: '/gallery/photo1.jpg', alt: 'Dark Artistic Still Life' },
    { id: 2, src: '/gallery/photo2.jpg', alt: 'Lightning Storm Road' },
    { id: 3, src: '/gallery/photo3.jpg', alt: 'Misty Forest Road' },
    { id: 4, src: '/gallery/photo4.jpg', alt: 'Moonlit Canyon Night' },
    { id: 5, src: '/gallery/photo5.jpg', alt: 'Dark Mountain Valley' },
    { id: 6, src: '/gallery/photo6.jpg', alt: 'Blood Moon Reflection' },
    { id: 7, src: '/gallery/photo7.jpg', alt: 'Abstract Dark Spheres' },
];

export default function Gallery() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
        } else {
            setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') navigate('prev');
            if (e.key === 'ArrowRight') navigate('next');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Get transform styles based on position relative to active index
    const getCardStyle = (index: number) => {
        const diff = index - activeIndex;

        if (diff === 0) {
            // Center card - prominent
            return {
                transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
                opacity: 1,
                zIndex: 10,
            };
        } else if (diff === 1 || diff === -(photos.length - 1)) {
            // Right card
            return {
                transform: 'translateX(60%) translateZ(-200px) rotateY(-35deg) scale(0.8)',
                opacity: 0.6,
                zIndex: 5,
            };
        } else if (diff === -1 || diff === photos.length - 1) {
            // Left card
            return {
                transform: 'translateX(-60%) translateZ(-200px) rotateY(35deg) scale(0.8)',
                opacity: 0.6,
                zIndex: 5,
            };
        } else {
            // Hidden cards
            return {
                transform: 'translateX(0) translateZ(-400px) scale(0.5)',
                opacity: 0,
                zIndex: 1,
            };
        }
    };

    return (
        <section id="gallery" className={styles.gallery} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Gallery
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Moments captured through my journey
                </motion.p>

                <div className={styles.carouselContainer}>
                    <div className={styles.carousel3d}>
                        {photos.map((photo, index) => (
                            <div
                                key={photo.id}
                                className={`${styles.carouselCard} ${index === activeIndex ? styles.active : ''
                                    }`}
                                style={getCardStyle(index)}
                                onClick={() => setActiveIndex(index)}
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={800}
                                    height={500}
                                    className={styles.carouselImage}
                                />
                                <div className={styles.cardOverlay}>
                                    <h3>{photo.alt}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className={`${styles.navButton} ${styles.navPrev}`}
                        onClick={() => navigate('prev')}
                        aria-label="Previous image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.navButton} ${styles.navNext}`}
                        onClick={() => navigate('next')}
                        aria-label="Next image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicators */}
                    <div className={styles.indicators}>
                        {photos.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''
                                    }`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
