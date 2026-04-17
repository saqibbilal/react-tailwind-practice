import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Switch the project here
// import App from './projects/01-qr-card/App';
// import App from './projects/02-blog-preview-card/App';
// import App from './projects/03-bento-grid/App';
import App from './projects/react/00-react-counter/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);