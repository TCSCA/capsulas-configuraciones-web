"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Mode = "light" | "dark";

interface Palette {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

interface AppearanceContextType {
  mode: Mode;
  palette: Palette;
  fontFamily: string;                  // <-- AGREGADO
  toggleMode: () => void;
  updateColor: (key: keyof Palette, value: string) => void;
  setFontFamily: (font: string) => void; // <-- AGREGADO
}

const defaultPalette: Record<Mode, Palette> = {
  light: {
    background: "#ffffff",
    text: "#111111",
    primary: "#2563eb",
    secondary: "#6b7280",
  },
  dark: {
    background: "#111111",
    text: "#f5f5f5",
    primary: "#3b82f6",
    secondary: "#9ca3af",
  },
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");
  const [palette, setPalette] = useState<Palette>(defaultPalette.light);
  const [fontFamily, setFontFamily] = useState<string>("Arial, Helvetica, sans-serif"); // valor por defecto

  // Leer del localStorage al inicio
  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as Mode | null;
    const savedPalette = localStorage.getItem("palette");
    const savedFont = localStorage.getItem("fontFamily");

    if (savedMode) {
      setMode(savedMode);
      setPalette(defaultPalette[savedMode]);
    }
    if (savedPalette) {
      setPalette(JSON.parse(savedPalette));
    }
    if (savedFont) {
      setFontFamily(savedFont);
    }
  }, []);

  // Guardar en localStorage y aplicar al root
  useEffect(() => {
    localStorage.setItem("mode", mode);
    localStorage.setItem("palette", JSON.stringify(palette));
    localStorage.setItem("fontFamily", fontFamily);

    document.documentElement.style.setProperty("--bg-color", palette.background);
    document.documentElement.style.setProperty("--text-color", palette.text);
    document.documentElement.style.setProperty("--primary-color", palette.primary);
    document.documentElement.style.setProperty("--secondary-color", palette.secondary);
    document.documentElement.style.setProperty("--font-base", fontFamily);
  }, [mode, palette, fontFamily]);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setPalette(defaultPalette[newMode]);
  };

  const updateColor = (key: keyof Palette, value: string) => {
    setPalette((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppearanceContext.Provider
      value={{ mode, palette, fontFamily, toggleMode, updateColor, setFontFamily }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance debe usarse dentro de AppearanceProvider");
  }
  return context;
}
