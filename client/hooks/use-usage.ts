import { useEffect, useState } from "react";

type Usage = {
  used: number;
  limit: number | null;
  remaining: number | null;
};

export function useUsage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/usage/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setUsage(data);
      setLoading(false);
    }

    fetchUsage();
  }, []);

  return { usage, loading };
}
