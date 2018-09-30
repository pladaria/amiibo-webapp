import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// @ts-ignore
import { ScrollContext } from 'react-router-scroll-4';
// @ts-ignore
import 'pwacompat/pwacompat.min.js';

ReactDOM.render(
    <HashRouter>
        <ScrollContext>
            <Switch>
                <Route path="/(amiibos|games)/:id?" component={App} />
                <Route render={() => <Redirect to="/amiibos" />} />
            </Switch>
        </ScrollContext>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
