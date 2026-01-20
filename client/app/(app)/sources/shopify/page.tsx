import { SourcesLayout } from "@/components/sources/sources-layout";

export default function SourcesShopifyPage() {
  return (
    <SourcesLayout
      breadcrumbs={[
        { label: "Sources", href: "/sources" },
        { label: "Shopify" },
      ]}
      componentType="shopify"
    />
  );
}