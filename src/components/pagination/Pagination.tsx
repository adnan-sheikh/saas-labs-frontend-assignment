import "./styles.css";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const Pagination = ({ total, current, onChange }: PaginationProps) => {
  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="pagination-container">
      <div className="pagination-info">Total {total} items</div>

      <div className="pagination">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="current-page">Page {current}</span>
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { Pagination };
