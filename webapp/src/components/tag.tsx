import * as React from 'react';

const style: React.CSSProperties = {
    background: '#eee',
    padding: '2px 8px',
    marginRight: 8,
    borderRadius: 16,
    fontSize: 11,
};

const Tag: React.StatelessComponent = ({ children }) => (
    <span style={style}>{children}</span>
);

export default Tag;
