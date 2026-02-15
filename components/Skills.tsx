'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { HiCode, HiCloud, HiSparkles } from 'react-icons/hi';
import { FaRobot, FaLaptopCode } from 'react-icons/fa';
import {
    SiPython,
    SiOpenai,
    SiNextdotjs,
    SiReact,
    SiPostgresql,
    SiDjango,
    SiNodedotjs,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiHtml5,
    SiGraphql,
    SiDocker,
    SiGit,
    SiGithub,
    SiLinux,
    SiHuggingface,
    SiMongodb,
} from 'react-icons/si';
import type { ComponentType } from 'react';
import styles from './Skills.module.css';

// Tech icon mapping
const techIcons: Record<string, ComponentType<{ size: number }>> = {
    'Python': SiPython,
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML': SiHtml5,
    'Tailwind CSS': SiTailwindcss,
    'Node.js': SiNodedotjs,
    'Django': SiDjango,
    'PostgreSQL': SiPostgresql,
    'GraphQL': SiGraphql,
    'REST APIs': HiCode,
    'Docker': SiDocker,
    'Azure': HiCloud,
    'Git': SiGit,
    'GitHub': SiGithub,
    'CI/CD': HiCode,
    'Linux': SiLinux,
    'OpenAI': SiOpenai,
    'LLM': HiSparkles,
    'Agentic AI': FaRobot,
    'HuggingFace': SiHuggingface,
    'Machine Learning': FaLaptopCode,
    'MongoDB': SiMongodb,
};

const skillCategories = [
    {
        category: 'Frontend',
        skills: [
            'React',
            'Next.js',
            'JavaScript',
            'TypeScript',
            'HTML',
            'Tailwind CSS',
        ],
    },
    {
        category: 'Backend & Databases',
        skills: [
            'Python',
            'Node.js',
            'Django',
            'PostgreSQL',
            'GraphQL',
            'REST APIs',
            'MongoDB',
        ],
    },
    {
        category: 'DevOps & Cloud',
        skills: ['Docker', 'Azure', 'Git', 'CI/CD', 'Linux', 'GitHub'],
    },
    {
        category: 'AI & Machine Learning',
        skills: ['OpenAI', 'LLM', 'Agentic AI', 'HuggingFace', 'Machine Learning'],
    },
];

export default function Skills() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    // Memoize getTechIcon to prevent recreation on each render
    const getTechIcon = useMemo(() => (techName: string) => {
        const Icon = techIcons[techName];
        return Icon ? Icon : HiCode; // Fallback to code icon
    }, []);

    return (
        <section id="skills" className={styles.skills} ref={ref}>
            {/* Removed duplicate SpaceBackground - rendered globally */}
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Skills & Technologies
                </motion.h2>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className={styles.categoryCard}
                            variants={staggerItem}
                        >
                            <h3 className={styles.categoryTitle}>{category.category}</h3>
                            <div className={styles.skillsList}>
                                {category.skills.map((skill, skillIndex) => {
                                    const Icon = getTechIcon(skill);
                                    return (
                                        <motion.div
                                            key={skillIndex}
                                            className={styles.skillIcon}
                                            whileHover={{ scale: 1.15, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            title={skill}
                                        >
                                            <Icon size={28} />
                                            <span className={styles.skillTooltip}>{skill}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
