import 'intersection-observer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// @ts-ignore
import 'pwacompat/pwacompat.min.js';
import ScrollMemory from './components/scroll-memory';
import Analytics from './components/analytics';

ReactDOM.render(
    <HashRouter>
        <>
            <Analytics />
            <ScrollMemory />
            <Switch>
                <Route path="/(amiibos|games)/:id?" component={App} />
                <Route render={() => <Redirect to="/amiibos" />} />
            </Switch>
        </>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
