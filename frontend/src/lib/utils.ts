import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (v: string) => void,
) => {
  const input = e.target.value;

  if (input === "") {
    onChange("");
    return;
  }

  if (/^\d+(\.\d*)?$/.test(input)) {
    onChange(input);
  }
};
