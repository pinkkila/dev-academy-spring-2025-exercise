import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleNumericInput(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (v: string) => void,
) {
  const input = e.target.value;
  if (input === "") {
    onChange("");
    return;
  }
  if (/^\d+(\.\d*)?$/.test(input)) {
    onChange(input);
  }
}

// ─────────────────────────────
// Formatters
// ─────────────────────────────

// Formats a Date → "31.12.2020" (Finnish locale)
export const finnishDateFormatter = new Intl.DateTimeFormat("fi-FI");

// Formats a Date → "YYYY-MM-DD"
export function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Formats an ISO string → "HH:MM" (24-hour clock)
export const formatHour = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// Formats an ISO string → "D.M.YYYY HH:MM"
export const formatFullDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

// Formats a number → "0.00"
export const formatPrice = (value: number): string => value.toFixed(2);

// ─────────────────────────────
// Zod Schemas
// ─────────────────────────────

function createBaseNumericString(maxAllowed: number) {
  return z
    .string()
    .refine((val) => val === "" || /^\d+(\.\d+)?$/.test(val), {
      message: "Only positive numbers and decimals allowed",
    })
    .refine((val) => val === "" || parseFloat(val) <= maxAllowed, {
      message: `Must be less or equal than ${maxAllowed}.`,
    });
}

export function createMinSchema<const TField extends string>(
  fieldName: TField,
  maxValue: number | null,
  maxAllowed: number,
) {
  return z.object({
    [fieldName]: createBaseNumericString(maxAllowed).refine(
      (val) => {
        if (val === "" || maxValue == null) return true;
        return parseFloat(val) < maxValue;
      },
      { message: "Minimum value must be smaller than maximum value" },
    ),
  }) as z.ZodObject<{ [K in TField]: z.ZodString }>;
}

export function createMaxSchema<const TField extends string>(
  fieldName: TField,
  minValue: number | null,
  maxAllowed: number,
) {
  return z.object({
    [fieldName]: createBaseNumericString(maxAllowed).refine(
      (val) => {
        if (val === "" || minValue == null) return true;
        return parseFloat(val) > minValue;
      },
      { message: "Maximum value must be bigger than minimum value" },
    ),
  }) as z.ZodObject<{ [K in TField]: z.ZodString }>;
}

// export function createNumericFieldFormSchema<const TField extends string>(
//   maxAllowed: number,
//   minValue: number | null,
//   maxValue: number | null,
//   minFieldName: TField,
//   maxFieldName: TField,
// ) {
//   return z.object({
//     [minFieldName]: createBaseNumericString(maxAllowed).refine(
//       (val) => {
//         if (val === "" || maxValue == null) return true;
//         return parseFloat(val) < maxValue;
//       },
//       { message: "Minimum value must be smaller than maximum value" },
//     ),
//     [maxFieldName]: createBaseNumericString(maxAllowed).refine(
//       (val) => {
//         if (val === "" || minValue == null) return true;
//         return parseFloat(val) > minValue;
//       },
//       { message: "Maximum value must be bigger than minimum value" },
//     ),
//   }) as z.ZodObject<{ [K in TField]: z.ZodString }>;
// }

export function createNumericFieldFormSchema<TField extends string>(
  fieldName: TField,
  maxAllowed: number,
  otherValue: number | null,
  mode: "min" | "max",
) {
  return z.object({
    [fieldName]: createBaseNumericString(maxAllowed).refine(
      (val) => {
        if (val === "" || otherValue == null) return true;
        const num = parseFloat(val);
        return mode === "min" ? num < otherValue : num > otherValue;
      },
      {
        message:
          mode === "min"
            ? "Minimum value must be smaller than maximum value"
            : "Maximum value must be bigger than minimum value",
      },
    ),
  }) as z.ZodObject<{ [K in TField]: z.ZodString }>;
}
