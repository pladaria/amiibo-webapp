import * as React from 'react';
import {
    getAmiibosData,
    getGamesData,
    getGameSeriesData,
} from './data/amiibos';
import './app.css';
import Tabs, { Tab } from './components/tabs';

interface AppState {
    selectedTab: string;
}
class App extends React.Component<{}, AppState> {
    state = {
        selectedTab: 'all',
    };
    getItems() {
        return getAmiibosData();
    }

    getGameSeries() {
        return getGameSeriesData();
    }

    getGames() {
        return getGamesData();
    }

    handleTabChange = (value: string) => {
        this.setState({ selectedTab: value });
    };

    renderSection = () => {
        switch (this.state.selectedTab) {
            case 'all':
                return (
                    <div>
                        {this.getItems().map(amiibo => (
                            <div key={amiibo.id}>
                                <img width="100%" src={amiibo.figureImageUrl} />
                                <div>{amiibo.name}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'series':
                return (
                    <div>
                        {this.getGameSeries().map(name => (
                            <div key={name}>{name}</div>
                        ))}
                    </div>
                );
            case 'games':
                return (
                    <div>
                        {Object.values(this.getGames()).map(({ name }) => (
                            <div key={name}>{name}</div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div>
                <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleTabChange}
                >
                    <Tab value="all">All Amiibos</Tab>
                    <Tab value="series">Game Series</Tab>
                    <Tab value="games">Games</Tab>
                </Tabs>
                <div style={{ paddingTop: 48 }}>{this.renderSection()}</div>
            </div>
        );
    }
}

export default App;
