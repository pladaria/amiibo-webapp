import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/(amiibos|games)/:id?" component={App} />
            <Route render={() => <Redirect to="/amiibos" />} />
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
