import React, { Component } from 'react';
import FreeTextSearch from './components/fts/free-text-search';
import SearchResults from './components/results/search-results';
import PaginationLinks from './components/results/pagination-links';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.onRetrieveResults = this.onRetrieveResults.bind(this);
        this.onChangePage = this.onChangePage.bind(this);

        this.state = {
            results:[],
            noPages: 0,
            selectedPage: 0
        }
    }

    onRetrieveResults(response) {
        this.setState({
            results: response.hits,
            noPages: response.nbPages,
            selectedPage: response.page
        });
    }

    onChangePage(pageNum) {
        this.setState({
            selectedPage: pageNum
        });
    }

    render() {
        return (
            <div className="main">
                <header className="pageHeader">
                    <img alt="hacker-news-logo" src={require('./hackernews.png')}/>
                    <span className="title">
                        Hacker News
                        Search
                    </span>
                </header>
                <div className="container">
                    <section className="searchHeader">
                        <span>Search articles on Hacker News</span>
                        <FreeTextSearch onRetrieveResults={this.onRetrieveResults} selectedPage={this.state.selectedPage}/>
                    </section>
                    <section className="main-results">
                        <SearchResults className="search-results" results={this.state.results}/>
                        <PaginationLinks
                            numberOfPages={this.state.noPages}
                            selectedPage={this.state.selectedPage}
                            onChangePage={this.onChangePage} />
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
