const fetch = require('node-fetch');
const mkdirp = require('mkdirp');
const { join } = require('path');
const { writeFileSync, existsSync } = require('fs');
const data = require('./amiibo-data.json');

const amiibosPath = join(__dirname, 'dump/images/amiibo');
const gamesPath = join(__dirname, 'dump/images/game');

mkdirp.sync(amiibosPath);
mkdirp.sync(gamesPath);

const main = async () => {
    console.log('downloading amiibo images');
    await Promise.all(
        data.amiibos.map(async ({ id, figureImageUrl }) => {
            const filename = join(amiibosPath, `${id}-500w.jpg`);
            if (existsSync(filename)) {
                console.log(`skip ${filename}`);
                return;
            }
            console.log(`fetch ${figureImageUrl}`);
            const result = await fetch(figureImageUrl);
            const buffer = await result.buffer();
            if (!figureImageUrl.endsWith('500w.jpg')) {
                console.error(figureImageUrl, 'unexpected size/format');
                process.exit();
            }
            writeFileSync(filename, buffer);
            console.log(`write ${filename}`);
        })
    );

    console.log('downloading game images');
    await Promise.all(
        data.games.map(async ({ id, squareImageUrl, imageUrl }) => {
            const filename = join(gamesPath, `${id}-500w.jpg`);
            if (existsSync(filename)) {
                console.log(`skip ${filename}`);
                return;
            }
            const url = squareImageUrl || imageUrl;
            console.log(`fetch ${url}`);
            const result = await fetch(url);
            const buffer = await result.buffer();
            if (!url.endsWith('500w.jpg') && !url.endsWith('300w.jpg')) {
                console.error(url, 'unexpected size/format');
                process.exit();
            }
            writeFileSync(filename, buffer);
            console.log(`write ${filename}`);
        })
    );

    console.log('ok');
};

main();
