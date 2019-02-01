const config = require("../../config/index");

export class HackerNewsUrlBuilder {

    constructor(){
        this.urlFragments = [];
    }

    withTag(tag) {
        this.urlFragments.push(`tags=${tag}`);
        return this;
    }

    withSearchTerm(searchTerm){
        this.urlFragments.push(`query=${searchTerm}`);
        return this;
    }

    withPageNumber(pageNumer){
        this.urlFragments.push(`page=${pageNumer}`);
        return this;
    }

    build() {
        let concatenatedSearchParams = this.urlFragments.join('&');
        return `${config.searchApiUrl}?${concatenatedSearchParams}`;
    }

}