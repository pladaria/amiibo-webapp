import * as React from 'react';
import { TextTransformProperty } from 'csstype';

const styleTabs = { display: 'flex', background: 'red' };
const styleTab = {
    flexGrow: 1,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    letterSpacing: 1,
    height: 48,
    textTransform: 'uppercase' as TextTransformProperty,
    color: 'white',
    borderBottom: '2px solid transparent',
};
const styleTabSelected = {
    ...styleTab,
    borderBottom: '2px solid white',
};

interface TabProps {
    selected?: boolean;
}

class Tab extends React.Component<TabProps> {
    render() {
        const { selected } = this.props;
        return <span style={selected ? styleTabSelected : styleTab}>{this.props.children}</span>;
    }
}

class Tabs extends React.Component {
    static Tab = Tab;

    render() {
        return <div style={styleTabs}>{this.props.children}</div>;
    }
}

export default Tabs;
