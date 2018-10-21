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

ReactDOM.render(
    <HashRouter>
        <>
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
