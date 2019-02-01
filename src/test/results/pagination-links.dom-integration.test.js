import React from "react";
import { mount } from "enzyme";
import PaginationLinks from "../../components/results/pagination-links";

describe("PaginationLinks", () => {

    let mockOnChangePage = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Given the selectedPage and numberOfPages", () =>{
        it("Should render the Page numbers accordingly", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={10}
                    selectedPage={1} />);

            let paginationText = PaginationLinksWrapper.find('span');

            expect(paginationText.text()).toEqual("Page 2 of 10");
        });
    });

    describe("When results comprises of a single page", () =>{
        it("Pagination should not be displayed", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={1}
                    selectedPage={1} />);


            expect(PaginationLinksWrapper.html()).toBeNull();
        });
    });

    describe("When more than one page available, but user is on first page", () =>{
        it("only 'Next' button should be displayed", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={10}
                    selectedPage={0} />);
            let button = PaginationLinksWrapper.find('.pagination-button');

            expect(button.length).toEqual(1);
            expect(button.props().value).toEqual('Next');
        });
    });

    describe("When more than one page available, but user is on last page", () =>{
        it("only 'Previous' button should be displayed", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={10}
                    selectedPage={9} />);
            let button = PaginationLinksWrapper.find('.pagination-button');

            expect(button.length).toEqual(1);
            expect(button.props().value).toEqual('Previous');
        });
    });

    describe("When clicking on the 'Next' button", () =>{
        it("should trigger the callback passing the next page index", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={10}
                    selectedPage={2} />);

            let buttons = PaginationLinksWrapper.find('.pagination-button');
            buttons.last().simulate('click');
            expect(mockOnChangePage).toHaveBeenCalledWith(3);
        });
    });
    describe("When clicking on the 'Previous' button", () =>{
        it("should trigger the callback passing the previous page index", () =>{
            let PaginationLinksWrapper = mount(
                <PaginationLinks
                    onChangePage={mockOnChangePage}
                    numberOfPages={10}
                    selectedPage={2} />);

            let buttons = PaginationLinksWrapper.find('.pagination-button');
            buttons.first().simulate('click');
            expect(mockOnChangePage).toHaveBeenCalledWith(1);
        });
    });


});