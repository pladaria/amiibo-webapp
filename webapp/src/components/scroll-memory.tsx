import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

type Location = { path: string; scroll: [number, number] };

const ScrollMemory: React.SFC<RouteComponentProps> = ({
    location,
    history,
}) => {
    const ref = React.useRef({ index: 0, locations: [] as Location[] }).current;

    const handleScroll = () => {
        ref.locations[ref.index].scroll = [window.scrollX, window.scrollY];
    };

    const restoreScroll = () => {
        const [x, y] = ref.locations[ref.index].scroll;
        requestAnimationFrame(() => {
            window.scrollTo(x, y);
        });
    };

    React.useEffect(() => {
        ref.locations.push({ path: location.pathname, scroll: [0, 0] });
        window.addEventListener('scroll', handleScroll);
        const unlistenHistory = history.listen((location, action) => {
            const path = location.pathname;
            if (
                ref.index > 0 &&
                ref.locations[ref.index - 1].path === path &&
                action !== 'PUSH'
            ) {
                ref.index--;
            } else if (
                ref.locations.length > ref.index + 1 &&
                ref.locations[ref.index + 1].path === path &&
                action !== 'PUSH'
            ) {
                ref.index++;
            } else {
                ref.locations = ref.locations.slice(0, ref.index + 1);
                ref.locations.push({ path, scroll: [0, 0] });
                ref.index++;
            }
            restoreScroll();
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unlistenHistory();
        };
    }, []);

    return null;
};

export default withRouter(ScrollMemory);
