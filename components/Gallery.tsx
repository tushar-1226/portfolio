'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/utils/animations';
import styles from './Gallery.module.css';

const photos = [
    { id: 1, src: '/gallery/photo1.jpg', alt: 'Dark Artistic Still Life' },
    { id: 2, src: '/gallery/photo2.jpg', alt: 'Lightning Storm Road' },
    { id: 3, src: '/gallery/photo3.jpg', alt: 'Misty Forest Road' },
];

export default function Gallery() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    // Triple the photos for seamless infinite scroll
    const duplicatedPhotos = [...photos, ...photos, ...photos];

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

                <div className={styles.scrollContainer}>
                    <div className={styles.scrollTrack}>
                        {duplicatedPhotos.map((photo, index) => (
                            <div key={`${photo.id}-${index}`} className={styles.photoCard}>
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={640}
                                    height={360}
                                    className={styles.photo}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
