import { SourcesLayout } from "@/components/sources/sources-layout";

export default function SourcesCustomAPIPage() {
  return (
    <SourcesLayout
      breadcrumbs={[
        { label: "Sources", href: "/sources" },
        { label: "Cusmtom API" },
      ]}
      componentType="custom"
    />
  );
}