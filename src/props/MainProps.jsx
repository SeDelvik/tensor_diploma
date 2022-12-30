import { ContentTilesRound } from './ContentTilesRound'
import { ContentTilesSquare } from './ContentTilesSquare';
/**
 * Реакт элемент главной страницы
 * @returns реакт элемент
 */
export const MainProps = () =>{
    return (
        <div className="content">
            <div className="content_main">
                <div className="content_head">Music</div>
                <div className="content_head small">
                    Hot right now
                </div>
                <div className="line"></div>
                <ContentTilesRound />
                <div className="content_head small">
                    Popular tracks
                </div>
                <div className="line"></div>
                <ContentTilesSquare />
                
            </div>
        </div>
      );
}