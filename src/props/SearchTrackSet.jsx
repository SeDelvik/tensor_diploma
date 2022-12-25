import cat from '../data/images/cat.jpg'
import { useEffect, useState } from "react";
import { getPic, getJson } from '../funcs'
import { SearchTrack } from './SearchTrack';

/** 
 * Создает и возвращает сет реакт элементов-треков по запросу
 * @param текст запроса
 * @returns реакт-элемент с треками
*/
export const SearchTrackSet = (props) =>{
    let pr = [];
    const [arr, setArr] = useState([]);

    /**
     * создает массив с данными для карточек
     */
    async function namess() {
        pr = await getSearchTracks(props.text);
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
            arr2.push(<SearchTrack image={pr[i].image} title={pr[i].name} artist={pr[i].artist} min={getRandMin()} sec={getRandSec()} key={i} />);
        }
        
        setArr(arr2);
    }
    useEffect(() => {
        async function tmp() {
            await namess();
            await images();
        }
        tmp();

    }, [props]);


    return (
        <div className="track_set">
            {arr}
        </div>
    );
}
/**
 * получение по url списка треков по запросу
 * @param text запрос
 * @returns json с данными
 */
async function getSearchTracks(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&limit=10&api_key=f83fcb45f7f2bb4929e8f19f7e415158&format=json`;
    let json = await getJson(url);
    return(json.results.trackmatches.track);
}
/**
 * Возвращает случайное количество минут
 * @returns некоторое количество минут
 */
function getRandMin(){
    return(Math.floor(Math.random() * 5));
}
/**
 * Возвращает случайное количество секунд
 * @returns некоторое количество секунд
 */
function getRandSec(){
    return(Math.floor(Math.random() * 60).toString().padStart(2, '0'));
}