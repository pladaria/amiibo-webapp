import * as React from 'react';
import IconArrowBack from '../assets/icons/arrow_back-24px.svg';

const styleContainer: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    padding: 8,
    textAlign: 'left',
    width: '100%',
};

const styleButton: React.CSSProperties = {
    border: 'none',
    appearance: 'none',
    width: 32,
    height: 32,
    outline: 'none',
    borderRadius: '50%',
    background: `rgba(255, 255, 255, 0.7) 50% 50% no-repeat url(${IconArrowBack} `,
};

interface Props {
    onGoBack: () => void;
}

const BackButton: React.SFC<Props> = ({ onGoBack }) => (
    <div style={styleContainer}>
        <button style={styleButton} onClick={onGoBack} />
    </div>
);

export default BackButton;
