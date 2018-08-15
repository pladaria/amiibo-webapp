import * as React from 'react';
import { getAmiibosData, getGamesData, getGameSeriesData } from './data/amiibos';
import './App.css';
import Tabs from './components/tabs';

class App extends React.Component {
    getItems() {
        return getAmiibosData();
    }

    getGameSeries() {
        return getGameSeriesData();
    }

    getGames() {
        return getGamesData();
    }

    render() {
        return (
            <div>
                <div>HEADER</div>
                <Tabs>
                    <Tabs.Tab selected>All Amiibos</Tabs.Tab>
                    <Tabs.Tab>Game Series</Tabs.Tab>
                    <Tabs.Tab>Games</Tabs.Tab>
                </Tabs>
                <div>
                    <select>
                        {this.getGameSeries().map(name => (
                            <option key={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select>
                        {Object.values(this.getGames()).map(({ name }) => (
                            <option key={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    {this.getItems().map(amiibo => (
                        <div key={amiibo.id}>
                            <img height={100} src={amiibo.figureImageUrl} />
                            {amiibo.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
