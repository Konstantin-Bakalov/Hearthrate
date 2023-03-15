import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';
import axios from 'axios';
import { config } from './config';

export default axios.create({
    baseURL: config.serverUrl,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
