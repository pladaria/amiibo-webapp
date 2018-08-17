import * as React from 'react';

const styleContainer = {
    background: 'white',
    borderRadius: 4,
    paddingTop: 16,
    margin: 8,
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)',
    border: '1px solid #ddd',
    borderBottom: '1px solid #ccc',
};

const styleTitle = {
    fontWeight: 500,
    color: '#666',
    fontSize: 14,
    padding: 0,
    margin: '0 0 8px 16px',
};

const styleItems: React.CSSProperties = {
    display: 'flex',
    paddingBottom: 16,
    overflowX: 'auto',
    overflowY: 'hidden',
};

interface Props {
    title: string;
}

const Carousel: React.StatelessComponent<Props> = ({ title, children }) => (
    <div style={styleContainer}>
        <h2 style={styleTitle}>{title}</h2>
        <div style={styleItems}>{children}</div>
    </div>
);
export default Carousel;
