import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Project Imports
import FirstRender from './projects/react/02-useFirstRender/App';
import Timeout from './projects/react/01-useTimeout-hook/App';
import Counter from './projects/react/00-react-counter/App';
import UseHover from './projects/react/06-useHover-hook/App';
import FeatureCard from './projects/react/FeatureCard/App';
import WordleGame from './projects/react/wordle/App';
import TicTacToe from './projects/react/tic-tac-toe/App';
import MemoryMatch from './projects/react/memory-match/App';
import Notes from './projects/react/notes/App';
import Wordle4Game from './projects/react/wordle4/App';
import Wordle6Game from './projects/react/wordle6/App';
import DashWidget from './projects/react/dashboard/App';
import Playground from './projects/react/playground/App';
import QRCard from './projects/tailwind/01-qr-card/App';
import BlogPreview from './projects/tailwind/02-blog-preview-card/App';
import BentoGrid from './projects/tailwind/03-bento-grid/App';

// Change the key below to toggle projects.
const ACTIVE_PROJECT_KEY = 'notes';

// ACTIVE_PROJECT_KEY Options: 'counter', 'qr', 'blog', 'bento'
const projectMap: Record<string, React.FC> = {
    'playground': Playground,
    'firstRender': FirstRender,
    'timeout': Timeout,
    'counter': Counter,
    'useHover': UseHover,
    'ticTacToe': TicTacToe,
    'memoryMatch': MemoryMatch,
    'notes': Notes,
    'wordle': WordleGame,
    'wordle4': Wordle4Game,
    'wordle6': Wordle6Game,
    'dashWidget': DashWidget,
    'featureCard': FeatureCard,
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