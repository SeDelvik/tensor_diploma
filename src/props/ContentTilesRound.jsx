import { useEffect, useState } from "react";
import { ContentTileRound } from "./ContentTileRound";
import {getPic, getJson} from '../funcs'
import cat from '../data/images/cat.jpg'
/**
 * Вовзращает сет карточек с популярными исполнителями
 * @param {*} props данные
 * @returns div-элемент с сетом карточек
 */
export const ContentTilesRound = (props) =>{
    const [arr,setArr] =useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess(){
        let pr = await getTopArtists();
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
   

    return(
        <div className="content_tiles_round"> 
            {arr.map(element => {
                return <ContentTileRound imgLink={element.image} name={element.name} tags={element.playcount} key={element.key}/>
            })}
        </div>
    );
}

/**
 * получение по url списка популярных артистов
 * @returns json с данными
 */
async function getTopArtists() {
    let artistsUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=f83fcb45f7f2bb4929e8f19f7e415158&format=json`;
    let art = await getJson(artistsUrl);
    return art.artists.artist;
}
