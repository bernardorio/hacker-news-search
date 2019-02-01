fetch = require("jest-fetch-mock");
const fts = require("../../components/fts/fts-fetch");
const config = require("../../config/index");
const PAGE_NUMBER = 1;

jest.mock("../../config/index", () => ({
    debounceTime: 300
}));

describe("Fts debounce functionality", () => {

    afterEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();
    });

    describe("getResults", () => {

        it("should debounce when multiple key presses are made within the timeout period", () => {
            jest.useFakeTimers();
            //Note on Jest: do not use async with jest timer mocks

            fetch.mockResponse(JSON.stringify(
                {"hits": [],"page": 0,"nbPages": 50,"query": "foo"}),
                {status: 200});

            fts.getResults("FOO", PAGE_NUMBER);
            fts.getResults("FOOB", PAGE_NUMBER);
            fts.getResults("FOOBA", PAGE_NUMBER);
            jest.runTimersToTime(config.debounceTime);

            expect(fetch).toHaveBeenCalledTimes(1);
        });


    });
});
