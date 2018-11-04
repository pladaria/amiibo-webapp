import 'intersection-observer';
import 'pwacompat/pwacompat.min.js';
import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import ScrollMemory from './components/scroll-memory';
import Analytics from './components/analytics';

ReactDOM.render(
    <BrowserRouter>
        <>
            <Analytics />
            <ScrollMemory />
            <Switch>
                <Route path="/(amiibos|games)/:id?" component={App} />
                <Route render={() => <Redirect to="/amiibos" />} />
            </Switch>
        </>
    </BrowserRouter>,
    document.getElementById('root')
);

console.log('sw reg');
serviceWorker.register();
