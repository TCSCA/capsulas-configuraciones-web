"use client";

import { useAppearance } from "@/context/appearance-context";
import fileToBase64 from "@/core/utils/file-to-base64";
import { useState } from "react";

const colorKeys: { key: "background" | "text" | "primary" | "secondary"; label: string }[] = [
  { key: "background", label: "Fondo" },
  { key: "text", label: "Texto" },
  { key: "primary", label: "Primario" },
  { key: "secondary", label: "Secundario" },
];

const fonts = [
  { name: "Sans (Default)", value: "Arial, Helvetica, sans-serif" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Monospace", value: "Courier New, monospace" },
];

export function ConfigAppearance() {
  const { mode, palette, toggleMode, updateColor, fontFamily, setFontFamily } = useAppearance();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSavingLogo, setIsSavingLogo] = useState(false);

  // Manejar selección de archivo y preview
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  // Guardar logo en la API
  const handleSaveLogo = async () => {
    if (!logoFile) return;
    setIsSavingLogo(true);

    try {
      const logoBase64 = await fileToBase64(logoFile);

      const res = await fetch("http://172.16.90.112:8086/api/updateConfig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logo: logoBase64 }),
      });

      if (!res.ok) throw new Error("Error al guardar logo");
      alert("Logo guardado correctamente!");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el logo");
    } finally {
      setIsSavingLogo(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm w-full">
      {/* Header */}
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Configuración de Apariencia</h2>
        <div className="flex items-center gap-2">
          <span>🌞</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={mode === "dark"}
              onChange={toggleMode}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div
              className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                         transition-transform peer-checked:translate-x-5"
            ></div>
          </label>
          <span>🌙</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-6 py-4 space-y-6">
        {/* Selector de Colores */}
        {colorKeys.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-28">{label}:</label>
            <input
              type="color"
              value={palette[key]}
              onChange={(e) => updateColor(key, e.target.value)}
              className="w-12 h-8 border rounded"
            />
            <span className="text-sm text-gray-600">{palette[key]}</span>
          </div>
        ))}

        {/* Selector de Fuentes */}
        <div>
          <p className="font-medium mb-2">Fuente del Texto</p>
          <div className="flex flex-col gap-2">
            {fonts.map((f) => (
              <button
                key={f.value}
                className={`px-3 py-2 rounded border ${
                  fontFamily === f.value ? "bg-blue-100 border-blue-500" : "bg-gray-50"
                }`}
                style={{ fontFamily: f.value }}
                onClick={() => setFontFamily(f.value)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="space-y-2">
          <p className="font-medium mb-2">Logo de la página</p>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="border rounded px-3 py-1"
            />
            <button
              onClick={handleSaveLogo}
              disabled={!logoFile || isSavingLogo}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSavingLogo ? "Guardando..." : "Guardar"}
            </button>
          </div>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Preview del logo"
              className="mt-2 h-24 w-auto border rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
}
