/**
 * Создает карточку-трек для страницы поиска
 * @param {*} props данные
 * @returns div-карточка 
 */
export const SearchTrack = (props) => {
    return(
        <div className="track">
            <img className="track_img" src={props.image}/>
            <div className="track_title bold">{props.title}</div>
            <div className="track_artist">{props.artist}</div>
            <div className="track_time">{props.min}:{props.sec}</div>
        </div>
    );
}