let apiKey = 'f83fcb45f7f2bb4929e8f19f7e415158';

let imgZaglushka = '../data/images/cat.jpg';

document.onreadystatechange = async function () {
    createMain();
}

/**
 * Создание главной страницы с популярными штуками.
 */
async function createMain(){
    if (document.readyState === 'complete') {
        let searchButton = document.getElementsByClassName('search_img')[0];
        let searchField = document.getElementsByClassName('search_field')[0];
        let searchForm = document.getElementsByClassName('search_main')[0];

        await getTopArtists();
        await getTopTracks();
        putMainImages();

        searchButton.onclick = function () {
            search(searchField.value);
        }

        searchForm.onsubmit = function (event) {
            event.preventDefault();
            search(searchField.value);
        }
    }
}

/**
 * Получиение по url списка популярных исполнителей и создание с ними карточек на главной странице
 */
async function getTopArtists() {
    let artistsUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=${apiKey}&format=json`;
    let json = await getJson(artistsUrl);
    compliteArtists(json.artists.artist);
}

/**
 * Создает карточки с популярными исполнителями по полученному json-объекту на главной странице
 * @param {Object} artists json с данными о популярных артистах
 */
function compliteArtists(artists) {
    let contentTilesRound = document.getElementsByClassName('content_tiles_round')[0];
    for (let i = 0; i < artists.length; i++) {
        let card = document.createElement('div');
        card.className = 'round_card';
        card.innerHTML = `
        <img class="image_popular">
        <div class="first_signature">${artists[i].name}</div>
        <div class="tags">Play count: ${artists[i].playcount}</div>`;
        contentTilesRound.append(card);
    }
}

/**
 * Получиение по url списка популярных трэков и создание с ними карточек на главной странице
 */
async function getTopTracks() {
    let tracksUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=9&api_key=${apiKey}&format=json`;
    let json = await getJson(tracksUrl);
    compliteTracks(json.tracks.track);
}

/**
 * Создает карточки с популярными треками по полученному json-объекту на главной странице
 * @param {Object} tracks json с данными о популярных треках
 */

function compliteTracks(tracks) {
    let contentTilesSquare = document.getElementsByClassName('content_tiles_square')[0];
    for (let i = 0; i < tracks.length; i++) {
        let card = document.createElement('div');
        card.className = 'square_card';
        card.innerHTML = `
        <img class="image_square">
        <div class="square_text">
            <div class="first_signature">${tracks[i].name}</div>
            <div class="second_signature">${tracks[i].artist.name}</div>
            <div class="tags">${tracks[i].listeners} listeners</div>
        </div>`;

        contentTilesSquare.append(card);
    }
}

/**
 * Вставка картинок во все карточки на главной странице
 */
/* async  */function putMainImages() {
    putImages('image_popular');
    putImages('image_square');
}
/**
 * Получение случайной картинки
 * 
 * @returns {string} url изображения
 */
async function getPic() {
    let imgUrl = 'https://picsum.photos/200';
    let image = imgZaglushka;
    try {
        let img = await fetch(imgUrl);
        if (img.status === 200) {
            image = img.url;
        } else {
            throw new Error('Fetch image error ' + img.status);
        }
    } catch (err) {
        console.log(err);
    }

    return image;
}

/**
 * Создание страницы поиска 
 * @param {string} text поисковый запрос.
 */
async function search(text) {
    text = text.trim();
    if (text != "") {
        preparingSearchContent(text);
        await getSearchArtists(text);
        await getSearchAlbums(text);
        await getSearchTracks(text);
        putSearchImages();
    }

}

/**
 * Замена контента главной страницы на основные элементы для поиска.
 * @param {string} text поисковый запрос.
 */
function preparingSearchContent(text) {
    let content = document.getElementsByClassName('content')[0];
    content.innerHTML = `
    <div class="content_search">
        <div class="content_search_head bold">Search result for "${text}"</div>
        <div class="search_tiles">
            <div class="content_search_head">
                Artists
            </div>
            <div class="search_square_set">
            </div>
            <a href="//" class="url_to_more">More artists &gt;</a>
        </div>
        <div class="search_tiles">
            <div class="content_search_head">
                Albums
            </div>
            <div class="search_square_set">
            </div>
            <a href="//" class="url_to_more">More albums &gt;</a>
        </div>
        <div>
            <div class="content_search_head">
                Tracks
            </div>
            <div class="track_set">
            </div>
        </div>
    </div>`
}

