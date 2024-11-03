import React from "react";
import Button from "./Button";

type Pagination = {
  total: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

const Pagination = ({ total, currentPage, onPageChange }: Pagination) => {
  const pages = Math.ceil(total / 20);

  return (
    <div className="pagination my-4">
      <Button
        disabled={currentPage - 1 < 0}
        onClick={() => currentPage - 1 > -1 && onPageChange(currentPage - 1)}
        title='-'
      />
      {[...Array(pages)].map((_, i) => (
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
          title={`${i + 1}`}
        />
      ))}
      <Button
        disabled={currentPage + 1 >= pages}
        onClick={() => currentPage + 1 < pages && onPageChange(currentPage + 1)}
        title='+'
      />
    </div>
  );
};

export default Pagination;
