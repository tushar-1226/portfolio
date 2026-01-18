'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Contact.module.css';

type ContactMethod = 'email' | 'whatsapp';

export default function Contact() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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
            if (contactMethod === 'whatsapp') {
                // WhatsApp redirect with pre-filled message
                const phoneNumber = '917668839824'; // Replace with your WhatsApp number
                const text = `Hello! I'm ${formData.name}.\n\n${formData.message}\n\nYou can reach me at: ${formData.email || formData.phone}`;
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
                
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
                setIsSubmitting(false);
                return;
            }

            // Email submission - Try backend first, then fall back to Next.js API
            // Only try backend in development
            let response = null;
            
            if (process.env.NODE_ENV === 'development') {
                response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        method: contactMethod,
                    }),
                }).catch(() => null);
            }

            // If backend is not available or in production, use Next.js API
            if (!response) {
                response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        method: contactMethod,
                    }),
                });
            }

            if (response && response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                const errorData = response ? await response.json() : null;
                console.error('Form submission failed:', errorData);
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
                                <span>rockeytushar17@gmail.com</span>
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
                        {/* Contact Method Toggle */}
                        <div className={styles.toggleContainer}>
                            <button
                                type="button"
                                className={`${styles.toggleButton} ${contactMethod === 'email' ? styles.active : ''}`}
                                onClick={() => setContactMethod('email')}
                            >
                                <HiMail size={20} />
                                <span>Email</span>
                            </button>
                            <button
                                type="button"
                                className={`${styles.toggleButton} ${contactMethod === 'whatsapp' ? styles.active : ''}`}
                                onClick={() => setContactMethod('whatsapp')}
                            >
                                <FaWhatsapp size={20} />
                                <span>WhatsApp</span>
                            </button>
                        </div>

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

                        {contactMethod === 'email' ? (
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
                        ) : (
                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="+91 1234567890"
                                />
                            </div>
                        )}

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
                            {isSubmitting 
                                ? (contactMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Sending...') 
                                : (contactMethod === 'whatsapp' ? 'Continue to WhatsApp' : 'Send Message')
                            }
                        </motion.button>

                        {submitStatus === 'success' && (
                            <motion.p
                                className={styles.successMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                ✓ {contactMethod === 'whatsapp' 
                                    ? 'WhatsApp opened! Continue the conversation there.' 
                                    : "Message sent successfully! I'll get back to you soon."}
                            </motion.p>
                        )}
                        {submitStatus === 'error' && (
                            <motion.p
                                className={styles.errorMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                ✗ Failed to send. Please {contactMethod === 'whatsapp' 
                                    ? 'contact via WhatsApp at +91 7668839824' 
                                    : 'email rockeytushar17@gmail.com directly'}.
                            </motion.p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
