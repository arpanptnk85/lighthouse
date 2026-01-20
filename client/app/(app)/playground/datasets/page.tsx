import { PlaygroundLayout } from "@/components/playground/playground-layout";

export default function PlaygroundDatasetsPage() {
  return (
    <PlaygroundLayout
      breadcrumbs={[
        { label: "Playground", href: "/playground" },
        { label: "Datasets" },
      ]}
      componentType="datasets"
    />
  );
}
