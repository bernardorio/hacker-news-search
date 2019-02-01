import React from "react";
import { mount } from "enzyme";
import ReactTestUtils from 'react-dom/test-utils';
//fetch = require("jest-fetch-mock");
import App from "../App";
import ftsFetch from '../components/fts/fts-fetch';
const fetchJson = require('fetch-json');

ftsFetch.getResults = jest.fn();
ftsFetch.getResults.mockImplementation(() => {
    return Promise.resolve(
        {"hits": [ { title: 'Foo bar', url:''} ,
                    { title: 'lorem ipsum', url:''}],
         "page": 0,"nbPages": 50,"query": "foo"});
});

describe("App", () => {

    let freeTextSearchInput, freeTextSearchInputText, searchResultsRows, AppWrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        AppWrapper = mount(<App />);
        freeTextSearchInput = () => AppWrapper.find('#fts-input');
        freeTextSearchInputText = () => freeTextSearchInput().props().value;
        searchResultsRows = () => AppWrapper.find('.searchResults');
    });

    afterEach(() =>{
//        ftsFetch.resetMocks();
        jest.clearAllMocks();
    });

    describe("Given the selectedPage and numberOfPages", () =>{
        it("Should render the Page numbers accordingly", async () =>{

            freeTextSearchInput().simulate("change", { target: { value: "Foo" } });
            await ftsFetch.getResults;
            AppWrapper.update();

            expect(searchResultsRows().find('li').length).toBe(2);
            expect(searchResultsRows().find('li').first().text()).toEqual('Foo bar');
            expect(searchResultsRows().find('li').last().text()).toEqual('lorem ipsum');
        });
    });
});