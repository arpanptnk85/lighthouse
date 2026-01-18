import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import { getAccessToken, storeTokens } from "@/lib/auth/auth-storage";
import {
  getOrgCandidates,
  clearOrgCandidates,
  OrgCandidate,
} from "@/lib/auth/org-storage";
import { selectOrganizationRequest } from "@/lib/auth/org-service";

export function useOrgSelection() {
  const router = useRouter();
  const authContext = useAuthContext();
  const [orgs, setOrgs] = useState<OrgCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Load org candidates on mount
  useEffect(() => {
    const candidates = getOrgCandidates();

    if (candidates) {
      setOrgs(candidates);
    }
  }, [router]);

  async function selectOrganization(orgId: string) {
    const token = getAccessToken();
    if (!token) {
      router.replace("/auth");
      return;
    }

    setLoading(true);
    setSelectedId(orgId);

    try {
      const data = await selectOrganizationRequest(orgId, token);

      // 🔴 MUST include refresh
      storeTokens(data.access, data.refresh);
      clearOrgCandidates();

      authContext.refreshFromStorage();

      // ✅ hydrate ONCE
      await authContext.hydrateFromServer();

      router.push("/dashboard");
    } catch (err) {
      console.error("Organization selection failed", err);
      setLoading(false);
      setSelectedId(null);
    }
  }

  async function switchOrganization(orgId: string) {
    const token = getAccessToken();
    if (!token) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/switch-organization/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ organization_id: orgId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail);

    storeTokens(data.access, data.refresh);
    await authContext.hydrateFromServer();
  }

  return {
    orgs,
    loading,
    selectedId,
    selectOrganization,
    switchOrganization,
  };
}
