import * as Label from "@radix-ui/react-label";

interface EmailSubjectFormProps {
  subject: string;
  onSubjectChange: (subject: string) => void;
}

export function EmailSubjectForm({ subject, onSubjectChange }: EmailSubjectFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label.Root htmlFor="subject" className="text-sm font-medium">
          Asunto del correo
        </Label.Root>
        <input
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Asunto por defecto"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
