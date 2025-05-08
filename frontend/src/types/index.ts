export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  language: string;
  components: TemplateComponent[];
  status?: "approved" | "pending" | "rejected" | "ready";
  createdAt: string;
}

export type TemplateCategory =
  | "ACCOUNT_UPDATE"
  | "PAYMENT_UPDATE"
  | "PERSONAL_FINANCE_UPDATE"
  | "SHIPPING_UPDATE"
  | "RESERVATION_UPDATE"
  | "ISSUE_RESOLUTION"
  | "APPOINTMENT_UPDATE"
  | "TRANSPORTATION_UPDATE"
  | "TICKET_UPDATE"
  | "ALERT_UPDATE"
  | "AUTO_REPLY"
  | "MARKETING"
  | "UTILITY"
  | "AUTHENTICATION";

export interface TemplateComponent {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  text?: string;
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
  example?: {
    header_text?: string[];
    body_text?: string[][];
  };
  buttons?: TemplateButton[];
}

export interface TemplateButton {
  type: "URL" | "PHONE_NUMBER" | "QUICK_REPLY";
  text: string;
  url?: string;
  phone_number?: string;
}
