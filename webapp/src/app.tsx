import * as React from 'react';
import './app.scss';
import { Tabs, Tab, TabContent } from './components/tabs';
import AmiibosGallery from './components/amiibos-gallery';
import GamesGallery from './components/games-gallery';
import AmiiboDetail from './components/amiibo-detail';
import { Route } from 'react-router-dom';
import GameDetail from './components/game-detail';

const App: React.SFC = () => (
    <>
        <Route
            path="/(amiibos|games)"
            exact
            render={() => (
                <>
                    <Tabs>
                        <Tab path="/amiibos" title="Amiibos" />
                        <Tab path="/games" title="Games" />
                    </Tabs>
                    <TabContent path="/amiibos" children={<AmiibosGallery />} />
                    <TabContent path="/games" children={<GamesGallery />} />
                </>
            )}
        />

        <Route
            path="/amiibos/:id"
            render={({ match, history }) => (
                <AmiiboDetail id={match.params.id} onGoBack={history.goBack} />
            )}
        />

        <Route
            path="/games/:id"
            render={({ match, history }) => (
                <GameDetail id={match.params.id} onGoBack={history.goBack} />
            )}
        />
    </>
);

export default App;
