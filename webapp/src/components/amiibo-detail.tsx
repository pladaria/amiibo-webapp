import * as React from 'react';
import Modal from './modal';
import { getAmiibo, Amiibo } from '../data/amiibos';
import { Redirect } from 'react-router';

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
        return (
            <Modal>
                {this.props.id}
                <pre>{JSON.stringify(this.state.amiibo, null, '  ')}</pre>
            </Modal>
        );
    }
}

export default AmiiboDetail;
