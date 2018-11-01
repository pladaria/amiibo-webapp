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

const styleGame: React.CSSProperties = {
    padding: 16,
    display: 'flex',
    borderBottom: '1px solid #ddd',
    overflow: 'hidden',
};

const styleGameTitle: React.CSSProperties = {
    fontSize: 16,
    marginBottom: 4,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const styleGameCover: React.CSSProperties = {
    width: 75,
    height: 75,
    display: 'inline-block',
};

const styleGameCoverContainer: React.CSSProperties = {
    flexShrink: 0,
    width: 75,
    height: 75,
    marginRight: 16,
    display: 'inline-block',
};

const styleGameDescription: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
    fontSize: 13,
};

const styleFigureContainer: React.CSSProperties = {
    height: 400,
};

const styleAmiiboContainer: React.CSSProperties = {
    background: 'white',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const styleCompatibleGamesHeader: React.CSSProperties = {
    margin: 16,
    color: '#444',
};

const styleFigureImage: React.CSSProperties = {
    width: 360,
    marginTop: -8,
    display: 'block',
};

const styleAmiiboName: React.CSSProperties = {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
};

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
        <Link to={`/games/${id}`} style={styleGame} key={id}>
            <div style={styleGameCoverContainer}>
                <Img style={styleGameCover} src={getGameImage(id)} alt={name} />
            </div>
            <div style={styleGameDescription}>
                <div>
                    <div>{system}</div>
                    <h2 style={styleGameTitle}>{name}</h2>
                </div>
                <div>{description}</div>
            </div>
        </Link>
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
            <div style={styleAmiiboContainer}>
                <div style={styleFigureContainer}>
                    <img
                        style={styleFigureImage}
                        src={getAmiiboImage(amiibo.id)}
                        alt={amiibo.name}
                    />
                </div>
                <h1 style={styleAmiiboName}>{amiibo.name}</h1>
            </div>
            <Card>
                <div style={styleCompatibleGamesHeader}>Compatible games</div>
                {amiibo.compatibleGames.map(Game)}
            </Card>
        </>
    );
};

export default AmiiboDetail;
