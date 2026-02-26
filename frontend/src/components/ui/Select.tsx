/** Dropdown select with optional label and error message. */

import { cn } from "@/lib/utils";
import { type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "block w-full rounded-lg border border-neutral-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm text-neutral-900 dark:text-white shadow-sm focus:border-neutral-900 dark:focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-primary-500 disabled:bg-neutral-50 dark:disabled:bg-white/[0.02] disabled:text-neutral-500",
          error && "border-danger focus:border-danger focus:ring-danger",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
