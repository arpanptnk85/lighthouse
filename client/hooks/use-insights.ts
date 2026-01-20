import { useEffect, useState } from "react";

type Insight = {
  id: number;
  title: string;
  description: string;
  is_starred: boolean;
  created_at: string;
};

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchInsights = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (!res.ok) return;

    const data = await res.json();
    setInsights(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return { insights, loading, refresh: fetchInsights };
}
