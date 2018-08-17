import * as React from 'react';
import {
    getAmiibosData,
    getGamesData,
    getGameSeriesData,
} from './data/amiibos';
import './app.css';
import Tabs, { Tab } from './components/tabs';
import AmiibosGallery from './components/amiibos-gallery';

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
        const isVisible = (section: string) => ({
            display: this.state.selectedTab === section ? '' : 'none',
        });
        return (
            <>
                <div style={isVisible('all')}>
                    <AmiibosGallery />
                </div>
                <div style={isVisible('series')}>
                    {this.getGameSeries().map(name => (
                        <div key={name}>{name}</div>
                    ))}
                </div>
                <div style={isVisible('games')}>
                    {Object.entries(this.getGames()).map(([id, game]) => (
                        <div key={id}>{game.name}</div>
                    ))}
                </div>
            </>
        );
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
