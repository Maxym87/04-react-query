import styles from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({ total, page, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
}
