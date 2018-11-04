import * as React from 'react';
import Card from './card';
import { getGames, getGameImage } from '../data/amiibos';
import { Link } from 'react-router-dom';
import Tag from './tag';
import Img from 'react-lazy-img';
import styled from 'styled-components/macro';
import Panel from './panel';
import { useFilter } from './filter';

const GameLink = styled(Link)`
    padding: 16px;
    display: flex;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
`;

const GameTitle = styled.h2`
    font-size: 16px;
    margin-bottom: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const GameCoverContainer = styled.div`
    flex-shrink: 0;
    width: 75px;
    height: 75px;
    margin-right: 16px;
`;

const GameCoverImg = styled(Img)`
    width: 75px;
    height: 75px;
`;

const GameDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 1;
    flex-grow: 1;
    overflow: hidden;
    font-size: 13px;
`;

const GameCategories = styled.div`
    margin-bottom: 2px;
`;

interface GameProps {
    id: string;
    name: string;
    cover: string;
    date: string;
    system: string;
    categories: string[];
}

const Game: React.SFC<GameProps> = ({
    id,
    name,
    cover,
    categories,
    system,
}) => (
    <GameLink to={`/games/${id}`}>
        <GameCoverContainer>
            <GameCoverImg src={cover} alt={name} />
        </GameCoverContainer>
        <GameDescription>
            <div>
                {system}
                <GameTitle>{name}</GameTitle>
            </div>
            <GameCategories>
                {categories.map(c => (
                    <Tag key={c}>{c}</Tag>
                ))}
            </GameCategories>
        </GameDescription>
    </GameLink>
);

const GamesGallery: React.SFC = () => {
    const [filter, filterElement] = useFilter('');
    return (
        <>
            <Panel>{filterElement}</Panel>
            <Card>
                {getGames(filter).map(
                    ({ id, name, dateRelease, categories, system }) => (
                        <Game
                            id={id}
                            key={id}
                            name={name}
                            cover={getGameImage(id)}
                            date={dateRelease}
                            categories={categories}
                            system={system}
                        />
                    )
                )}
            </Card>
        </>
    );
};

export default GamesGallery;
