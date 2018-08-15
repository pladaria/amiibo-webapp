const { writeFileSync } = require("fs");

const raw = require("./data.js");

const groups = raw.grouped.type.groups;
const figures = groups.filter(g => g.groupValue === "figur")[0].doclist.docs;
const games = groups.filter(g => g.groupValue === "game")[0].doclist.docs;

const amiibos = figures.map(doc => {
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
    game_series_txt: gameSeries,
    compatible_games_list_id_txt: compatibleGamesIds
  } = doc;

  const compatibleGames = compatibleGamesIds.map((id, i) => {
    return {
      id,
      name: doc.compatible_games_display_name_txt[i],
      url: doc.compatible_games_list_url_txt[i],
      rank: doc[`compatible_games_compatibility_rank_${id}_s`],
      description: doc[`compatible_games_compatibility_desc_lineup_${id}_t`]
    };
  });

  return {
    id,
    number,
    type,
    name,
    url,
    figureImageUrl: figureImageUrl.replace(/^\/\//, "https://"),
    dateChange,
    dateRelease,
    collection,
    gameSeries,
    compatibleGames: compatibleGames.sort((a, b) => b.rank - a.rank)
  };
});

writeFileSync("amiibos.json", JSON.stringify(amiibos, null, 2));
