export const colors = {
    primary: '#2f6fed',
    primaryDark: '#1f56c7',
    primarySoft: '#eaf1ff',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#e5e7eb',
    page: '#f4f6fb',
    surface: '#ffffff',
    online: '#22c55e',
    danger: '#dc2626',
};

const palette = ['#2f6fed', '#7c3aed', '#db2777', '#ea580c', '#0d9488', '#4f46e5', '#0891b2', '#65a30d'];

/** Stable colour per username for avatars. */
export function colorFor(name = '') {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) | 0;
    return palette[Math.abs(hash) % palette.length];
}
