import * as Label from "@radix-ui/react-label";

interface OtherEmailFormProps {
  formData: {
    title: string;
    subject: string;
    body: string;
    footer: string;
  };
  onChange: (field: keyof OtherEmailFormProps["formData"], value: string) => void;
  className?: string;
}

export function OtherEmailForm({ formData, onChange, className }: OtherEmailFormProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <div className="space-y-2">
        <Label.Root htmlFor="title" className="text-sm font-medium">
          Título del correo
        </Label.Root>
        <textarea
          id="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Título del mensaje..."
          rows={6}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      <div className="space-y-2">
        <Label.Root htmlFor="footer" className="text-sm font-medium">
          Pié de página del correo
        </Label.Root>
        <textarea
          id="footer"
          value={formData.footer}
          onChange={(e) => onChange("footer", e.target.value)}
          placeholder="Pié de página del mensaje..."
          rows={6}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
