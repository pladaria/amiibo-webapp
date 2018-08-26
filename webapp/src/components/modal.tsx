import * as React from 'react';
import IconArrowBack from '../assets/icons/arrow_back-24px.svg';

const style: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: '#eeeeee',
    WebkitOverflowScrolling: 'touch',
};

const styleBackButton: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    left: 8,
    border: 'none',
    appearance: 'none',
    width: 32,
    height: 32,
    outline: 'none',
    borderRadius: '50%',
    background: `rgba(255, 255, 255, 0.5) 50% 50% no-repeat url(${IconArrowBack} `,
};

interface Props {
    onGoBack?: () => void;
}

const Modal: React.StatelessComponent<Props> = ({ children, onGoBack }) => (
    <div style={style}>
        {children}
        {onGoBack && <button style={styleBackButton} onClick={onGoBack} />}
    </div>
);

export default Modal;
