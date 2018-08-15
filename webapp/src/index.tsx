import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
