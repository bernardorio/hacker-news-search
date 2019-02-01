import React from "react";

const SearchResults = props => {

    let resultItems = props.results.map(function(result, index) {
        return (
            <li key={index}><a href={result.url}>{result.title}</a></li>
        );
    }, this);

    return(
        <ul className="searchResults">
           {resultItems}
        </ul>
    );

}
export default SearchResults;