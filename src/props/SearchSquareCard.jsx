/**
 * Создает карточку для артистов или альбомов для страницы поиска
 * @param {*} props данные
 * @returns реакт элемент-карточка
 */
export const SearchSquareCard = (props) => {
    return(
    <div className="search_square_card">
        <img className="search_square_image" src={props.image}/>
        <div className="gradient"></div>
        <div className="search_card_text">
            <div className="title bold">{props.title}</div>
            <div className="listners">{props.listenersCount}</div>
        </div>
    </div>
    );
}
