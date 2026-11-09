// jest-dom adds custom matchers such as toBeInTheDocument().
import '@testing-library/jest-dom';

// antd's responsive helpers need matchMedia, which jsdom lacks.
if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}
