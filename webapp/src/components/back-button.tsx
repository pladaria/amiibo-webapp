import * as React from 'react';
import IconArrowBack from '../assets/icons/arrow_back-24px.svg';
import styled from 'styled-components/macro';

const BackButton = styled.div`
    position: fixed;
    top: 0;
    padding: 8px;
    text-align: left;
    width: 100%;
`;

const Button = styled.button`
    border: none;
    appearance: none;
    width: 32px;
    height: 32px;
    outline: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7) 50% 50% no-repeat url(${IconArrowBack});
`;

interface Props {
    onGoBack: () => void;
}

export default ({ onGoBack }: Props) => (
    <BackButton>
        <Button onClick={onGoBack} />
    </BackButton>
);
