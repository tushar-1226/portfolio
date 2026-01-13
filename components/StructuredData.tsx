'use client';

export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Tushar Kumar',
        url: 'https://yourportfolio.com',
        image: 'https://yourportfolio.com/profile.jpg',
        sameAs: [
            'https://github.com/tusharrockey',
            'https://linkedin.com/in/tushar-kumar',
            'https://twitter.com/the_name_Tushar',
        ],
        jobTitle: 'Python Backend Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Alactic Inc.',
        },
        description:
            'Python Backend Engineer specializing in AI, Machine Learning, and Full-Stack Development',
        knowsAbout: [
            'Python',
            'AI/ML',
            'Azure',
            'OpenAI',
            'Django',
            'FastAPI',
            'Next.js',
            'Backend Development',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
