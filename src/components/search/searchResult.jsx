import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'services/utilities/slugify';

/* ---------- */
import './styles/searchResult.scss';
/* ---------- */

function SearchResult(props) {
    const { name: title, isTvShow, year, adjaraId } = props.movie
    const [hoverState, setHoverState] = useState(false)
    
    /* `adjaraId === null` means the movie is not accessible
        but there are cases where they are accessible regardless of the `adjaraId`,
        those cases usually involve content taken down due to DMCA strikes.
    */
    return (
        <React.Fragment>
            {adjaraId && (
                <Link to={`/watch/${adjaraId}/${slugify(title)}`} className="search-result-anchor">
                    <div className={calculateClassName(props, hoverState)} 
                        onMouseEnter={() => setHoverState(true)}
                        onMouseLeave={() => setHoverState(false)}
                    >
                        <div>
                            <p title={title}>{title.length <= 35 ? title : title.slice(0,36) + '...'}</p>
                        </div>

                        <div className="result-meta">
                            <div className="meta-type">
                                <p>{isTvShow ? 'TV Show' : 'Movie'}</p>
                            </div>

                            <div>
                                <p>({year})</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </React.Fragment>
    )
}

function calculateClassName(props, hoverState) {
    return `search-result${props.last ? ' last' : ''}${props.hoverState ? ' parent-hovered' : ''}${hoverState ? ' self-hovered':''}${props.onlyChild ? ' only-child':''}`
}

/* ---------- */

export default SearchResult;