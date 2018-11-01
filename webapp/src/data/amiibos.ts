import data from './amiibo-data';

export const getAmiibosData = () => data.amiibos;

export type Amiibo = typeof data.amiibos[0];
export type Game = typeof data.games[0];

export const getAmiibo = (id: string) =>
    data.amiibos.find(amiibo => amiibo.id === id);

export const getGame = (id: string) => data.games.find(game => game.id === id);

export const getAmiibosGroupedByCollection = (filter: string = '') => {
    const groups = new Map<string, Amiibo[]>();
    data.amiibos.forEach(amiibo => {
        if (filter) {
            const f = filter.toLowerCase();
            if (
                !amiibo.name.toLowerCase().includes(f) &&
                !amiibo.collection.toLowerCase().includes(f) &&
                !amiibo.gameSeries.some(s => s.toLowerCase().includes(f))
            ) {
                return;
            }
        }
        let collection = amiibo.collection;

        // blacklist for small groups
        if (
            collection.startsWith('Chibi') ||
            collection.startsWith('Shovel') ||
            collection.startsWith('Pikmin') ||
            collection.startsWith('Detective') ||
            collection.startsWith('Mario Sports') ||
            collection.startsWith('Other')
        ) {
            collection = '';
        }

        if (!groups.has(collection)) {
            groups.set(collection, []);
        }
        groups.get(collection)!.push(amiibo);
    });

    const entries = Array.from(groups.entries());

    entries.forEach(([, amiibos]) => {
        amiibos.sort((a, b) => (a.dateRelease < b.dateRelease ? -1 : 1));
    });

    entries.sort(([c1, a1], [c2, a2]) => {
        if (!c1) {
            return 1;
        }
        if (!c2) {
            return -1;
        }
        return a1[0].dateRelease < a2[0].dateRelease ? -1 : 1;
    });

    return entries;
};

export const getAmiibosByGame = (id: string) =>
    data.amiibos.filter(amiibo =>
        amiibo.compatibleGames.some(game => game.id === id)
    );

export const getGames = () =>
    [...data.games].sort((a, b) => (a.dateRelease < b.dateRelease ? 1 : -1));

export const getGameImage = (id: string) => `/images/game/${id}-500w.jpg`;

export const getAmiiboImage = (id: string) => `/images/amiibo/${id}-500w.jpg`;
