// select-config-email.tsx
import * as React from "react";

interface SelectConfigEmailProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectConfigEmail({ value, onValueChange }: SelectConfigEmailProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Seleccione una configuración
      </option>
      <option value="change-email">
        Configuraciones del correo electrónico de envío
      </option>
      <option value="change-email-receiver">
        Configuraciones del correo electrónico de recepción
      </option>
      <option value="other-email">
        Configuraciones adicionales del correo
      </option>
    </select>
  );
}
