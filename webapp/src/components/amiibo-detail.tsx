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

interface GameProps {
    id: string;
    description: string;
    rank: string;
}

const Game: React.StatelessComponent<GameProps> = ({
    id,
    description,
    rank,
}) => {
    const game = getGame(id);
    if (!game) {
        return null;
    }
    const cover = game.squareImageUrl || game.imageUrl;
    const { name, system } = game;
    return (
        <Link to={`/games/${id}`} style={styleGame}>
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
        return (
            <Modal>
                <div
                    style={{
                        background: 'white',
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                            display: 'block',
                        }}
                        src={amiibo.figureImageUrl}
                    />
                    <div
                        style={{
                            padding: '0px 16px 16px 16px',
                            textAlign: 'center',
                        }}
                    >
                        <h1>{amiibo.name}</h1>
                    </div>
                </div>
                <Card>{amiibo.compatibleGames.map(Game)}</Card>
            </Modal>
        );
    }
}

export default AmiiboDetail;
