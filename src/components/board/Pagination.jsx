import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
  const {
    previousLabel,
    nextLabel,
    breakLabel,
    breakClassName,
    pageCount,
    onPageChange,
    containerClassName,
    subContainerClassName,
    activeClassName
  } = props;
  return (
    <ReactPaginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      breakLabel={breakLabel}
      breakClassName={breakClassName}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={containerClassName}
      subContainerClassName={subContainerClassName}
      activeClassName={activeClassName}
    />
  );
};

export default Pagination;