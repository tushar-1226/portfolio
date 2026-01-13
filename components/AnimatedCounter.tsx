'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

export default function AnimatedCounter({ end, duration = 2, suffix = '' }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const startTime = Date.now();
                    const startValue = 0;
                    const endValue = end;

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / (duration * 1000), 1);

                        // Easing function for smooth animation
                        const easeOutQuad = (t: number) => t * (2 - t);
                        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuad(progress));

                        setCount(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    animate();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end, duration, hasAnimated]);

    return (
        <motion.span ref={ref}>
            {count}{suffix}
        </motion.span>
    );
}
