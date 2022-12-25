import { useEffect, useState } from "react";
import { getPic, getJson } from '../funcs'
import cat from '../data/images/cat.jpg'
import { ContentTileSquare } from "./ContentTileSquare";

/**
 * Возврашает элемент с сетом популярных треков
 * @param {*} props данные
 * @returns реакт-элемент с набором карточек
 */
export const ContentTilesSquare = (props) => {
    let pr = [];
    const [arr, setArr] = useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess() {
        pr = await getTopTracks();
        for (let i = 0; i < pr.length; i++) {
            pr[i].image = cat;
        }
        upd();
    }
    /**
     * вставка картинок в массив данных
     */
    async function images() {
        for (let i = 0; i < pr.length; i++) {
            pr[i].image = await getPic();
        }
        upd();
    }
    /** 
     * создане карточек по массиву днных
    */
    function upd() {
        let arr2 = [];
        for (let i = 0; i < pr.length; i++) {
            arr2.push(<ContentTileSquare image={pr[i].image} track={pr[i].name} artist={pr[i].artist.name} listners={pr[i].listners} key={i} />);
        }
        setArr(arr2);
    }
    useEffect(() => {
        async function tmp() {
            await namess();
            await images();
        }
        tmp();

    }, []);


    return (
        <div className="content_tiles_square">
            {arr}
        </div>
    );
}

/**
 * Получение по url списка популярных треков
 * @returns json с данными
 */
async function getTopTracks() {
    let tracksUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=9&api_key=f83fcb45f7f2bb4929e8f19f7e415158&format=json`;
    let json = await getJson(tracksUrl);
    return json.tracks.track;
}
