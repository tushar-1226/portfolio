'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ConfettiBackground.module.css';

interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    opacity: number;
    wobble: number;
    wobbleSpeed: number;
}

export default function ConfettiBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isVisibleRef = useRef(true);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,
        });
        if (!ctx) return;

        // Confetti colors - vibrant and celebratory
        const confettiColors = [
            '#FF6B35', // Orange
            '#FFA500', // Yellow-Orange
            '#FFD60A', // Yellow
            '#FF006E', // Pink
            '#E71D36', // Red
            '#8338EC', // Purple
            '#3A86FF', // Blue
            '#06FFA5', // Cyan
        ];

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Create particles
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 80 : 150;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 2,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 0.5 + 0.3,
                opacity: Math.random() * 0.6 + 0.4,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.03 + 0.01,
            });
        }
        particlesRef.current = particles;

        // Page visibility handler
        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;
        };

        // Handle window resize
        const handleResize = () => {
            setCanvasSize();
            // Redistribute particles on resize
            particles.forEach(particle => {
                if (particle.x > canvas.width) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = Math.random() * canvas.height;
            });
        };

        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime: number) => {
            if (!ctx || !canvas || !isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = currentTime - lastFrameTime;
            if (deltaTime < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = currentTime - (deltaTime % frameInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update wobble
                particle.wobble += particle.wobbleSpeed;
                
                // Update position with wobble effect
                particle.x += particle.vx + Math.sin(particle.wobble) * 0.5;
                particle.y += particle.vy;

                // Reset particle when it goes off screen
                if (particle.y > canvas.height + 10) {
                    particle.y = -10;
                    particle.x = Math.random() * canvas.width;
                }
                if (particle.x < -10) {
                    particle.x = canvas.width + 10;
                }
                if (particle.x > canvas.width + 10) {
                    particle.x = -10;
                }

                // Draw particle as a circle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [theme]);

    return <canvas ref={canvasRef} className={styles.confettiCanvas} />;
}
