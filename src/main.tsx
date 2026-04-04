import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Switch the project here
// import App from './projects/01-qr-card/App';
import App from './projects/02-blog-preview-card/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);