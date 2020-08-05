import React from 'react';

/* ---------- */
import './styles/searchBar.scss';
/* ---------- */

function SearchBar(props) {
    return (
        <header>
            <form onSubmit={props.onSearch} id="search-form">
                <p>Press ↵Return key to search</p>
                <input type="text" 
                        placeholder="search" 
                        id="search-bar" 
                        onInput={props.onInputChange} 
                        className={props.searchInProcess ? 'searching' : ''}
                        />
            </form>
        </header>  
    )
}

/* ---------- */

export default SearchBar;