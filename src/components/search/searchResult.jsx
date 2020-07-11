import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ---------- */
import './searchResult.scss';
/* ---------- */

function SearchResult(props) {
    const { name, isTvShow, year, adjaraId } = props.movie
    const [hoverState, setHoverState] = useState(false)
    
    return (
        <Link to={`/watch/${adjaraId}`} className="search-result-anchor">
            <div className={`search-result${props.last ? ' last' : ''}${props.hoverState ? ' parent-hovered' : ''}${hoverState ? ' self-hovered' : ''}${props.onlyChild ? ' only-child' : ''}`} 
                onMouseEnter={() => setHoverState(true)}
                onMouseLeave={() => setHoverState(false)}
            >
                <div>
                    <p title={name}>{name.length <= 35 ? name : name.slice(0,36) + '...'}</p>
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
    )
}

/* ---------- */

export default SearchResult;