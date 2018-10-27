import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { UnregisterCallback } from 'history';

class Analytics extends React.Component<RouteComponentProps> {
    unregister: UnregisterCallback;

    componentDidMount() {
        this.unregister = this.props.history.listen(location => {
            ga('send', 'pageview', location.pathname);
        });
    }

    componentWillUnmount() {
        this.unregister();
    }

    render() {
        return null;
    }
}

export default withRouter(Analytics);
