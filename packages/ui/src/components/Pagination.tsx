"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Dropdown } from "./Dropdown";

export interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Omit to hide the page-size dropdown. */
  onPageSizeChange?: (pageSize: number) => void;
  pageSizes?: readonly number[];
  /** Replaces the "1–25 of 120" summary. */
  summary?: ReactNode;
  className?: string;
}

const DEFAULT_SIZES = [10, 25, 50] as const;

/** The footer of a paginated table: a summary, a page-size dropdown and page buttons. */
export function Pagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizes = DEFAULT_SIZES,
  summary,
  className,
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  // A window of up to five page numbers centred on the current page.
  const windowStart = Math.max(1, Math.min(page - 2, totalPages - 4));
  const windowEnd = Math.min(windowStart + 4, totalPages);
  const pages = Array.from(
    { length: Math.max(0, windowEnd - windowStart + 1) },
    (_, i) => windowStart + i,
  );

  return (
    <div className={cn("pagination", className)}>
      <span className="pagination__summary">
        {summary ??
          (totalItems === 0 ? "No results" : `${from}–${to} of ${totalItems}`)}
      </span>
      <div className="pagination__controls">
        {onPageSizeChange && (
          <Dropdown
            options={pageSizes.map((size) => ({
              value: String(size),
              label: `${size} rows`,
            }))}
            value={String(pageSize)}
            onChange={(next) => onPageSizeChange(Number(next))}
            align="right"
          />
        )}
        <div className="pagination__pages">
          <PageButton
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            label="First page"
          >
            <ChevronsLeft size={14} aria-hidden="true" />
          </PageButton>
          <PageButton
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            label="Previous page"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </PageButton>
          {pages.map((p) => (
            <PageButton
              key={p}
              onClick={() => onPageChange(p)}
              active={p === page}
              label={`Page ${p}`}
            >
              {p}
            </PageButton>
          ))}
          <PageButton
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            label="Next page"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </PageButton>
          <PageButton
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            label="Last page"
          >
            <ChevronsRight size={14} aria-hidden="true" />
          </PageButton>
        </div>
      </div>
    </div>
  );
}

function PageButton({
  onClick,
  disabled = false,
  active = false,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn("pagination__btn", active && "active")}
    >
      {children}
    </button>
  );
}
