import * as React from 'react';

const style: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    background: '#eeeeee',
};

const Modal: React.StatelessComponent = ({ children }) => (
    <div style={style}>{children}</div>
);

export default Modal;
