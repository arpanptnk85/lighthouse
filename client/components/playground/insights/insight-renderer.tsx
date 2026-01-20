import { InsightTable } from "./insight-table";
import { InsightMetric } from "./insight-metric";
import { InsightKeyValue } from "./insight-keyvalue";
import { InsightPreview } from "./insight-preview";

type Props = {
  result: any;
};

export function InsightRenderer({ result }: Props) {
  if (!result) {
    return <EmptyInsight />;
  }

  if (result.sample_rows && Array.isArray(result.sample_rows)) {
    return <InsightPreview result={result} />;
  }

  // Case 1: Array → Table
  if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
    return <InsightTable data={result} />;
  }

  // Case 2: Single number metric
  if (typeof result === "number") {
    return <InsightMetric value={result} />;
  }

  // Case 3: Flat object → key-value
  if (typeof result === "object") {
    return <InsightKeyValue data={result} />;
  }

  return <RawFallback result={result} />;
}

function EmptyInsight() {
  return (
    <div className="text-muted-foreground italic">
      No visualization available.
    </div>
  );
}

function RawFallback({ result }: { result: any }) {
  return (
    <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
