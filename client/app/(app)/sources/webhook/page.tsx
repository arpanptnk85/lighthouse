import { SourcesLayout } from "@/components/sources/sources-layout";

export default function SourcesWebhookPage() {
  return (
    <SourcesLayout
      breadcrumbs={[
        { label: "Sources", href: "/sources" },
        { label: "Webhook" },
      ]}
      componentType="webhook"
    />
  );
}