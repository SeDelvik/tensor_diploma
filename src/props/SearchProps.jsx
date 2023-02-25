import { SearchSquareSet } from "./SearchSquareSet";
import { SearchTrackSet } from "./SearchTrackSet";
import {
    useParams
  } from "react-router-dom";
/**
 * Возвращает реакт элемент страницы поиска
 * @returns реакт элемент
 */
export const SearchProps = () => {
    let params = useParams();
    return (
        <div className="content">

            <div className="content_search">
                <div className="content_search_head bold">Search result for "{params.text}"</div>
                <div className="search_tiles">
                    <div className="content_search_head">
                        Artists
                    </div>
                    <SearchSquareSet  text={params.text} isArtists={true}/>
                    
                    <a href="//" className="url_to_more">More artists &gt;</a>
                </div>
                <div className="search_tiles">
                    <div className="content_search_head">
                        Albums
                    </div>
                    <SearchSquareSet  text={params.text} isArtists={false}/>
                    <a href="//" className="url_to_more">More albums &gt;</a>
                </div>
                <div>
                    <div className="content_search_head">
                        Tracks
                    </div>
                    <SearchTrackSet  text={params.text}/>
                </div>
            </div>
        </div>
    );
}