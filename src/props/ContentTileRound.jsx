/**
 * Создает карточку с популярным исполнителем для главной страницы
 * @param {*} props данные
 * @returns div-карточка
 */


export const ContentTileRound = (props) =>{
    return(
        <div className="round_card">
            <img className="image_popular" src={props.imgLink}/>
            <div className="first_signature">{props.name}</div>
            <div className="tags">{props.tags}</div>
        </div>
    );
}