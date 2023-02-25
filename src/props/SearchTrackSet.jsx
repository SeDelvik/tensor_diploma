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
    const [arr, setArr] = useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess() {
        let pr = await getSearchTracks(props.text);
        for (let i = 0; i < pr.length; i++) {
            pr[i].image = cat;
            pr[i].key=i;
        }
       return pr;
    }
    /**
     * вставка картинок в массив данных
     */
    async function images(mass) {
        let pr = [...mass]
        for (let i = 0; i < pr.length; i++) {
            pr[i].image = await getPic();
        }
        return pr;
    }

    useEffect(() => {
        async function tmp(){
            let t = await namess();
            setArr([...t]);
            t = await images(t);
            setArr([...t]);
        }
        tmp();

    }, [props]);


    return (
        <div className="track_set">
            {arr.map(element => {
                return <SearchTrack image={element.image} title={element.name} artist={element.artist} min={getRandMin()} sec={getRandSec()} key={element.key} />
            })}
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