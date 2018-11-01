import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

const Analytics: React.SFC<RouteComponentProps> = ({ history }) => {
    React.useEffect(
        () =>
            history.listen(location => {
                ga('send', 'pageview', location.pathname);
            }),
        []
    );
    return null;
};

export default withRouter(Analytics);
