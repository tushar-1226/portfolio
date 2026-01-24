'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { HiExternalLink, HiCode, HiStar, HiCloud } from 'react-icons/hi';
import type { ComponentType } from 'react';
import {
    SiPython,
    SiOpenai,
    SiNextdotjs,
    SiReact,
    SiPostgresql,
    SiVuedotjs,
    SiExpress,
    SiRedis,
    SiTailwindcss,
    SiDjango,
    SiNodedotjs,
    SiJavascript,
    SiTypescript
} from 'react-icons/si';
import SpaceBackground from './SpaceBackground';
import styles from './Projects.module.css';

// Tech icon mapping
const techIcons: Record<string, ComponentType<{ size: number }>> = {
    'Python': SiPython,
    'Azure': HiCloud,
    'OpenAI': SiOpenai,
    'Next.js': SiNextdotjs,
    'React': SiReact,
    'SQL': SiPostgresql,
    'Vue.js': SiVuedotjs,
    'Express': SiExpress,
    'Redis': SiRedis,
    'Chart.js': HiCode,
    'Tailwind CSS': SiTailwindcss,
    'Django': SiDjango,
    'Node.js': SiNodedotjs,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
};

const projects = [
    {
        id: 0,
        title: 'Alactic AGI',
        description:
            'Enterprise AI dataset creation platform that processes multi-source web content and documents with AI-powered quality analysis, enabling organizations to structure large-scale content with 95%+ accuracy rates.',
        tech: ['Python', 'Azure', 'OpenAI', 'Next.js', 'React'],
        github: '#',
        demo: 'https://alactic.io',
        featured: true,
        category: ['AI/ML', 'Python', 'Web Development'],
    },
    {
        id: 1,
        title: 'Clarity Flow',
        description:
            'An advanced real-time Budget Tracker with AI-powered insights and personalized recommendations with real-time data visualization and sentiment analysis.',
        tech: ['Next.js', 'Python', 'SQL'],
        github: 'https://github.com/tushar-1226/Clarity_Flow',
        demo: 'https://clarity-flow-puce.vercel.app/',
        featured: false,
        category: ['AI/ML', 'Python', 'Web Development'],
    },
    {
        id: 2,
        title: 'FRIDAY AGENT',
        description:
            'Smart task management app powered by AI to prioritize tasks, suggest deadlines, and optimize productivity.',
        tech: ['Python', 'Next.js', 'Tailwind CSS'],
        github: 'https://github.com/tushar-1226/AGENT',
        demo: '#',
        featured: false,
        category: ['AI/ML', 'Python', 'Web Development'],
    },
    {
        id: 3,
        title: 'Social Media Dashboard',
        description:
            'Analytics dashboard for social media management with real-time data visualization and sentiment analysis.',
        tech: ['Vue.js', 'Express', 'Redis', 'Chart.js'],
        github: '#',
        demo: '#',
        featured: false,
        category: ['Web Development', 'AI/ML'],
    }
];

export default function Projects() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const [activeFilter, setActiveFilter] = useState('All');
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

    const filters = ['All', 'AI/ML', 'Web Development', 'Python'];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category.includes(activeFilter));

    const getTechIcon = (techName: string) => {
        const Icon = techIcons[techName];
        return Icon ? Icon : HiCode; // Fallback to code icon
    };

    return (
        <section id="projects" className={styles.projects} ref={ref}>
            <SpaceBackground layer="back" mousePosition={mousePosition} />
            <SpaceBackground layer="mid" mousePosition={mousePosition} />
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Featured Projects
                </motion.h2>

                {/* Filter Buttons */}
                <motion.div
                    className={styles.filterContainer}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''
                                }`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            className={`${styles.card} ${project.featured ? styles.featuredCard : ''
                                }`}
                            variants={staggerItem}
                            whileHover={{ y: -8 }}
                        >
                            {project.featured && (
                                <div className={styles.featuredBadge}>
                                    <HiStar size={16} />
                                    <span>Featured Project</span>
                                </div>
                            )}
                            <div className={styles.cardContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.techStack}>
                                    {project.tech.map((tech, index) => {
                                        const Icon = getTechIcon(tech);
                                        return (
                                            <motion.div
                                                key={index}
                                                className={styles.techIcon}
                                                whileHover={{ scale: 1.2, y: -4 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                                title={tech}
                                            >
                                                <Icon size={24} />
                                                <span className={styles.techTooltip}>{tech}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className={styles.links}>
                                    <a
                                        href={project.github}
                                        className={styles.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <HiCode size={20} />
                                        Code
                                    </a>
                                    <a
                                        href={project.demo}
                                        className={styles.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <HiExternalLink size={20} />
                                        Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
