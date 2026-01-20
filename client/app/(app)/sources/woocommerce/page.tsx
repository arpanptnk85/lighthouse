import { SourcesLayout } from "@/components/sources/sources-layout";

export default function SourcesWooCommercePage() {
  return (
    <SourcesLayout
      breadcrumbs={[
        { label: "Sources", href: "/sources" },
        { label: "Woo Commerce" },
      ]}
      componentType="woocommerce"
    />
  );
}