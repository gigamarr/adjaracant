import React, { Component } from 'react';
import SearchBar from 'components/search/searchBar';
import SearchResults from 'components/search/searchResults';
import adjaranetService from 'services/adjaranetService';

/* ---------- */
import './styles/home.scss';
/* ---------- */

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            results: [],
            searchInProcess: false
        }
    }

    setQuery = (event) => {
        this.setState({
            input: event.target.value,
        })
    }

    clearSearchResults = () => {
        this.setState({
            results: []
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="website-logo">
                    <img src="logo.svg" alt="logo" />
                </div>

                <SearchBar  onInputChange={this.setQuery} 
                            onSearch={this.search} 
                            searchInProcess={this.state.searchInProcess} 
                />
                <SearchResults movies={this.state.results} onClear={this.clearSearchResults} />
            </React.Fragment>
        )
    }

    search = (event) => {
        event.preventDefault()

        // for fade-in effect the list needs to be cleared first
        this.clearSearchResults();

        const query = this.state.input.toLowerCase()

        if (query !== '') {
            this.setState({
                searchInProcess: true
            })
    
            adjaranetService.search(query)
            .then(response => {
                const results = response.data.data.filter(movie => {
                    return this.filterMovie(movie, query)
                })
    
                this.setState({
                    input: '',
                    results: results, // or just {results}, shorthand for when key and value are same
                    searchInProcess: false
                })
                
                this.resetSearchForm()
                
            })
        }
    }

    filterMovie(movie, query) {
        const { originalName, primaryName, secondaryName, tertiaryName } = movie
        const arrayWithNames = [originalName, primaryName, secondaryName, tertiaryName].filter(name => name.length !== 0)

        for (let movieName of arrayWithNames) {
            if (movieName.toLowerCase().includes(query) && movie.type !== "person" && movie.adjaraId) {
                movie.name = movieName
                return movie
            }
        }
    }

    resetSearchForm = () => {
        const form = document.getElementById("search-form")
        form.reset()
    }
}

/* ---------- */

export default Home;