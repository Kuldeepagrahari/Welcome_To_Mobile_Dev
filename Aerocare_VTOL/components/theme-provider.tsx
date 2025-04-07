"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "system" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const colorScheme = useColorScheme()

  useEffect(() => {
    // You can add any theme-related side effects here
    // For example, you might want to store the theme preference in AsyncStorage
  }, [theme])

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  const { theme, setTheme } = context
  const colorScheme = useColorScheme()
  const resolvedTheme = theme === "system" ? colorScheme || "light" : theme

  return {
    theme,
    setTheme,
    resolvedTheme: resolvedTheme as "dark" | "light",
    isDark: resolvedTheme === "dark",
  }
}

