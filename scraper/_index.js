const fetch = require("node-fetch");
const cheerio = require("cheerio");
const url =
  "https://www.nintendo.es/amiibo-/Gama-de-amiibo/Figuras-932319.html";

const clean = s => s.replace(/[™®]/g, "");

const getText = async url => (await fetch(url)).text();
const getStream = async url => (await fetch(url)).getStream();

const optionsToMap = ($options, map) => {
  $options.each((_, el) => {
    const id = $(el).attr("value");
    const name = clean($(el).text());
    if (id !== "*") {
      map.set(id, name);
    }
  });
};

const compatibleGames = new Map();
const gameSeries = new Map();
const collection = new Map();

const main = async () => {
  const html = await getText(url);
  $ = cheerio.load(html);

  optionsToMap($("#amiiboSelectGame option"), compatibleGames);
  optionsToMap($("#amiiboSelectGameseries option"), gameSeries);
  optionsToMap($("#amiiboSelectCollection option"), collection);

  console.log(compatibleGames);
  console.log(gameSeries);
  console.log(collection);
};

main();
