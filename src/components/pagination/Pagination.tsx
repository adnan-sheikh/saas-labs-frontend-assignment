import "./styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

const Pagination = ({ total, current, onChange }: PaginationProps) => {
  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);
  const startRange = (current - 1) * pageSize + 1;
  const endRange = Math.min(current * pageSize, total);

  return (
    <div
      className="pagination-container"
      role="navigation"
      aria-label="Pagination"
    >
      <div className="pagination-info" aria-live="polite">
        Showing {startRange} - {endRange} of {total} projects
      </div>
      <div className="pagination">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className="pagination-button"
          aria-label="Go to previous page"
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <div className="current-page" aria-current="page">
          Page <span className="page-number">{current}</span> of {totalPages}
        </div>
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
          className="pagination-button"
          aria-label="Go to next page"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export { Pagination };
