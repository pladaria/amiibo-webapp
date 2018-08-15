const { writeFileSync } = require('fs');

const raw = require('./dump/data.js');

const groups = raw.grouped.type.groups;
const figuresData = groups.filter(g => g.groupValue === 'figur')[0].doclist
    .docs;
const gamesData = groups.filter(g => g.groupValue === 'game')[0].doclist.docs;

const allGames = {};
const allGameSeries = new Set();

const addProtocol = url => url.replace(/^\/\//, 'https://');
const clean = str => str.replace(/[®™]/g, '').trim();

const allAmiibos = figuresData.map(doc => {
    const {
        title: name,
        type,
        url,
        figure_number_s: number,
        figure_image_url_s: figureImageUrl,
        figure_collection_s: collection,
        fs_id: id,
        change_date: dateChange,
        date_from: dateRelease,
        game_series_txt: gameSeries = ['other'], // undefined for some amiibos
        compatible_games_list_id_txt: compatibleGamesIds,
    } = doc;

    gameSeries.forEach(game => allGameSeries.add(game));

    const compatibleGames = compatibleGamesIds.map((id, i) => {
        const game = {
            // id,
            name: doc.compatible_games_display_name_txt[i], // will be overwritten later
            // url: doc.compatible_games_list_url_txt[i],
        };

        allGames[id] = game;

        return {
            id,
            rank: doc[`compatible_games_compatibility_rank_${id}_s`],
            description: doc[
                `compatible_games_compatibility_desc_lineup_${id}_t`
            ].trim(),
        };
    });

    return {
        id,
        number,
        name,
        //url,
        figureImageUrl: addProtocol(figureImageUrl),
        //dateChange,
        dateRelease,
        collection,
        gameSeries,
        compatibleGames: compatibleGames.sort((a, b) => b.rank - a.rank),
    };
});

Object.keys(allGames).forEach(id => {
    const game = gamesData.find(game => game.fs_id === id);
    const {
        title: name,
        image_url: imageUrl,
        image_url_sq_s: squareImageUrl = '',
        date_from: dateRelease,
    } = game;
    allGames[id] = {
        name: clean(name),
        imageUrl: addProtocol(imageUrl),
        squareImageUrl: addProtocol(squareImageUrl),
        dateRelease,
    };
});

writeFileSync(
    'amiibo-data.ts',
    'export default ' +
        JSON.stringify(
            {
                gameSeries: [...allGameSeries],
                games: allGames,
                amiibos: allAmiibos,
            },
            null,
            4
        )
);
