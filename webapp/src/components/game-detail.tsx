import * as React from 'react';
import Modal from './modal';
import { getGame, Game } from '../data/amiibos';
import { Redirect } from 'react-router';

interface Props {
    id: string;
}

interface State {
    game?: Game;
}

class GameDetail extends React.Component<Props, State> {
    state = {} as State;

    static getDerivedStateFromProps = (props: Props): State => ({
        game: getGame(props.id),
    });

    render() {
        if (!this.state.game) {
            return <Redirect to="/games" />;
        }
        return (
            <Modal>
                {this.props.id}
                <pre>{JSON.stringify(this.state.game, null, '  ')}</pre>
            </Modal>
        );
    }
}

export default GameDetail;
