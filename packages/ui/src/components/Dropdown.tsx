"use client";

import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface DropdownOption {
  value: string;
  label: string;
  /** A second line in mono: an id, a model slug. */
  sublabel?: string;
  /** A small tag on the right: a provider, a size. */
  badge?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  /** A small uppercase prefix inside the trigger. */
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Shows a filter box when there are more than five options. */
  searchable?: boolean;
  /** Which edge of the trigger the popover aligns to. */
  align?: "left" | "right";
  className?: string;
}

/** A select with an optional filter, for page sizes, models and modes. */
export function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Select…",
  disabled = false,
  searchable = false,
  align = "left",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    searchInputRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeOption = options.find((o) => o.value === value);
  const displayLabel =
    activeOption?.label || activeOption?.value || placeholder;
  const query = search.trim().toLowerCase();
  const filteredOptions =
    searchable && query
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(query) ||
            o.value.toLowerCase().includes(query) ||
            o.sublabel?.toLowerCase().includes(query),
        )
      : options;

  return (
    <div className={cn("dropdown", className)} ref={containerRef}>
      <button
        type="button"
        className={cn("dropdown__trigger", isOpen && "open")}
        onClick={() => !disabled && setIsOpen((open) => !open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
      >
        {label && <span className="dropdown__label">{label}</span>}
        <span className="dropdown__value">{displayLabel}</span>
        <span
          className={cn("dropdown__arrow", isOpen && "rotated")}
          aria-hidden="true"
        >
          <ChevronDown size={14} />
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            "dropdown__popover",
            align === "right" && "dropdown__popover--right",
          )}
        >
          {searchable && options.length > 5 && (
            <div className="dropdown__search">
              <Search
                size={13}
                className="dropdown__search-icon"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                className="dropdown__search-input"
                placeholder="Filter…"
                aria-label="Filter options"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="dropdown__search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear filter"
                >
                  <X size={11} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          <div className="dropdown__list" role="listbox" id={listId}>
            {filteredOptions.length === 0 ? (
              <div className="dropdown__empty">No options found</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    id={`${listId}-${opt.value}`}
                    type="button"
                    className={cn("dropdown__option", isSelected && "selected")}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    <span className="dropdown__option-main">
                      <span className="dropdown__option-name">{opt.label}</span>
                      {opt.sublabel && (
                        <span className="dropdown__option-id">
                          {opt.sublabel}
                        </span>
                      )}
                    </span>
                    <span className="dropdown__option-meta">
                      {opt.badge && (
                        <span className="dropdown__badge">{opt.badge}</span>
                      )}
                      {isSelected && (
                        <span className="dropdown__check" aria-hidden="true">
                          <Check size={14} />
                        </span>
                      )}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
