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
    let pr = [];
    const [arr,setArr] =useState ([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess(){
        pr = await getTopArtists();
        for(let i=0;i<pr.length;i++){
           pr[i].image = cat;
        }
        upd();
    }
    /**
     * вставка картинок в массив данных
     */
    async function images(){
        for(let i=0;i<pr.length;i++){
            pr[i].image = await getPic();
        }
        upd();
    }
    /** 
     * создане карточек по массиву днных
    */
    function upd(){
        let arr2 = [];
        for(let i=0;i<pr.length;i++){
            arr2.push(<ContentTileRound imgLink={pr[i].image} name={pr[i].name} tags={pr[i].playcount} key={i}/>);
        }
        setArr(arr2);
    }
    useEffect(()=>{
        async function tmp(){
            await namess();
            await images();
        }
        tmp();
      
    },[]);
   

    return(
        <div className="content_tiles_round"> 
            {arr}
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
