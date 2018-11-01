import * as React from 'react';

const style = {
    background: 'white',
    borderRadius: 4,
    margin: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
};

const Card: React.SFC = ({ children }) => <div style={style}>{children}</div>;

export default Card;
