import 'intersection-observer';
import 'pwacompat/pwacompat.min.js';
import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
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
