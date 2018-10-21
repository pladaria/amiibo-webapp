import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { UnregisterCallback } from 'history';

type SavedLocation = { path: string; scroll: [number, number] };

class ScrollMemory extends React.Component<RouteComponentProps> {
    unregister: UnregisterCallback;
    locations: SavedLocation[] = [];
    index = 0;

    componentDidMount() {
        this.locations.push({
            path: this.props.location.pathname,
            scroll: [0, 0],
        });

        this.unregister = this.props.history.listen((location, action) => {
            const path = location.pathname;
            if (
                this.index > 0 &&
                this.locations[this.index - 1].path === path &&
                action !== 'PUSH'
            ) {
                this.index--;
            } else if (
                this.locations.length > this.index + 1 &&
                this.locations[this.index + 1].path === path &&
                action !== 'PUSH'
            ) {
                this.index++;
            } else {
                this.locations = this.locations.slice(0, this.index + 1);
                this.locations.push({ path, scroll: [0, 0] });
                this.index++;
            }
            this.restoreScroll();
        });

        window.addEventListener('scroll', this.saveScroll);
    }

    componentWillUnmount() {
        this.unregister();
        window.removeEventListener('scroll', this.saveScroll);
    }

    restoreScroll = () => {
        const [x, y] = this.locations[this.index].scroll;
        window.scrollTo(x, y);
    };

    saveScroll = () => {
        this.locations[this.index].scroll = [window.scrollX, window.scrollY];
    };

    render() {
        return null;
    }
}

export default withRouter(ScrollMemory);
