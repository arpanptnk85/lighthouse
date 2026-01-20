import { useEffect, useState } from "react";
import { IntegrationType } from "@/types/sources";

type Dataset = {
  id: number;
  name: string;
  source_name: IntegrationType;
};


export function useDatasets() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDatasets() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/datasets/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setDatasets(data);
      setLoading(false);
    }

    fetchDatasets();
  }, []);

  return { datasets, loading };
}
