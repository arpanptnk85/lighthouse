import { PlaygroundLayout } from "@/components/playground/playground-layout";

export default function PlaygroundHistoryPage() {
  return (
    <PlaygroundLayout
      breadcrumbs={[
        { label: "Playground", href: "/playground" },
        { label: "Starred" },
      ]}
      componentType="starred"
    />
  );
}
