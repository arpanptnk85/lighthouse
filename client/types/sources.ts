export type SchemaEditorProps = {
  value: object;
  onChange: (schema: object) => void;
  error?: string;
};

export type CustomAPISource = {
  id: number;
  name: string;
  base_url: string;
  auth_type: "none" | "api_key";
  schema: object;
  last_synced_at: string | null;
  created_at: string;
  sync_interval_minutes?: number | null;
};

export type AuthType = "none" | "api_key" | "bearer" | "basic" | "oauth2";

export type IntegrationType = "custom_api" | "shopify" | "woocommerce" | "webhook";

export const INTEGRATION_LABELS: Record<IntegrationType, string> = {
  custom_api: 'Custom API',
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  webhook: 'Webhook',
} as const;