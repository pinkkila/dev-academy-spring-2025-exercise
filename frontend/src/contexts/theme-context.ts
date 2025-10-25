import { createContext } from "react";
import type { Theme } from "@/lib/types.ts";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => null,
})