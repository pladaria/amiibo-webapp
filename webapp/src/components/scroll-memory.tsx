import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { UnregisterCallback } from 'history';

type SavedLocation = { path: string; scroll: [number, number] };

let locations: SavedLocation[] = [];
let index = 0;

class ScrollMemory extends React.Component<RouteComponentProps> {
    unregister: UnregisterCallback;

    componentDidMount() {
        locations.push({ path: this.props.location.pathname, scroll: [0, 0] });

        this.unregister = this.props.history.listen((location, action) => {
            const path = location.pathname;
            if (
                index > 0 &&
                locations[index - 1].path === path &&
                action !== 'PUSH'
            ) {
                index--;
            } else if (
                locations.length > index + 1 &&
                locations[index + 1].path === path &&
                action !== 'PUSH'
            ) {
                index++;
            } else {
                locations = locations.slice(0, index + 1);
                locations.push({ path, scroll: [0, 0] });
                index++;
            }
            this.restoreScroll();
        });

        window.addEventListener('touchstart', this.saveScroll);
        window.addEventListener('mousedown', this.saveScroll);
        window.addEventListener('keydown', this.saveScroll);
    }

    componentWillUnmount() {
        this.unregister();
        window.removeEventListener('touchstart', this.saveScroll);
        window.removeEventListener('mousedown', this.saveScroll);
        window.removeEventListener('keydown', this.saveScroll);
    }

    restoreScroll = () => {
        const [x, y] = locations[index].scroll;
        window.scrollTo(x, y);
    };

    saveScroll = () => {
        locations[index].scroll = [window.scrollX, window.scrollY];
    };

    render() {
        return null;
    }
}

export default withRouter(ScrollMemory);
