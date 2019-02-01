const HackerNewsUrlBuilder = require('../../components/fts/hacker-news-url-builder').HackerNewsUrlBuilder;

describe('HackerNewsUrlBuilder', () => {

    describe('When builder methods are invoked', () =>{

        it('builds expected api url', () => {
            let requestUrl = new HackerNewsUrlBuilder()
                            .withTag('story')
                            .withSearchTerm("foobar")
                            .withPageNumber(2)
                            .build();

            expect(requestUrl).toBe("https://hn.algolia.com/api/v1/search?tags=story&query=foobar&page=2");
        });
    })


});
