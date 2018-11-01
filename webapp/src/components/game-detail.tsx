import * as React from 'react';
import {
    getAmiibosByGame,
    getGame,
    getGameImage,
    getAmiiboImage,
} from '../data/amiibos';
import { Redirect } from 'react-router';
import Card from './card';
import { Link } from 'react-router-dom';
import Tag from './tag';
import BackButton from './back-button';
import Img from 'react-lazy-img';

const styleAmiiboItem: React.CSSProperties = {
    padding: '16px 16px 16px 8px',
    display: 'flex',
    borderBottom: '1px solid #ddd',
    overflow: 'hidden',
};

const styleAmiiboName: React.CSSProperties = {
    fontSize: 16,
    marginBottom: 4,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const styleAmiiboImageContainer: React.CSSProperties = {
    flexShrink: 0,
    width: 75,
    height: 75,
    marginRight: 8,
};

const styleAmiiboDescription: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
    fontSize: 13,
};

const styleGameContainer: React.CSSProperties = {
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const styleCompatibleAmiibosHeader: React.CSSProperties = {
    margin: 16,
    color: '#444',
};

const styleGameImage: React.CSSProperties = {
    width: '100vw',
    height: '100vw',
    maxHeight: 500,
    maxWidth: 500,
    display: 'block',
};

interface AmiiboProps {
    id: string;
    name: string;
    collection: string;
    imageUrl: string;
    description: string;
}

const AmiiboItem: React.SFC<AmiiboProps> = ({
    id,
    name,
    imageUrl,
    collection,
    description,
}) => {
    return (
        <Link to={`/amiibos/${id}`} style={styleAmiiboItem} key={id}>
            <div style={styleAmiiboImageContainer}>
                <Img
                    style={{ width: 75, height: 84, marginTop: -8 }}
                    src={imageUrl}
                    alt={name}
                />
            </div>
            <div style={styleAmiiboDescription}>
                <div>
                    <div>{collection}</div>
                    <h2 style={styleAmiiboName}>{name}</h2>
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

const GameDetail: React.SFC<Props> = ({ id, onGoBack }) => {
    const game = getGame(id);
    const amiibos = getAmiibosByGame(id);

    if (!game) {
        return <Redirect to="/games" />;
    }
    return (
        <>
            <BackButton onGoBack={onGoBack} />
            <div style={styleGameContainer}>
                <img
                    style={styleGameImage}
                    src={getGameImage(game.id)}
                    alt={game.name}
                />
            </div>
            <Card>
                <div style={{ padding: 16 }}>
                    <div
                        style={{
                            fontSize: 24,
                            fontWeight: 500,
                        }}
                    >
                        {game.name}
                    </div>
                    <div style={{ margin: '8px 0' }}>{game.system}</div>
                    {game.categories.map(c => (
                        <Tag key={c}>{c}</Tag>
                    ))}
                </div>
            </Card>
            <Card>
                <div style={styleCompatibleAmiibosHeader}>
                    Compatible amiibos
                </div>
                {amiibos.map(
                    ({ id: amiiboId, name, collection, compatibleGames }) => (
                        <AmiiboItem
                            id={amiiboId}
                            key={amiiboId}
                            name={name}
                            imageUrl={getAmiiboImage(amiiboId)}
                            collection={collection}
                            description={
                                compatibleGames.find(game => game.id === id)!
                                    .description
                            }
                        />
                    )
                )}
            </Card>
        </>
    );
};

export default GameDetail;
