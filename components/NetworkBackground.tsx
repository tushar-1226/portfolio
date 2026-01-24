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

export default function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true, // Better performance
        });
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Create particles - reduced count by 50% for better performance
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile
            ? Math.floor((window.innerWidth * window.innerHeight) / 40000) // Reduced from 25000
            : Math.floor((window.innerWidth * window.innerHeight) / 30000); // Reduced from 15000
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Reduced velocity
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
            });
        }
        particlesRef.current = particles;

        // Throttled mouse move handler - reduced frequency
        const handleMouseMove = throttle((e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }, 50); // Throttle to 20fps for mouse tracking

        // Page visibility handler - pause when tab is hidden
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

        // Build spatial grid
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

        // Get neighboring cells
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

        // Animation loop with frame skipping
        const animate = (currentTime: number) => {
            if (!ctx || !canvas || !isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            // Frame rate limiting
            const deltaTime = currentTime - lastFrameTime;
            if (deltaTime < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = currentTime - (deltaTime % frameInterval);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Build spatial grid for this frame
            const grid = buildSpatialGrid(particles);

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction - reduced range for better performance
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distanceSquared = dx * dx + dy * dy;

                if (distanceSquared < 22500) { // 150px radius (reduced from 150)
                    const distance = Math.sqrt(distanceSquared);
                    const force = (150 - distance) / 150;
                    particle.vx += (dx / distance) * force * 0.008; // Reduced force
                    particle.vy += (dy / distance) * force * 0.008;
                }

                // Limit velocity
                const speedSquared = particle.vx * particle.vx + particle.vy * particle.vy;
                if (speedSquared > 4) { // max speed = 2
                    const speed = Math.sqrt(speedSquared);
                    particle.vx = (particle.vx / speed) * 2;
                    particle.vy = (particle.vy / speed) * 2;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.fill();

                // Draw connections using spatial grid (much more efficient)
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

                    // Connect particles within 150px (using squared distance for performance)
                    if (distanceSquared < 22500) { // 150 * 150
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);

                        // Opacity based on distance
                        const distance = Math.sqrt(distanceSquared);
                        const opacity = (1 - distance / 150) * 0.1;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', setCanvasSize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start animation
        animationFrameRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', setCanvasSize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

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
