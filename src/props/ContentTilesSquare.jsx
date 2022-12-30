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
    const [arr,setArr] =useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess(){
        let pr = await getTopTracks();
        for(let i=0;i<pr.length;i++){
           pr[i].image = cat;
           pr[i].key = i;
        }
       return pr;
    }
    /**
     * вставка картинок в массив данных
     */
    async function images(mas){
        let pr = [...mas];
        for(let i=0;i<pr.length;i++){
            pr[i].image = await getPic();
        }
        return pr;
    }
    useEffect(()=>{
        async function tmp(){
            let t = await namess();
            setArr([...t]);
            t = await images(t);
            setArr([...t]);
        }
        tmp();
      
    },[]);

    return (
        <div className="content_tiles_square">
            {arr.map(element => {
                return <ContentTileSquare image={element.image} track={element.name} artist={element.artist.name} listners={element.listners} key={element.key} />
            })}
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
