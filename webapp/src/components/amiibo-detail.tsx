import * as React from 'react';
import Modal from './modal';
import { getAmiibo, getGame, Amiibo } from '../data/amiibos';
import { Redirect } from 'react-router';
import Card from './card';
import { Link } from 'react-router-dom';

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

const styleCover: React.CSSProperties = {
    flexShrink: 0,
    width: 75,
    height: 75,
    marginRight: 16,
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
    width: 400,
    maxWidth: 400,
    height: 440,
    position: 'relative',
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
    width: '100%',
    display: 'block',
    position: 'absolute',
    bottom: 0,
};

const styleAmiiboName: React.CSSProperties = {
    padding: '0px 16px 16px 16px',
    textAlign: 'center',
};

interface GameProps {
    id: string;
    description: string;
}

const Game: React.StatelessComponent<GameProps> = ({ id, description }) => {
    const game = getGame(id);
    if (!game) {
        return null;
    }
    const cover = game.squareImageUrl || game.imageUrl;
    const { name, system } = game;
    return (
        <Link to={`/games/${id}`} style={styleGame} key={id}>
            <img style={styleCover} src={cover} />
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

interface State {
    amiibo?: Amiibo;
}

class AmiiboDetail extends React.Component<Props, State> {
    state = {} as State;

    static getDerivedStateFromProps = (props: Props): State => ({
        amiibo: getAmiibo(props.id),
    });

    render() {
        if (!this.state.amiibo) {
            return <Redirect to="/amiibos" />;
        }

        const { amiibo } = this.state;
        const { onGoBack } = this.props;
        return (
            <Modal onGoBack={onGoBack}>
                <div style={styleAmiiboContainer}>
                    <div style={styleFigureContainer}>
                        <img
                            style={styleFigureImage}
                            src={amiibo.figureImageUrl}
                        />
                    </div>
                    <h1 style={styleAmiiboName}>{amiibo.name}</h1>
                </div>
                <Card>
                    <div style={styleCompatibleGamesHeader}>
                        Compatible games
                    </div>
                    {amiibo.compatibleGames.map(Game)}
                </Card>
            </Modal>
        );
    }
}

export default AmiiboDetail;
