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
        figure_collection_s: collection = 'Other', // undefined for some amiibos
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
        compatibleGames,
    };
});

Object.keys(allGames).forEach(id => {
    const game = gamesData.find(game => game.fs_id === id);
    const {
        title: name,
        image_url: imageUrl = '',
        image_url_sq_s: squareImageUrl = '',
        date_from: dateRelease,
        system_names_txt: system,
        developer = '',
        publisher = '',
        game_categories_txt: categories,
        game_series_txt: gameSeries = [],
    } = game;

    if (system.length !== 1) {
        console.error('multiple systems:', game);
    }
    if (!categories) {
        console.error(('missing categories', game));
    }

    allGames[id] = {
        id,
        name: clean(name),
        imageUrl: imageUrl ? addProtocol(imageUrl) : '',
        squareImageUrl: squareImageUrl ? addProtocol(squareImageUrl) : '',
        dateRelease,
        system: system[0],
        developer,
        publisher,
        categories,
        gameSeries: gameSeries,
    };
});

allAmiibos.forEach(amiibo => {
    amiibo.compatibleGames.sort((gameA, gameB) => {
        if (
            amiibo.gameSeries.some(series =>
                allGames[gameA.id].gameSeries.includes(series)
            )
        ) {
            return -1;
        }
        if (
            amiibo.gameSeries.some(series =>
                allGames[gameB.id].gameSeries.includes(series)
            )
        ) {
            return 1;
        }
        return gameA.rank > gameB.rank ? -1 : 1;
    });
});

writeFileSync(
    'amiibo-data.json',
    JSON.stringify(
        {
            games: Object.values(allGames),
            amiibos: allAmiibos,
        },
        null,
        4
    )
);

writeFileSync(
    'amiibo-data.ts',
    'export default ' +
        JSON.stringify(
            {
                games: Object.values(allGames).map(game => {
                    const res = { ...game };
                    delete res.squareImageUrl;
                    delete res.imageUrl;
                    return res;
                }),
                amiibos: allAmiibos.map(amiibo => {
                    const res = { ...amiibo };
                    delete res.figureImageUrl;
                    return res;
                }),
            },
            null,
            4
        )
);
