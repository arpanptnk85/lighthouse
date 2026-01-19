"use client";

import { useAuthContext } from "@/context/auth-context";
import { SettingsLayout } from "@/components/settings/settings-layout";
import AppLoader from "@/components/app-loader";

export default function SettingsBillingPage() {
  const { hydrated } = useAuthContext();
  const breadcrumbs = [{ label: "Settings", href: "#" }, { label: "Billing" }];

  // Wait for auth hydration first
  if (!hydrated) {
    <AppLoader />
  }

  return (
    <SettingsLayout
      breadcrumbs={breadcrumbs}
      componentType="billing"
    ></SettingsLayout>
  );
}
