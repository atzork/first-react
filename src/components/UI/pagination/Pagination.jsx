import React from 'react';
import {usePagination} from "../../../hooks/usePagination";
import classes from "./Pagination.module.css";

const Pagination = ({totalPages, page, setPage}) => {

    const pagesArray = usePagination(totalPages)
    return (
        <div className={classes.paginator}>
            {
                pagesArray.map((number) =>
                    <span
                        key={number}
                        className={`${classes.paginator__item} ${page === number ? classes.active : ''}`}
                        onClick={() => setPage(number)}
                    >{number}</span>
                )
            }
        </div>
    );
};

export default Pagination;