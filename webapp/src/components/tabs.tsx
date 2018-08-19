import * as React from 'react';
import { Route, NavLink, match } from 'react-router-dom';

const styleTabs: React.CSSProperties = {
    display: 'flex',
    background: 'red',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    position: 'sticky',
    top: 0,
    width: '100%',
};

const styleTab: React.CSSProperties = {
    textDecoration: 'none',
    background: 'transparent',
    flexGrow: 1,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    letterSpacing: 1,
    height: 48,
    textTransform: 'uppercase',
    color: 'white',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid transparent',
};

const styleTabSelected = {
    borderBottom: '2px solid white',
};

export const Tabs: React.StatelessComponent = ({ children }) => (
    <div style={styleTabs}>{children}</div>
);
interface TabProps {
    path: string;
    title: string;
}

export const Tab: React.StatelessComponent<TabProps> = ({ path, title }) => (
    <NavLink to={path} style={styleTab} activeStyle={styleTabSelected}>
        {title}
    </NavLink>
);

interface TabContentProps {
    path: string;
}

const getTabContentStyle = (match: match<{ id: string }>) =>
    ({
        display: match && !match.params.id ? '' : 'none',
    } as React.CSSProperties);

export const TabContent: React.StatelessComponent<TabContentProps> = ({
    path,
    children,
}) => (
    <Route
        path={path}
        children={({ match }) => (
            <div style={getTabContentStyle(match)}>{children}</div>
        )}
    />
);
