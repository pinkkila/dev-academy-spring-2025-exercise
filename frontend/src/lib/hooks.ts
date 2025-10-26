import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/theme-context.ts";
import { DSParamsContext } from "@/contexts/ds-params-context.ts";

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context)
    throw new Error("useTheme must be used within a ThemeContextProvider")

  return context
}

export function useDSParams() {
  const context = useContext(DSParamsContext)

  if (!context)
    throw new Error("useDSParams must be used within a DSParamsContextProvider")

  return context
}

export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId)
  }, [value, delay]);

  return debouncedValue;
}