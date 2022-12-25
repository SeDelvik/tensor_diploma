import { SearchSquareSet } from "./SearchSquareSet";
import { SearchTrackSet } from "./SearchTrackSet";
/**
 * Возвращает реакт элемент страницы поиска
 * @param {*} props содержит текст запроса
 * @returns реакт элемент
 */
export const SearchProps = (props) => {
    return (
        <div className="content">

            <div className="content_search">
                <div className="content_search_head bold">Search result for "{props.text}"</div>
                <div className="search_tiles">
                    <div className="content_search_head">
                        Artists
                    </div>
                    <SearchSquareSet  text={props.text} isArtists={true}/>
                    
                    <a href="//" className="url_to_more">More artists &gt;</a>
                </div>
                <div className="search_tiles">
                    <div className="content_search_head">
                        Albums
                    </div>
                    <SearchSquareSet  text={props.text} isArtists={false}/>
                    <a href="//" className="url_to_more">More albums &gt;</a>
                </div>
                <div>
                    <div className="content_search_head">
                        Tracks
                    </div>
                    <SearchTrackSet  text={props.text}/>
                </div>
            </div>
        </div>
    );
}