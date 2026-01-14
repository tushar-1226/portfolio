'use client';

import { Toaster } from 'sonner';
import StructuredData from '@/components/StructuredData';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import './globals.css';

// Wrapper component to access theme
function ToasterWrapper() {
    const { theme } = useTheme();
    return (
        <Toaster
            theme={theme}
            position="top-right"
            richColors
            closeButton
        />
    );
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <StructuredData />
            {children}
            <ToasterWrapper />
        </ThemeProvider>
    );
}
