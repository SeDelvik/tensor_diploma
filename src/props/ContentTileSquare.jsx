/**
 * Создает карточку с популярными треками для главной страницы
 * @param {*} props данные
 * @returns div-карточка
 */
export const ContentTileSquare = (props) =>{
    return(
        <div className="square_card">
        <img className="image_square" src={props.image}/>
        <div className="square_text">
            <div className="first_signature">{props.track}</div>
            <div className="second_signature">{props.artist}</div>
            <div className="tags">{props.listeners}</div>
        </div>
    </div>
    );
}