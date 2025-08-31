import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="pagination">
      <button disabled={!canPrev} onClick={() => onChange(page - 1)}>
        ◀ Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button disabled={!canNext} onClick={() => onChange(page + 1)}>
        Next ▶
      </button>
    </div>
  );
}