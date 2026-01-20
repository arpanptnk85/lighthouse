import { useEffect, useState } from "react";

export type History = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "running" | "failed";
  starred: boolean;
};

interface UseDatasetsHistoryReturn {
  histories: History[];
  loading: boolean;
}

export function useDatasetsHistory(datasetId: number | null): UseDatasetsHistoryReturn {
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Don't fetch if there's no dataset selected
    if (!datasetId) {
      setHistories([]);
      return;
    }

    async function fetchDatasetsHistory() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/playground/datasets/${datasetId}/history/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        
        // Ensure data is an array (handle DRF paginated responses if necessary)
        const historyData = Array.isArray(data) ? data : data.results || [];
        setHistories(historyData);
      } catch (error) {
        console.error("History fetch error:", error);
        setHistories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDatasetsHistory();
  }, [datasetId]); // 2. Refetch whenever datasetId changes

  return { histories, loading };
}