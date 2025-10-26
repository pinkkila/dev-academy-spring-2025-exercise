import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme-context.ts";
import { DSParamsContext } from "@/contexts/ds-params-context.ts";

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context)
    throw new Error("useTheme must be used within a ThemeContextProvider")

  return context
}

export const useDSParams = () => {
  const context = useContext(DSParamsContext)

  if (!context)
    throw new Error("useDSParams must be used within a DSParamsContextProvider")

  return context
}