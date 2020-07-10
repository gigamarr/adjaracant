import React from 'react';

/* ---------- */
import './searchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
/* ---------- */

function SearchBar(props) {
    return (
        <header>
            <form onSubmit={props.onSearch} id="search-form">
                <p>Press ↵Return key or click the icon to search</p>
                <input type="text" placeholder="Give me a movie name..." id="search-bar" onInput={props.onInputChange} />

                <label htmlFor="search-bar"
                        className={props.searchInProcess ? 'searching' : props.searchCompleted ?  'completed' : ''}
                        onClick={props.onSearch}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </label>
            </form>
        </header>  
    )
}

/* ---------- */

export default SearchBar;