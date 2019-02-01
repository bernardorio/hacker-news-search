import React from "react";
import PropTypes from "prop-types";

const ActionButton = props => {
    let actionButton = null;

    if(props.targetPage >= 0 && props.targetPage <= props.numberOfPages){
        actionButton = <input className="pagination-button" value={props.label} type="button" onClick={() => props.action(props.targetPage)}/>
    }

    return (
        actionButton
    )
}

const PaginationLinks = props => {
    let pagination = null;

    if(props.numberOfPages > 1 ){
        pagination =
        <section className="pagination-links">
             <ActionButton
                 label="Previous"
                 action={props.onChangePage}
                 numberOfPages={props.numberOfPages}
                 targetPage={props.selectedPage-1}/>

             <span>Page {props.selectedPage+1} of {props.numberOfPages}</span>

             <ActionButton
                 label="Next"
                 action={props.onChangePage}
                 numberOfPages={props.numberOfPages-1}
                 targetPage={props.selectedPage+1}/>
         </section>
    }

    return(
        pagination
    );

}

PaginationLinks.propTypes = {
    onChangePage: PropTypes.func.isRequired,
    numberOfPages: PropTypes.number,
    selectedPage: PropTypes.number
};

export default PaginationLinks;