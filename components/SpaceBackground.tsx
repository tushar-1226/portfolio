'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef, memo } from 'react';
import { useIntersectionObserver, useIsMobile, usePrefersReducedMotion } from '@/utils/performance';
import styles from './SpaceBackground.module.css';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    animationDelay: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    animationDelay: number;
}

interface ConstellationLine {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
}

interface SpaceBackgroundProps {
    layer: 'back' | 'mid';
    mousePosition: { x: number; y: number };
}

// Memoize the component to prevent unnecessary re-renders
const SpaceBackground = memo(function SpaceBackground({ layer, mousePosition }: SpaceBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { hasIntersected } = useIntersectionObserver(containerRef, {
        threshold: 0,
        rootMargin: '200px',
    });
    const isMobile = useIsMobile();
    const prefersReducedMotion = usePrefersReducedMotion();

    // Generate stars/particles only once per mount
    const [stars, setStars] = useState<Star[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [constellationLines, setConstellationLines] = useState<ConstellationLine[]>([]);

    useEffect(() => {
        // Generate stars for back layer - reduced from 200 to 60 (70% reduction)
        if (layer === 'back') {
            const count = isMobile ? 30 : 60; // Even fewer on mobile
            const newStars: Star[] = [];

            for (let i = 0; i < count; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                    animationDelay: Math.random() * 3,
                });
            }
            setStars(newStars);
        }

        // Generate particles for mid layer - reduced from 30 to 12 (60% reduction)
        if (layer === 'mid') {
            const count = isMobile ? 6 : 12; // Even fewer on mobile
            const newParticles: Particle[] = [];

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 2,
                    animationDelay: Math.random() * 5,
                });
            }
            setParticles(newParticles);

            // Generate constellation lines - reduced from 15 to 8 points
            const newLines: ConstellationLine[] = [];
            const points: { x: number; y: number }[] = [];
            const pointCount = isMobile ? 5 : 8; // Reduced points

            // Create random points
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                });
            }

            // Connect nearby points - with stricter distance threshold
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const distance = Math.sqrt(
                        Math.pow(points[i].x - points[j].x, 2) +
                        Math.pow(points[i].y - points[j].y, 2)
                    );

                    // Only connect points that are close enough (reduced from 20 to 15)
                    if (distance < 15 && Math.random() > 0.5) {
                        newLines.push({
                            id: newLines.length,
                            x1: points[i].x,
                            y1: points[i].y,
                            x2: points[j].x,
                            y2: points[j].y,
                            opacity: Math.random() * 0.15 + 0.05,
                        });
                    }
                }
            }
            setConstellationLines(newLines);
        }
    }, [layer, isMobile]); // Only regenerate when layer or mobile state changes

    // Don't render if not in viewport yet and hasn't been seen
    if (!hasIntersected) {
        return <div ref={containerRef} />;
    }

    // Calculate parallax offset based on layer - reduced effect on mobile
    const parallaxSpeed = layer === 'back' ? 0.5 : 1.5;
    const parallaxMultiplier = isMobile ? 0.3 : 1; // Reduce parallax on mobile
    const parallaxX = mousePosition.x * parallaxSpeed * parallaxMultiplier;
    const parallaxY = mousePosition.y * parallaxSpeed * parallaxMultiplier;

    // Disable animations if user prefers reduced motion
    const shouldAnimate = !prefersReducedMotion;

    return (
        <div
            ref={containerRef}
            className={`${styles.spaceLayer} ${styles[layer]}`}
            style={{
                transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
                willChange: 'transform',
            }}
        >
            {/* Render stars for back layer */}
            {layer === 'back' && stars.map((star) => (
                <div
                    key={star.id}
                    className={`${styles.star} ${!shouldAnimate ? styles.noAnimation : ''}`}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDelay: `${star.animationDelay}s`,
                    }}
                />
            ))}

            {/* Render particles for mid layer */}
            {layer === 'mid' && particles.map((particle) => (
                <div
                    key={particle.id}
                    className={`${styles.particle} ${!shouldAnimate ? styles.noAnimation : ''}`}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.animationDelay}s`,
                    }}
                />
            ))}

            {/* Render constellation lines for mid layer */}
            {layer === 'mid' && constellationLines.length > 0 && (
                <svg className={styles.constellationSvg}>
                    {constellationLines.map((line) => (
                        <line
                            key={line.id}
                            x1={`${line.x1}%`}
                            y1={`${line.y1}%`}
                            x2={`${line.x2}%`}
                            y2={`${line.y2}%`}
                            className={`${styles.constellationLine} ${!shouldAnimate ? styles.noAnimation : ''}`}
                            style={{ opacity: line.opacity }}
                        />
                    ))}
                </svg>
            )}

            {/* Radial gradient overlay */}
            <div className={styles.radialGradient} />
        </div>
    );
});

export default SpaceBackground;
