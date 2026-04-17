import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Project Imports
import Counter from './projects/react/00-react-counter/App';
import QRCard from './projects/tailwind/01-qr-card/App';
import BlogPreview from './projects/tailwind/02-blog-preview-card/App';
import BentoGrid from './projects/tailwind/03-bento-grid/App';

// Change the key below to toggle projects.
const ACTIVE_PROJECT_KEY = 'counter';

// ACTIVE_PROJECT_KEY Options: 'counter', 'qr', 'blog', 'bento'
const projectMap: Record<string, React.FC> = {
    'counter': Counter,
    'qr':      QRCard,
    'blog':    BlogPreview,
    'bento':   BentoGrid,
};

// Fallback to Counter if key is mismatched
const SelectedProject = projectMap[ACTIVE_PROJECT_KEY] || Counter;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SelectedProject />
    </React.StrictMode>,
);