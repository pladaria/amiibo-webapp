import * as React from 'react';
import {
    getAmiibo,
    getGame,
    getAmiiboImage,
    getGameImage,
} from '../data/amiibos';
import { Redirect } from 'react-router';
import Card from './card';
import { Link } from 'react-router-dom';
import BackButton from './back-button';
import Img from 'react-lazy-img';
import styled from 'styled-components/macro';

const AmiiboContainer = styled.div`
    background: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GameLink = styled(Link)`
    padding: 16px;
    display: flex;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
`;

const GameTitle = styled.h2`
    font-size: 16px;
    margin-bottom: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const GameCover = styled.div`
    flex-shrink: 0;
    width: 75px;
    height: 75px;
    margin-right: 16px;
    display: inline-block;
`;

const GameCoverImg = styled(Img)`
    width: 75px;
    height: 75px;
    display: inline-block;
`;

const GameDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 1;
    flex-grow: 1;
    overflow: hidden;
    font-size: 13px;
`;

const FigureContainer = styled.div`
    height: 400px;
`;

const FigureImg = styled.img`
    width: 360px;
    margin-top: -8px;
    display: block;
`;

const FigureName = styled.h1`
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
`;

const CompatibleGamesHeader = styled.div`
    margin: 16px;
    color: #444;
`;

interface GameProps {
    id: string;
    description: string;
}

const Game: React.SFC<GameProps> = ({ id, description }) => {
    const game = getGame(id);
    if (!game) {
        return null;
    }
    const { name, system } = game;
    return (
        <GameLink to={`/games/${id}`} key={id}>
            <GameCover>
                <GameCoverImg src={getGameImage(id)} alt={name} />
            </GameCover>
            <GameDescription>
                <div>
                    {system}
                    <GameTitle>{name}</GameTitle>
                </div>
                {description}
            </GameDescription>
        </GameLink>
    );
};

interface Props {
    id: string;
    onGoBack: () => void;
}

const AmiiboDetail: React.SFC<Props> = ({ id, onGoBack }) => {
    const amiibo = getAmiibo(id);

    if (!amiibo) {
        return <Redirect to="/amiibos" />;
    }

    return (
        <>
            <BackButton onGoBack={onGoBack} />
            <AmiiboContainer>
                <FigureContainer>
                    <FigureImg
                        src={getAmiiboImage(amiibo.id)}
                        alt={amiibo.name}
                    />
                </FigureContainer>
                <FigureName>{amiibo.name}</FigureName>
            </AmiiboContainer>
            <Card>
                <CompatibleGamesHeader>Compatible games</CompatibleGamesHeader>
                {amiibo.compatibleGames.map(Game)}
            </Card>
        </>
    );
};

export default AmiiboDetail;
