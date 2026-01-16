'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiHome, HiArrowLeft } from 'react-icons/hi';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Arey Shitt!
                </motion.h1>

                <motion.h2
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Abhi bnaya nhi h maine sorry!
                </motion.h2>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Bhai kaam boht hai im sorry, lekin jaldi se bnaaungaa
                </motion.p>

                <motion.div
                    className={styles.buttons}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/" className={styles.homeButton}>
                        <HiHome size={20} />
                        <span>Go Home</span>
                    </Link>

                    <button onClick={() => window.history.back()} className={styles.backButton}>
                        <HiArrowLeft size={20} />
                        <span>Go Back</span>
                    </button>
                </motion.div>

                <motion.div
                    className={styles.glitch}
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                >
                    404
                </motion.div>
            </motion.div>
        </div>
    );
}
