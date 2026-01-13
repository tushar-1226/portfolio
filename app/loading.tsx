'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            zIndex: 9999,
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                {/* Custom T Logo Animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        fontSize: '4rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    T
                </motion.div>

                {/* Loading Bar */}
                <motion.div
                    style={{
                        width: '200px',
                        height: '3px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
