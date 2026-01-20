import { PlaygroundLayout } from "@/components/playground/playground-layout";

export default function PlaygroundInsightsPage() {
  return (
    <PlaygroundLayout
      breadcrumbs={[
        { label: "Playground", href: "/playground" },
        { label: "Insights" },
      ]}
      componentType="insights"
    />
  );
}
