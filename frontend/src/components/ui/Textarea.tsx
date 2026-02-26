/** Multi-line text input with optional label and error message. */

import { cn } from "@/lib/utils";
import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "block w-full rounded-lg border border-neutral-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm text-neutral-900 dark:text-white shadow-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-900 dark:focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-primary-500 disabled:bg-neutral-50 dark:disabled:bg-white/[0.02] disabled:text-neutral-500",
          error && "border-danger focus:border-danger focus:ring-danger",
          className,
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
