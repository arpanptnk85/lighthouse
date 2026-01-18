import { useState } from "react";
import { useRouter } from "next/navigation";

import { getAccessToken, storeTokens } from "@/lib/auth/auth-storage";
import { createOrganizationRequest } from "@/lib/auth/org-service";
import { useAuthContext } from "@/context/auth-context";

export function useCreateOrganization() {
  const router = useRouter();
  const authContext = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createOrganization(name: string) {
    const token = getAccessToken();

    if (!token) {
      router.replace("/auth");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await createOrganizationRequest(name, token);

      // backend already returns tenant-bound tokens
      storeTokens(data.access, data.refresh);

      await authContext.hydrateFromServer();

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    createOrganization,
    loading,
    error,
  };
}
