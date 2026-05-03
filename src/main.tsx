import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Project Imports
import FirstRender from './projects/react/02-useFirstRender/App';
import Timeout from './projects/react/01-useTimeout-hook/App';
import Counter from './projects/react/00-react-counter/App';
import UseHover from './projects/react/06-useHover-hook/App';
import FeatureCard from './projects/react/FeatureCard/App';
import Playground from './projects/react/playground/App';
import QRCard from './projects/tailwind/01-qr-card/App';
import BlogPreview from './projects/tailwind/02-blog-preview-card/App';
import BentoGrid from './projects/tailwind/03-bento-grid/App';

// Change the key below to toggle projects.
const ACTIVE_PROJECT_KEY = 'playground';

// ACTIVE_PROJECT_KEY Options: 'counter', 'qr', 'blog', 'bento'
const projectMap: Record<string, React.FC> = {
    'firstRender': FirstRender,
    'timeout': Timeout,
    'counter': Counter,
    'useHover': UseHover,
    'featureCard': FeatureCard,
    'playground': Playground,
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