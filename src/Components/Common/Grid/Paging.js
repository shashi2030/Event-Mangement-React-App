import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const Paging = (props) => {
    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink previous disabled={props.previousDisable} onClick={props.prevClick} />
            </PaginationItem>
            {props.data}
            <PaginationItem>
                <PaginationLink next disabled={props.nextDisable} onClick={props.nextClick} />
            </PaginationItem>
        </Pagination>
    )
}