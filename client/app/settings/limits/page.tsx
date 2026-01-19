"use client";

import { SettingsLayout } from "@/components/settings/settings-layout";

export default function SettingsLimitsPage() {
  const breadcrumbs = [
    { label: "Settings", href: "#" },
    { label: "Usage & Limits" },
  ];

  return (
    <SettingsLayout
      breadcrumbs={breadcrumbs}
      componentType="limits"
    ></SettingsLayout>
  );
}
