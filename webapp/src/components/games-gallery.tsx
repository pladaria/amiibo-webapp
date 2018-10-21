import * as React from 'react';
import Card from './card';
import { getGames } from '../data/amiibos';
import { Link } from 'react-router-dom';
import Tag from './tag';
import Img from 'react-lazy-img';

const styleGame: React.CSSProperties = {
    padding: 16,
    display: 'flex',
    borderBottom: '1px solid #ddd',
    overflow: 'hidden',
};

const styleTitle: React.CSSProperties = {
    fontSize: 16,
    marginBottom: 4,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const styleGameCovercontainer: React.CSSProperties = {
    flexShrink: 0,
    width: 75,
    height: 75,
    marginRight: 16,
};

const styleGameCover: React.CSSProperties = {
    width: 75,
    height: 75,
};

const styleDescription: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
    fontSize: 13,
};

const styleCategories: React.CSSProperties = {
    marginBottom: 2,
};

interface GameProps {
    id: string;
    name: string;
    cover: string;
    date: string;
    system: string;
    categories: string[];
}

const Game: React.StatelessComponent<GameProps> = ({
    id,
    name,
    cover,
    categories,
    system,
}) => (
    <Link to={`/games/${id}`} style={styleGame}>
        <div style={styleGameCovercontainer}>
            <Img style={styleGameCover} src={cover} offset={200} />
        </div>
        <div style={styleDescription}>
            <div>
                <div>{system}</div>
                <h2 style={styleTitle}>{name}</h2>
            </div>
            <div style={styleCategories}>
                {categories.map(c => (
                    <Tag key={c}>{c}</Tag>
                ))}
            </div>
        </div>
    </Link>
);

const GamesGallery: React.StatelessComponent = () => (
    <Card>
        {getGames().map(
            ({
                id,
                name,
                squareImageUrl,
                imageUrl,
                dateRelease,
                categories,
                system,
            }) => (
                <Game
                    id={id}
                    key={id}
                    name={name}
                    cover={squareImageUrl || imageUrl}
                    date={dateRelease}
                    categories={categories}
                    system={system}
                />
            )
        )}
    </Card>
);

export default GamesGallery;
