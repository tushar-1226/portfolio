'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { HiStar } from 'react-icons/hi';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Rishika Dhar',
        role: 'Human Resource Executive',
        company: 'Alactic Inc.',
        image: '/testimonial-1.jpg',
        quote: 'Tushar is an exceptional Python developer with a deep understanding of AI/ML systems. His ability to architect scalable solutions and implement complex algorithms is truly impressive. He consistently delivers high-quality code that is both efficient and maintainable.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Shubham Chaubey',
        role: 'AI Architect',
        company: 'Alactic Inc',
        image: '/testimonial-2.jpg',
        quote: 'Working with Tushar on our AI-powered analytics platform was a game-changer. His expertise in Azure cloud services and OpenAI integration helped us reduce processing time by 60%. He\'s a problem solver who brings innovative solutions to complex challenges.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Rohan MOndal',
        role: 'Senior Software Developer',
        company: 'Iconiq Gifts',
        image: '/testimonial-3.jpg',
        quote: 'Tushar\'s contribution to our dataset creation platform was invaluable. He built robust backend systems that handle millions of requests with 99.9% uptime. His code reviews are thorough, and he mentored junior developers exceptionally well.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Mridul Giri',
        role: 'Full Stack Developer',
        company: 'Team Skisha',
        image: '/testimonial-4.jpg',
        quote: 'Tushar has an rare combination of technical brilliance and excellent communication skills. He translated complex technical requirements into practical solutions and always met deadlines. His dedication to code quality and best practices sets him apart.',
        rating: 4,
    },
];

export default function Testimonials() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section id="testimonials" className={styles.testimonials} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    What People Say
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Testimonials from colleagues and mentors
                </motion.p>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className={styles.card}
                            variants={staggerItem}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className={styles.stars}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <HiStar key={i} className={styles.star} />
                                ))}
                            </div>

                            <p className={styles.quote}>"{testimonial.quote}"</p>

                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    <div className={styles.avatarPlaceholder}>
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                <div className={styles.authorInfo}>
                                    <h4 className={styles.name}>{testimonial.name}</h4>
                                    <p className={styles.role}>{testimonial.role}</p>
                                    <p className={styles.company}>{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
