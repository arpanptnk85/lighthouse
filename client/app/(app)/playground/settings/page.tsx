import { PlaygroundLayout } from "@/components/playground/playground-layout";

export default function PlaygroundSettingsPage() {
  return (
    <PlaygroundLayout
      breadcrumbs={[
        { label: "Playground", href: "/playground" },
        { label: "Settings" },
      ]}
      componentType="settings"
    />
  );
}
