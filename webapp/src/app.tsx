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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}
                    >
                        {this.getItems().map(amiibo => (
                            <div
                                key={amiibo.id}
                                style={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    width: 120,
                                    textAlign: 'center',
                                    fontSize: 13,
                                    marginBottom: 20,
                                    color: '#444',
                                }}
                            >
                                <img
                                    width="120"
                                    src={amiibo.figureImageUrl}
                                    style={{ display: 'block' }}
                                />
                                <div style={{ marginTop: 8 }}>
                                    {amiibo.name}
                                </div>
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
                        {Object.entries(this.getGames()).map(([id, game]) => (
                            <div key={id}>{game.name}</div>
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
