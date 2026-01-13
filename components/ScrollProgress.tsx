'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Add smooth spring animation for better visual feedback
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Initial check
        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calculate top position based on screen size and scroll state
    const getTopPosition = () => {
        if (isMobile) {
            return isScrolled ? '50px' : '65px';
        }
        return isScrolled ? '56px' : '72px';
    };

    return (
        <motion.div
            style={{
                scaleX,
                position: 'fixed',
                top: getTopPosition(),
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                transformOrigin: '0%',
                zIndex: 1001, // Above navbar (which is 1000)
            }}
        />
    );
}
