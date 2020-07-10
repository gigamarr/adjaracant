import React, { useState } from 'react';
import SearchResult from './searchResult';

/* ---------- */
import FadeIn from 'react-fade-in';
import './searchResults.scss';
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
                        {props.movies.map((movie, index) => {
                            if (index === props.movies.length-1) {
                                return <SearchResult key={movie.id} movie={movie} last hoverState={hoverState} />
                            } else {
                                /*
                                    `else` block is not necessary here because return statement
                                    above would stop the function from completing, but it adds to the readability.
                                */
                                return <SearchResult key={movie.id} movie={movie} hoverState={hoverState} />
                            }
                        })}
                    </FadeIn>


                </div>
            )}
        </div>
    )
}

/* ---------- */

export default SearchResults;
