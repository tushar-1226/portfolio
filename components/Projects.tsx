'use client';

import { useState } from 'react';
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
    SiTypescript,
    SiMongodb,
    SiDocker,
    SiFastapi,
    SiHtml5,
    SiCss3,
    SiPandas,
    SiFlask
} from 'react-icons/si';
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
    'MongoDB': SiMongodb,
    'Docker': SiDocker,
    'FastAPI': SiFastapi,
    'HTML5': SiHtml5,
    'CSS3': SiCss3,
    'Pandas': SiPandas,
    'Flask': SiFlask,
};

const projects = [
    {
        id: 0,
        title: 'Alactic AGI',
        description:
            'Enterprise AI dataset creation platform that processes multi-source web content and documents with AI-powered quality analysis, enabling organizations to structure large-scale content with 95%+ accuracy rates.',
        tech: ['Python', 'Azure', 'OpenAI', 'Next.js', 'React'],
        github: '#',
        demo: 'https://platform.alactic.io/',
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
        category: ['AI/ML', 'Python',],
    },
    {
        id: 2,
        title: 'FRIDAY AGENT',
        description:
            'Smart task management app powered by AI to prioritize tasks, suggest deadlines, and optimize productivity.',
        tech: ['Python', 'Next.js', 'Tailwind CSS'],
        github: 'https://github.com/tushar-1226/AGENT',
        demo: 'https://github.com/tushar-1226/AGENT',
        featured: false,
        category: ['AI/ML', 'Python',],
    },
    {
        id: 3,
        title: 'Cyson Chatbot',
        description:
            'A realtime integrated Chat-bot for the Cyson company on Wordpress website with custom plugin.',
        tech: ['Next.js', 'Python', 'MongoDB', 'Javascript'],
        github: 'https://www.cyson.in',
        demo: 'https://cysonproduction.alactic.io',
        featured: false,
        category: ['Web Development', 'AI/ML'],
    },
    {
        id: 4,
        title: 'True Asset Chatbot',
        description:
            'A realtime integrated Chat-bot for the True Asset company on Wordpress website with custom plugin.',
        tech: ['Next.js', 'Python', 'MongoDB', 'Javascript'],
        github: 'https://www.trueasset.com',
        demo: 'https://trueassetsproduction.alactic.io/',
        featured: false,
        category: ['Web Development', 'AI/ML'],
    },
    {
        id: 5,
        title: 'Selectify',
        description:
            'A platform for all your interview preparation and live resume building needs.',
        tech: ['Next.js', 'MongoDB', 'Javascript'],
        github:'https://github.com/tushar-1226/Selectify',
        demo: 'https://selectify-puce.vercel.app/',
        featured: true,
        category: ['Web Development', 'AI/ML'],
    },
    {
        id: 6,
        title: 'Alactic CRM',
        description:
            'A full-stack, multi-tenant CRM system enabling businesses to manage leads, emails, and sales pipelines from a single dashboard. Features Meta Lead Ads integration, OAuth, and AI-powered capabilities.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI', 'Docker'],
        github: '#',
        demo: 'https://crm.alactic.io/login',
        featured: true,
        category: ['Web Development', 'AI/ML'],
    },
    {
        id: 7,
        title: 'Hakeem Chatbot',
        description:
            'AI-powered chatbot for a chiropractic clinic using a custom fine-tuned GPT-4 model. Features offline fallback, conversation history, MongoDB persistence, and data processing pipelines for model training.',
        tech: ['FastAPI', 'OpenAI', 'MongoDB', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'Pandas'],
        github: '#',
        demo: 'https://hakeemproduction.alactic.io/',
        featured: false,
        category: ['Web Development', 'AI/ML', 'Python'],
    },
    {
        id: 8,
        title: 'NVG Bot — AI Real Estate Chatbot',
        description:
            'GPT-4o-mini powered chatbot with RAG for a real estate company. Features include property search, AI-driven Q&A, web scraping, PDF extraction, and cloud deployment.',
        tech: ['Flask', 'Python', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'OpenAI'],
        github: '#',
        demo: 'https://adityadweller.alactic.io/',
        featured: false,
        category: ['Web Development', 'AI/ML', 'Python'],
    }
];

export default function Projects() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const [activeFilter, setActiveFilter] = useState('All');

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