/**
 * Получение информации об исполнителях, соответствующих запросу и создание карточек.
 * @param {string} text поискавый запрос. 
 */
async function getSearchArtists(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&limit=8&api_key=${apiKey}&format=json`;
    let json = await getJson(url);
    compliteSearchTilesArtists(json.results.artistmatches.artist);
}

/**
 * Создание и вставка карточек с найденными исполнителями.
 * 
 * @param {Array} arr массив с даннми об исполнителях.
 */
function compliteSearchTilesArtists(arr) {
    let searchTilesArtists = document.getElementsByClassName('search_square_set')[0];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        let card = document.createElement('div');
        card.className = "search_square_card";
        card.innerHTML = `
            <img class="search_square_image">
            <div class="gradient"></div>
            <div class="search_card_text">
                <div class="title bold">${arr[i].name}</div>
                <div class="listners">${arr[i].listeners} listeners</div>
            </div>`;
        searchTilesArtists.append(card);
    }

}

/**
 * Получение информации об альбомах, соответствующих запросу и создание карточек.
 * 
 * @param {string} text поискавый запрос. 
 */
async function getSearchAlbums(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&limit=8&api_key=${apiKey}&format=json`;
    let json = await getJson(url);
    compliteSearchTilesAlbum(json.results.albummatches.album);
}

/**
 * Создание и вставка карточек с найденными альбомами.
 * 
 * @param {Array} arr массив с данными о найденных альбомах.
 */
function compliteSearchTilesAlbum(arr) {
    let searchTilesAlbums = document.getElementsByClassName('search_square_set')[1];
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement('div');
        card.className = 'search_square_card';
        card.innerHTML = `<img class="search_square_image">
        <div class="gradient"></div>
        <div class="search_card_text">
            <div class="title bold">${arr[i].name}</div>
            <div class="listners">${arr[i].artist}</div>
        </div>`
        searchTilesAlbums.append(card);
    }
}

/**
 * Возвращает json-объект по переланному url.
 * 
 * @param {string} url Url по которому будут получены данные.
 * @returns {Object} Json-объект.
 */
async function getJson(url) {
    let json = {};
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            json = await response.json();
        } else {
            throw new Error(url + ' error ' + response.status);
        }
    } catch (err) {
        console.log(err);
    }
    return json;
}

/**
 * Получение информации о треках соответствующих запросу и создание карточек.
 * @param {string} text поисковый запрос 
 */
async function getSearchTracks(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&limit=10&api_key=${apiKey}&format=json`;
    let json = await getJson(url);
    compliteSearchTilesTrack(json.results.trackmatches.track);
}

/**
 * Сборка и вставка карточек с найденными треками.
 * @param {Array} arr массив с данными о найденных треках.
 */
function compliteSearchTilesTrack(arr) {
    let searchTilesTracks = document.getElementsByClassName('track_set')[0];
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement('div');
        card.className = 'track';
        card.innerHTML = `<img class="track_img">
        <div class="track_title bold">${arr[i].name}</div>
        <div class="track_artist">${arr[i].artist}</div>
        <div class="track_time">${Math.floor(Math.random() * 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}</div>`
        searchTilesTracks.append(card);
    }
}

/**
 * Вставка случайных картинок в карточки в результатах поиска
 */
function putSearchImages() {
    putImages('search_square_image');
    putImages('track_img');
}

/**
 * Вставка случайных картинок во все элементы на странице по переданному классу.
 * 
 * @param {string} imgName название класса элемента, содержащего картинку.
 */
async function putImages(imgName) {
    let images = document.getElementsByClassName(imgName);
    for(let i=0;i<images.length;i++){
        let image = await getPic();
        images[i].setAttribute('src',image);
    }
}