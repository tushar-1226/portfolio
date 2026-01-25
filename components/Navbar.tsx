'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { HiMenu, HiX, HiSparkles } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
];

const scrolledNavItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Update active section based on scroll position
            const sections = navItems.map((item) => item.id);
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id: string) => {
        smoothScrollTo(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <AnimatePresence mode="wait">
                {!isScrolled ? (
                    // Initial State - Full Navbar
                    <motion.div
                        key="full-navbar"
                        className={styles.fullNavbar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.container}>
                            {/* Left Section - Logo & Navigation */}
                            <div className={styles.leftSection}>
                                <motion.div
                                    className={styles.logo}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavClick('hero')}
                                >
                                    <span className={styles.logoText}>Portfolio</span>
                                    <HiSparkles className={styles.logoIcon} />
                                </motion.div>

                                {/* Desktop Navigation Links */}
                                <ul className={styles.navList}>
                                    {navItems.slice(1, 6).map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => handleNavClick(item.id)}
                                                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''
                                                    }`}
                                            >
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Section - CTAs */}
                            <div className={styles.rightSection}>
                                <button
                                    onClick={() => handleNavClick('contact')}
                                    className={styles.ctaPrimary}
                                >
                                    <HiSparkles size={16} />
                                    Get in Touch
                                </button>
                                <ThemeToggle />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className={styles.mobileMenuButton}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    // Scrolled State - Centered Pill Navigation
                    <motion.div
                        key="scrolled-navbar"
                        className={styles.scrolledNavbar}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.pillContainer}>
                            {scrolledNavItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`${styles.pillButton} ${activeSection === item.id ? styles.pillActive : ''
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Theme Toggle on Right */}
                        <div className={styles.scrolledThemeToggle}>
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && !isScrolled && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className={styles.mobileNavList}>
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
