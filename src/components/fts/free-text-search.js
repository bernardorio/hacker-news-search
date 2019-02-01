import React, { Component } from 'react';
import ftsFetch from './fts-fetch';
import PropTypes from "prop-types";

const config = require("../../config/index");
const FIRST_PAGE = 0;

const hasReachedMinNoOfCharacters = locationName => {
    return locationName && locationName.length >= config.minimumNumberOfSearchCharacters;
};

class FreeTextSearch extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchTerm: '',
            loadingResults: false,
            results: []
        }
    }

    updateResultsIfPaginationInvoked(prevProps){
      if (this.state.searchTerm && this.props.selectedPage !== prevProps.selectedPage) {
          this.setState({loadingResults: true});
          this.makeRequestAndUpdateResults(this.state.searchTerm, this.props.selectedPage);
      }
    }

    componentDidUpdate(prevProps) {
        this.updateResultsIfPaginationInvoked(prevProps);
    }

    makeRequestAndUpdateResults(searchTerm, selectedPage) {
        ftsFetch
            .getResults(searchTerm, selectedPage)
            .then(response => {
                    this.setState({
                        loadingResults: false
                    });
                    this.props.onRetrieveResults(response);
            })
            .catch(err => {
                this.setState({
                    loadingResults: false,
                    error: err
                });
            });
    }

    handleInputChange(event) {
        let searchTerm = event.target.value;
        if (hasReachedMinNoOfCharacters(searchTerm)) {
            this.setState({
                loadingResults: true,
                searchTerm: searchTerm
             });
             //resets page to 0, since input has changed
            this.makeRequestAndUpdateResults(searchTerm, FIRST_PAGE);
        } else {
            ftsFetch.cancelPreviousTimedRequest();
            this.setState({
                searchTerm: '',
                loadingResults: false,
                results: []
            });
            this.props.onRetrieveResults({ hits: [], nbPages: 0});
        }
    }

    render() {
        let loadingSpinner = null;

        if (this.state.loadingResults) {
            loadingSpinner = (
                <img alt="loading-spinner" src={require('../../spinner.gif')} className="loading-spinner" />
            );
        }

        return(
            <div className="fts-input-container">
                {loadingSpinner}
                <input
                    autoComplete="off"
                    className="fts-input"
                    id="fts-input"
                    type="text"
                    placeholder="Please type in anything"
                    onChange={this.handleInputChange}
                    autoFocus={true}
                />

            </div>
        )
  }
}

FreeTextSearch.propTypes = {
    selectedPage: PropTypes.number,
    onRetrieveResults: PropTypes.func
};

export default FreeTextSearch;