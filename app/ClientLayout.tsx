'use client';

import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

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
            {children}
            <ToasterWrapper />
        </ThemeProvider>
    );
}
