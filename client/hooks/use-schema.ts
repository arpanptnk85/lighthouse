import { useMemo } from "react";

export function useSchema(data: any[] | null | undefined) {
  return useMemo(() => {
    // 1. Check if data is a valid non-empty array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    // 2. Safely check if the first record is actually an object
    const firstRecord = data[0];
    if (typeof firstRecord !== 'object' || firstRecord === null) {
      return [];
    }

    // 3. Extract keys safely
    return Object.keys(firstRecord);
  }, [data]);
}
