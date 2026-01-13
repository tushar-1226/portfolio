export const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop;
        window.scrollTo({
            top: offsetTop - 80, // Account for fixed navbar
            behavior: 'smooth',
        });
    }
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
