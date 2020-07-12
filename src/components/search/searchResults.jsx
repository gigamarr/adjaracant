import React, { useState } from 'react';
import SearchResult from './searchResult';

/* ---------- */
import FadeIn from 'react-fade-in';
import './styles/searchResults.scss';
/* ---------- */

function SearchResults(props) {    
    const [hoverState, setHoverState] = useState(false);
    
    return (
        <div id="search-results-container">
            {props.movies.length > 0 && (
                <div id="clear-results" onClick={props.onClear}>clear</div>
            )}

            {props.movies.length > 0 && (
                <div id="search-results" 
                     onMouseEnter={() => setHoverState(true)} 
                     onMouseLeave={() => setHoverState(false)}
                >

                    <FadeIn delay={15}>
                        {props.movies.map((movie, index) => (
                            <SearchResult key={movie.id} 
                                            movie={movie} 
                                            last={index === props.movies.length-1} 
                                            onlyChild={props.movies.length === 1}
                                            hoverState={hoverState} 
                            />
                        ))}
                    </FadeIn>


                </div>
            )}
        </div>
    )
}

/* ---------- */

export default SearchResults;
