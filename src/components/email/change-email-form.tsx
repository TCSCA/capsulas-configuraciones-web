import * as Label from "@radix-ui/react-label";

interface ChangeEmailFormProps {
  formData: {
    email: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
  onChange: (field: keyof ChangeEmailFormProps["formData"], value: string) => void;
  className?: string;
}

export function ChangeEmailForm({ formData, onChange, className }: ChangeEmailFormProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <div className="space-y-2">
        <Label.Root htmlFor="email" className="text-sm font-medium text-foreground">
          Nuevo correo electrónico
        </Label.Root>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="nuevo@ejemplo.com"
          required
          className="mt-1 w-full rounded-md border border-border bg-input text-foreground 
                     placeholder:text-muted px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label.Root htmlFor="clientId" className="text-sm font-medium text-foreground">
          Client ID
        </Label.Root>
        <input
          id="clientId"
          value={formData.clientId}
          onChange={(e) => onChange("clientId", e.target.value)}
          required
          className="w-full rounded-md border border-border bg-input text-foreground 
                     placeholder:text-muted px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label.Root htmlFor="clientSecret" className="text-sm font-medium text-foreground">
          Client Secret
        </Label.Root>
        <input
          id="clientSecret"
          value={formData.clientSecret}
          onChange={(e) => onChange("clientSecret", e.target.value)}
          required
          className="w-full rounded-md border border-border bg-input text-foreground 
                     placeholder:text-muted px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label.Root htmlFor="refreshToken" className="text-sm font-medium text-foreground">
          Refresh Token
        </Label.Root>
        <input
          id="refreshToken"
          value={formData.refreshToken}
          onChange={(e) => onChange("refreshToken", e.target.value)}
          required
          className="w-full rounded-md border border-border bg-input text-foreground 
                     placeholder:text-muted px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
