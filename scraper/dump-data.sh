BASE='https://search.nintendo-europe.com/en/select'
#TYPE='fq=*' # all
TYPE='fq=type%3AFIGURE%20OR%20type%3AGAME' # figures or games
JSONP='json.wrf=module.exports='
SORT='sort=date_from%20desc%2C%20figure_number_s%20asc'
GROUP_SORT='group.sort=date_from%20asc%2C%20figure_number_s%20asc'

mkdir -p dump

curl "$BASE?$TYPE&group=true&group.field=type&group.limit=5000&group.ngroups=true&$GROUP_SORT&$JSONP&q=*&rows=5000&$SORT&start=0&wt=json" \
    -H 'Referer: https://www.nintendo.es/amiibo-/Gama-de-amiibo/Figuras-932319.html' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36' --compressed > dump/data.js
