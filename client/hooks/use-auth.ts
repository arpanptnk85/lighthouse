import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginRequest, logoutRequest } from "@/lib/auth/auth-service";
import { resolveAuthRedirect } from "@/lib/auth/auth-redirect";
import {
  clearTokens,
  getRefreshToken,
  storeTokens,
} from "@/lib/auth/auth-storage";
import { useAuthContext } from "@/context/auth-context";

export function useAuth() {
  const router = useRouter();
  const authContext = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function authenticate(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginRequest(email, password);
      const action = resolveAuthRedirect(data);

      // MULTI-ORG → do NOT hydrate
      if (action.orgs) {
        localStorage.setItem("org_candidates", JSON.stringify(action.orgs));
        storeTokens(action.access); // identity token only

        authContext.refreshFromStorage(); // optional
        router.push(action.path);
        return;
      }

      // BOOTSTRAP or TENANT
      storeTokens(action.access, action.refresh);

      authContext.refreshFromStorage();

      // 🔴 hydrate ONLY if tenant token exists
      if (action.path === "/dashboard") {
        await authContext.hydrateFromServer();
      }

      router.push(action.path);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    const refresh = getRefreshToken();

    try {
      await logoutRequest(refresh);
    } finally {
      clearTokens();
      router.replace("/auth");
    }
  }

  return {
    authenticate,
    logout,
    loading,
    error,
  };
}
