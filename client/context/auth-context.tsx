"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  clearTokens,
} from "@/lib/auth/auth-storage";
import { decodeJWT, isExpired, willExpireSoon } from "@/lib/auth/jwt-utils";

export type PlanType = "starter" | "pro" | "enterprise";

type AuthState = {
  userId: string | null;
  email: string | null;
  organizationId: string | null;
  role: string | null;
  bootstrap: boolean;
  plan: PlanType | null;
  trialActive: boolean;
  trialEndsAt: string | null;
  hydrated: boolean;
  subscriptionActive: boolean;
};

type AuthContextType = AuthState & {
  isAuthenticated: boolean;
  logout: () => void;
  refreshFromStorage: () => void;
  ensureValidAccessToken: () => Promise<string | null>;
  hydrateFromServer: () => void;
};

const EMPTY_AUTH_STATE = {
  userId: null,
  email: null,
  organizationId: null,
  role: null,
  bootstrap: false,

  // business state (server-hydrated only)
  plan: null,
  trialActive: false,
  trialEndsAt: null,
  hydrated: false,
  subscriptionActive: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(EMPTY_AUTH_STATE);

  function loadFromToken() {
    const token = getAccessToken();
    if (!token) {
      setState(EMPTY_AUTH_STATE);
      return;
    }

    const payload = decodeJWT(token);
    if (!payload || isExpired(payload)) {
      clearTokens();
      setState(EMPTY_AUTH_STATE);
      return;
    }

    setState((prev) => ({
      ...prev,
      userId: payload.sub ?? null,
      email: payload.email ?? null,
      organizationId: payload.org_id ?? null,
      role: payload.role ?? null,
      bootstrap: Boolean(payload.bootstrap),
    }));
  }
  
  function logout() {
    clearTokens();
    setState(EMPTY_AUTH_STATE);
    router.replace("/auth");
  }

  async function ensureValidAccessToken(): Promise<string | null> {
    const accessToken = getAccessToken();
    if (!accessToken) {
      clearTokens();
      return null;
    }

    const payload = decodeJWT(accessToken);
    if (!payload) {
      clearTokens();
      return null;
    }

    /**
     * 🔴 CRITICAL GUARD
     * Identity / Bootstrap tokens must NEVER refresh
     */
    if (!payload.org_id) {
      return accessToken;
    }

    const refreshToken = getRefreshToken();

    /**
     * Tenant token but refresh missing → invalid session
     */
    if (!refreshToken) {
      clearTokens();
      return null;
    }

    /**
     * Access token still valid
     */
    if (!isExpired(payload) && !willExpireSoon(payload)) {
      return accessToken;
    }

    /**
     * Refresh tenant token
     */
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.access) {
        throw new Error("Refresh failed");
      }

      storeTokens(data.access, refreshToken);
      loadFromToken(); // update context state

      return data.access;
    } catch {
      clearTokens();
      return null;
    }
  }

  async function hydrateFromServer() {
    const access = getAccessToken();
    if (!access) {
      setState((prev) => ({ ...prev, hydrated: true }));
      return;
    }

    const payload = decodeJWT(access);

    // Must be tenant token
    if (!payload?.org_id) {
      setState((prev) => ({ ...prev, hydrated: true }));
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );

    if (!res.ok) {
      logout();
      return;
    }

    const data = await res.json();

    setState((prev) => ({
      ...prev,
      userId: data.user.id,
      email: data.user.email,
      role: data.role,

      organizationId: data.organization.id,
      organizationName: data.organization.name,

      plan: data.organization.plan,
      trialActive: data.organization.trial_active,
      trialEndsAt: data.organization.trial_ends_at,
      subscriptionActive: data.organization.subscription_active,

      hydrated: true,
    }));
  }

  useEffect(() => {
    loadFromToken();
    hydrateFromServer();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: Boolean(getAccessToken()),
        logout,
        refreshFromStorage: loadFromToken,
        ensureValidAccessToken,
        hydrateFromServer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
}
