import { ChangeEmailForm } from "./change-email-form";
import { ChangeEmailReceiverForm } from "./change-email-receiver-form";
import { OtherEmailForm } from "./other-email-form";

interface FormData {
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

interface EmailConfigFormProps {
  selectedOption: string;
  formData: FormData;
  onFormDataChange: (newData: FormData) => void;
}

export function EmailConfigForm({ selectedOption, formData, onFormDataChange }: EmailConfigFormProps) {
  const updateFormData = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  switch (selectedOption) {
    case "change-email":
      return (
        <ChangeEmailForm
          formData={{
            email: formData.email || "",
            clientId: formData.clientId || "",
            clientSecret: formData.clientSecret || "",
            refreshToken: formData.refreshToken || ""
          }}
          onChange={(field, value) =>
            onFormDataChange({ ...formData, [field]: value })
          }
        />
      );

    case "change-email-receiver":
      return (
        <ChangeEmailReceiverForm
          emailReceiver={formData.emailReceiver || ""}
          onEmailReceiverChange={(value) => updateFormData("emailReceiver", value)}
        />
      );

    case "other-email":
      return (
        <OtherEmailForm 
          formData={{
            title: formData.title || "",
            subject: formData.subject || "",
            body: formData.body || "",
            footer: formData.footer || ""
          }}
          onChange={(field, value) =>
            onFormDataChange({ ...formData, [field]: value })
          }
        />
      );

    default:
      return (
        <></>
      );
  }
}