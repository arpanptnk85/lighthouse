"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-context";

type Organization = {
  id: string;
  name: string;
  role: string;
  is_current: boolean;
};

export function useOrganizations() {
  const { organizationId, ensureValidAccessToken } = useAuthContext();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const token = await ensureValidAccessToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/organizations/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setOrgs(data.organizations);
      setLoading(false);
    }

    load();
  }, [organizationId]); // 🔴 CRITICAL DEPENDENCY

  return { orgs, loading };
}
