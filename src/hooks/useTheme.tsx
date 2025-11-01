import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    return storedTheme || "light";
  });

  useEffect(() => {
    // بنضيف الكلاس المناسب على الـ html 
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);

    // نحفظ آخر اختيار في localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
   console.warn("useTheme must  used inside a ThemeProvider");

    
    return {
      theme: "light" as Theme,
      switchTheme: () => {},
    };
  }

  return context;
}
