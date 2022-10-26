import React from "react";
import { Pagination } from "react-bootstrap";

export const PaginationBar = ({ prev, next, pageNo, pages, changePage }) => {
  return (
    <div aria-label="Pagination">
      <hr className="my-0" />

      <Pagination className="justify-content-center my-4">
        <Pagination.Prev onClick={prev} />

        {pages?.map((index) => (
          <Pagination.Item
            key={index}
            onClick={() => changePage(index)}
            active={index === pageNo}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={next} />
      </Pagination>
    </div>
  );
};
