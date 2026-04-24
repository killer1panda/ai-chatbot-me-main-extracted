'use client'

import * as React from 'react'
 
type Theme = 'light' | 'dark' | 'system'

type Attribute = 'class' | `data-${string}`

export type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: Theme
  enableSystem?: boolean
  enableColorScheme?: boolean
  storageKey?: string
  forcedTheme?: Theme
  disableTransitionOnChange?: boolean
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const THEMES: Array<'light' | 'dark'> = ['light', 'dark']

const getSystemTheme = () =>
  window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light'

const withDisabledTransitions = (enabled: boolean) => {
  if (!enabled) return () => {}

  const style = document.createElement('style')
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
    )
  )

  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    setTimeout(() => {
      document.head.removeChild(style)
    }, 1)
  }
}

const applyTheme = ({
  attribute,
  enableColorScheme,
  theme,
}: {
  attribute: Attribute | Attribute[]
  enableColorScheme: boolean
  theme: 'light' | 'dark'
}) => {
  const root = document.documentElement
  const attrs = Array.isArray(attribute) ? attribute : [attribute]

  attrs.forEach((attr) => {
    if (attr === 'class') {
      root.classList.remove(...THEMES)
      root.classList.add(theme)
      return
    }

    root.setAttribute(attr, theme)
  })

  if (enableColorScheme) {
    root.style.colorScheme = theme
  }
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const {
    attribute = 'class',
    defaultTheme = 'system',
    enableSystem = true,
    enableColorScheme = false,
    storageKey = 'theme',
    forcedTheme,
    disableTransitionOnChange = false,
  } = props

  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    setSystemTheme(getSystemTheme())

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', onChange)

    return () => {
      mediaQuery.removeEventListener('change', onChange)
    }
  }, [])

  React.useEffect(() => {
    if (forcedTheme) {
      setThemeState(forcedTheme)
      return
    }

    try {
      const persisted = localStorage.getItem(storageKey) as Theme | null
      if (persisted) {
        setThemeState(persisted)
      }
    } catch {
      setThemeState(defaultTheme)
    }
  }, [defaultTheme, forcedTheme, storageKey])

  const resolvedTheme: 'light' | 'dark' =
    enableSystem && theme === 'system' ? systemTheme : theme === 'dark' ? 'dark' : 'light'

  React.useEffect(() => {
    const cleanup = withDisabledTransitions(disableTransitionOnChange)

    applyTheme({
      attribute,
      enableColorScheme,
      theme: resolvedTheme,
    })

    cleanup()
  }, [attribute, disableTransitionOnChange, enableColorScheme, resolvedTheme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)

      try {
        localStorage.setItem(storageKey, nextTheme)
      } catch {
        // Ignore storage write failures.
      }
    },
    [storageKey]
  )

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}