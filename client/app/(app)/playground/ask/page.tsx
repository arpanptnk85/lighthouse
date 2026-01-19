import { PlaygroundLayout } from "@/components/playground/playground-layout";

export default function PlaygroundHistoryPage() {
  return (
    <PlaygroundLayout
      breadcrumbs={[
        { label: "Playground", href: "/playground" },
        { label: "Ask" },
      ]}
      componentType="ask"
    />
  );
}
