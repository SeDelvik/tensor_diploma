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
    
    const [arr, setArr] = useState([]);
    /**
     * создает массив с данными для карточек
     */
    async function namess() {
        let pr = [];
        if(props.isArtists){
            pr = await getSearchArtists(props.text);
        }else{
            pr = await getSearchAlbums(props.text);
        }
       
        for (let i = 0; i < pr.length; i++) {
            pr[i].image = cat;
            pr[i].key = i;
            if(props.isArtists){
                pr[i].other =pr[i].listeners +' listeners';
            }else{
                pr[i].other =pr[i].artist;
            }
        }
        return pr;
    }
    /**
     * вставка картинок в массив данных
     */
    async function images(mass) {
        let pr=[...mass];
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
        <div className="search_square_set">
            {arr.map(element => {
                        return <SearchSquareCard image={element.image} title={element.name} listenersCount={element.other} key={element.key} />
                    })}
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
