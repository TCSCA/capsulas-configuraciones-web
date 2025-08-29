import * as Label from "@radix-ui/react-label";

interface ChangeEmailReceiverFormProps {
  emailReceiver: string;
  onEmailReceiverChange: (email: string) => void;
  className?: string;
}

export function ChangeEmailReceiverForm({
  emailReceiver,
  onEmailReceiverChange,
  className,
}: ChangeEmailReceiverFormProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <div className="space-y-2">
        <Label.Root htmlFor="emailReceiver" className="text-sm font-medium">
          Nuevo correo electrónico de recepción
        </Label.Root>
        <input
          id="emailReceiver"
          type="email"
          value={emailReceiver}
          onChange={(e) => onEmailReceiverChange(e.target.value)}
          placeholder="nuevo@ejemplo.com"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
