import * as Label from "@radix-ui/react-label";
import { useState, useEffect } from "react";

interface OtherEmailFormProps {
  formData: {
    title: string;
    subject: string;
    body: string;
    footer: string;
    logoEmail?: File | null;
  };
  onChange: (field: keyof OtherEmailFormProps["formData"], value: string | File | null) => void;
  className?: string;
}

export function OtherEmailForm({ formData, onChange, className }: OtherEmailFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Actualiza preview si el archivo cambia desde el padre
  useEffect(() => {
    if (!formData.logoEmail) {
      setLogoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.logoEmail);
    setLogoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.logoEmail]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange("logoEmail", file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);
    } else {
      setLogoPreview(null);
    }
  };

  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {/* Título */}
      <div className="space-y-2">
        <Label.Root htmlFor="title" className="text-sm font-medium">
          Título del correo
        </Label.Root>
        <textarea
          id="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Título del mensaje..."
          rows={2}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Asunto */}
      <div className="space-y-2">
        <Label.Root htmlFor="subject" className="text-sm font-medium">
          Asunto del correo
        </Label.Root>
        <input
          id="subject"
          value={formData.subject}
          onChange={(e) => onChange("subject", e.target.value)}
          placeholder="Asunto por defecto"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cuerpo */}
      <div className="space-y-2">
        <Label.Root htmlFor="body" className="text-sm font-medium">
          Cuerpo del correo
        </Label.Root>
        <textarea
          id="body"
          value={formData.body}
          onChange={(e) => onChange("body", e.target.value)}
          placeholder="Cuerpo del mensaje..."
          rows={6}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pie de página */}
      <div className="space-y-2">
        <Label.Root htmlFor="footer" className="text-sm font-medium">
          Pié de página del correo
        </Label.Root>
        <textarea
          id="footer"
          value={formData.footer}
          onChange={(e) => onChange("footer", e.target.value)}
          placeholder="Pié de página del mensaje..."
          rows={2}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <Label.Root htmlFor="logoEmail" className="text-sm font-medium">
          Logo del correo
        </Label.Root>
        <input
          id="logoEmail"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.logoEmail && (
          <p className="text-sm text-gray-600 mt-1">Archivo seleccionado: {formData.logoEmail.name}</p>
        )}
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Preview del logo"
            className="mt-2 h-24 w-auto border rounded"
          />
        )}
      </div>
    </div>
  );
}
