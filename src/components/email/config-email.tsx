"use client";

import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { SelectConfigEmail } from "./select-config-email";
import { EmailConfigForm } from "./email-config-form";

export interface FormData {
  email?: string;
  emailReceiver?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
  title?: string;
  subject?: string;
  body?: string;
  footer?: string;
}

export function ConfigEmail() {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Obtener la última config al montar
  useEffect(() => {
    const fetchLastConfig = async () => {
      try {
        const res = await fetch("http://172.16.90.148:8086/email/getLastConfig");
        if (!res.ok) throw new Error("Error al obtener configuración");

        const data = await res.json();

        setFormData({
          email: data.emailConfig ?? "",
          emailReceiver: data.emailReception ?? "",
          clientId: data.clientId ?? "",
          clientSecret: data.clientSecret ?? "",
          refreshToken: data.refreshToken ?? "",
          title: data.title ?? "",
          subject: data.subject ?? "",
          body: data.body ?? "",
          footer: data.footer ?? "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload: Partial<FormData> = {};

      switch (selectedOption) {
        case "change-email":
          payload = {
            email: formData.email,
            clientId: formData.clientId,
            clientSecret: formData.clientSecret,
            refreshToken: formData.refreshToken,
          };
          break;

        case "change-email-receiver":
          payload = { emailReceiver: formData.emailReceiver };
          break;

        case "other-email":
          payload = {
            title: formData.title,
            subject: formData.subject,
            body: formData.body,
            footer: formData.footer,
          };
          break;

        default:
          console.warn("No se seleccionó ninguna opción válida");
          return;
      }

      console.log("Payload a enviar:", payload);

      const res = await fetch("http://172.16.90.148:8086/email/updateConfigEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al actualizar configuración");

      alert("Configuración actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar configuración:", error);
      alert("Error al actualizar la configuración");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-center py-8">Cargando configuración...</p>;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Configuración de Correo Electrónico</h2>
      </div>

      {/* Card Content */}
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label.Root htmlFor="config-select" className="text-sm font-medium">
              Tipo de configuración
            </Label.Root>
            <SelectConfigEmail
              value={selectedOption}
              onValueChange={setSelectedOption}
            />
          </div>

          <EmailConfigForm
            selectedOption={selectedOption}
            formData={formData}
            onFormDataChange={setFormData}
          />

          {selectedOption && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium 
                         hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
