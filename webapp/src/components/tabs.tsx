import * as React from 'react';
import {
    TextTransformProperty,
    AppearanceProperty,
    PositionProperty,
} from 'csstype';

const styleTabs = {
    display: 'flex',
    background: 'red',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    zIndex: 1,
    position: 'fixed' as PositionProperty,
    width: '100%',
};

const styleTab = {
    appearance: 'none' as AppearanceProperty,
    background: 'transparent',
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
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid transparent',
};

const styleTabSelected = {
    ...styleTab,
    borderBottom: '2px solid white',
};

interface TabProps {
    selected?: boolean;
    value: string;
    onSelect?: (value: string) => void;
}

export class Tab extends React.Component<TabProps> {
    handleClick = () => {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.value);
        }
    };

    render() {
        const { selected, children } = this.props;
        return (
            <button
                type="button"
                style={selected ? styleTabSelected : styleTab}
                onClick={this.handleClick}
            >
                {children}
            </button>
        );
    }
}

interface TabsProps {
    value: string;
    onChange: (value: string) => void;
}

class Tabs extends React.Component<TabsProps> {
    handleChange = (value: string) => {
        if (this.props.value !== value) {
            this.props.onChange(value);
        }
    };

    render() {
        const { children, value } = this.props;
        return (
            <div style={styleTabs}>
                {React.Children.map(
                    children,
                    (child: React.ReactElement<TabProps>) => {
                        const tabValue = child.props.value;
                        const selected = tabValue === value;
                        return React.cloneElement(child as any, {
                            selected,
                            onSelect: () => this.handleChange(tabValue),
                        });
                    }
                )}
            </div>
        );
    }
}

export default Tabs;
