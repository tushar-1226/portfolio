'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { HiAcademicCap, HiTrophy, HiStar, HiBriefcase } from 'react-icons/hi2';
import styles from './Achievements.module.css';

const achievements = [
    {
        id: 1,
        year: '2025 (November - May)',
        icon: HiTrophy,
        title: 'Internship',
        organization: 'Alactic Inc.',
        description:
            'Developed Alactic AGI, an enterprise AI dataset creation platform that processes multi-source web content and documents with AI-powered quality analysis, enabling organizations to structure large-scale content with 95%+ accuracy rates.',
    },
    {
        id: 2,
        year: '2026 Expected Graduation Year',
        icon: HiBriefcase,
        title: 'Expected Graduation Year',
        organization: 'B.Tech in Computer Science and Engineering.',
        description:
            'Completed the B.Tech in Computer Science and Engineering.',
    },
    {
        id: 3,
        year: '2022 College Started',
        icon: HiStar,
        title: 'College',
        organization: 'Global Institute of Technology & Management',
        description:
            'Started my college journey at GITM.',
    },
    {
        id: 4,
        year: '2021',
        icon: HiAcademicCap,
        title: 'Completed Schooling',
        organization: 'S.R.V Public School',
        description:
            'Completed schooling with a percentage of 93% in Non-Medical Stream.',
    },
];

export default function Achievements() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section id="achievements" className={styles.achievements} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Achievements & Milestones
                </motion.h2>

                <motion.div
                    className={styles.timeline}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={achievement.id}
                                className={styles.timelineItem}
                                variants={staggerItem}
                            >
                                <div className={styles.year}>{achievement.year}</div>
                                <div className={styles.iconContainer}>
                                    <Icon size={24} />
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.achievementTitle}>
                                        {achievement.title}
                                    </h3>
                                    <p className={styles.organization}>
                                        {achievement.organization}
                                    </p>
                                    <p className={styles.description}>
                                        {achievement.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
