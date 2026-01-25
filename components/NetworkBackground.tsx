'use client';

import { useEffect, useRef } from 'react';
import { throttle } from '@/utils/performance';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

import { useTheme } from '@/contexts/ThemeContext';

export default function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isVisibleRef = useRef(true);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true, // Better performance
        });
        if (!ctx) return;

        // Theme colors
        const isLight = theme === 'light';
        const particleColor = isLight ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255, 255, 255, 0.15)';
        const connectionColorBase = isLight ? '220, 38, 38' : '255, 255, 255';

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Create particles - reduced count by 50% for better performance
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile
            ? Math.floor((window.innerWidth * window.innerHeight) / 40000)
            : Math.floor((window.innerWidth * window.innerHeight) / 30000);
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
            });
        }
        particlesRef.current = particles;

        // Throttled mouse move handler - reduced frequency
        const handleMouseMove = throttle((e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }, 50);

        // Page visibility handler
        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;
        };

        // Spatial grid for optimized neighbor detection
        const GRID_SIZE = 150;
        const getGridKey = (x: number, y: number) => {
            const gridX = Math.floor(x / GRID_SIZE);
            const gridY = Math.floor(y / GRID_SIZE);
            return `${gridX},${gridY}`;
        };

        const buildSpatialGrid = (particles: Particle[]) => {
            const grid = new Map<string, Particle[]>();
            particles.forEach(particle => {
                const key = getGridKey(particle.x, particle.y);
                if (!grid.has(key)) {
                    grid.set(key, []);
                }
                grid.get(key)!.push(particle);
            });
            return grid;
        };

        const getNeighborCells = (x: number, y: number) => {
            const gridX = Math.floor(x / GRID_SIZE);
            const gridY = Math.floor(y / GRID_SIZE);
            const cells: string[] = [];
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    cells.push(`${gridX + dx},${gridY + dy}`);
                }
            }
            return cells;
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

            const grid = buildSpatialGrid(particles);

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distanceSquared = dx * dx + dy * dy;

                if (distanceSquared < 22500) {
                    const distance = Math.sqrt(distanceSquared);
                    const force = (150 - distance) / 150;
                    particle.vx += (dx / distance) * force * 0.008;
                    particle.vy += (dy / distance) * force * 0.008;
                }

                const speedSquared = particle.vx * particle.vx + particle.vy * particle.vy;
                if (speedSquared > 4) {
                    const speed = Math.sqrt(speedSquared);
                    particle.vx = (particle.vx / speed) * 2;
                    particle.vy = (particle.vy / speed) * 2;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                const neighborCells = getNeighborCells(particle.x, particle.y);
                const nearbyParticles = new Set<Particle>();

                neighborCells.forEach(cellKey => {
                    const cellParticles = grid.get(cellKey) || [];
                    cellParticles.forEach(p => {
                        if (p !== particle) nearbyParticles.add(p);
                    });
                });

                nearbyParticles.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distanceSquared = dx * dx + dy * dy;

                    if (distanceSquared < 22500) {
                        const distance = Math.sqrt(distanceSquared);
                        const opacity = (1 - distance / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(${connectionColorBase}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', setCanvasSize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', setCanvasSize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
