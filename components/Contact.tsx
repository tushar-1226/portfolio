'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Contact.module.css';

export default function Contact() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Try backend first, then fall back to Next.js API
            let response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).catch(() => null);

            // If backend is not available, try Next.js API
            if (!response) {
                response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response && response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={styles.contact} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    Get In Touch
                </motion.h2>

                <div className={styles.content}>
                    <motion.div
                        className={styles.info}
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        <h3 className={styles.infoTitle}>Let's Connect</h3>
                        <p className={styles.infoText}>
                            I'm always open to new opportunities, collaborations, and
                            interesting projects. Feel free to reach out!
                        </p>

                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <HiMail size={24} />
                                <span>tusharrockey1@gmail.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <HiLocationMarker size={24} />
                                <span>Gurgaon, Haryana</span>
                            </div>
                        </div>

                        <div className={styles.socials}>
                            <a
                                href="https://github.com/tushar-1226"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/tushar-kumar-79632b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://x.com/the_name_Tushar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaXTwitter size={24} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        className={styles.form}
                        variants={fadeInRight}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                                placeholder="Your name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className={styles.textarea}
                                placeholder="Your message..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>

                        {submitStatus === 'success' && (
                            <motion.p
                                className={styles.successMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                ✓ Message sent successfully! I'll get back to you soon.
                            </motion.p>
                        )}
                        {submitStatus === 'error' && (
                            <motion.p
                                className={styles.errorMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                ✗ Failed to send. Please email tusharrockey1@gmail.com directly.
                            </motion.p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
