const config = require("../../config/index");
const fetchJson = require('fetch-json');
const HackerNewsUrlBuilder = require('./hacker-news-url-builder').HackerNewsUrlBuilder;
let inFlightRequest = new Promise(() => {});
let timeout;

const makeRequest = (searchTerm, pageNumber, resolve, reject) => {

    let requestUrl = new HackerNewsUrlBuilder()
                            .withTag('story')
                            .withSearchTerm(searchTerm)
                            .withPageNumber(pageNumber)
                            .build();
                            
    return fetchJson.get(requestUrl)
        .then((response) => resolve(response))
        .catch(error => {
              reject(error);
            });
};

const cancelPreviousTimedRequest = () => {
    inFlightRequest.then(() => {
        // cancelled: true; ESLint Error
    });
    clearTimeout(timeout);
};

const createNewTimedRequest = (searchTerm, pageNumber) => {
    return new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            makeRequest(searchTerm, pageNumber, resolve, reject);
        }, config.debounceTime);
    });
};

const getResults = (searchTerm, pageNumber) => {
    cancelPreviousTimedRequest();
    inFlightRequest = createNewTimedRequest(searchTerm, pageNumber);
    return inFlightRequest;
};

module.exports = {
    getResults,
    cancelPreviousTimedRequest
};
