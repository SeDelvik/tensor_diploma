import cat from '../data/images/cat.jpg'
import { SearchSquareCard } from './SearchSquareCard';
import { useEffect, useState } from "react";
import { getPic, getJson } from '../funcs'
/**
 * Создает и возвращает сет реакт элементов-альбомов/исполнителей по запросу
 * @param {*} props данные
 * @returns реакт элемент
 */
export const SearchSquareSet = (props) => {
    let pr = [];
    const [arr, setArr] = useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess() {
        if(props.isArtists){
            pr = await getSearchArtists(props.text);
        }else{
            pr = await getSearchAlbums(props.text);
        }
       
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
        if(props.isArtists){
            for (let i = 0; i < pr.length; i++) {
                arr2.push(<SearchSquareCard image={pr[i].image} title={pr[i].name} listenersCount={pr[i].listeners + " listeners"} key={i} />);
            }
        }else{
            for (let i = 0; i < pr.length; i++) {
                arr2.push(<SearchSquareCard image={pr[i].image} title={pr[i].name} listenersCount={pr[i].artist} key={i} />);
            }
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
        <div className="search_square_set">
            {arr}
        </div>
    );
}
/**
 * Получение по url списка артостов по запросу
 * @param {*} text запрос
 * @returns json с данными
 */
async function getSearchArtists(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&limit=8&api_key=f83fcb45f7f2bb4929e8f19f7e415158&format=json`;
    let json = await getJson(url);
    return(json.results.artistmatches.artist);
}
/**
 * Получение по url списка альбомов по запросу
 * @param {*} text запрос
 * @returns json с данными
 */
async function getSearchAlbums(text) {
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&limit=8&api_key=f83fcb45f7f2bb4929e8f19f7e415158&format=json`;
    let json = await getJson(url);
    return(json.results.albummatches.album);
}
