import { InsightTable } from "./insight-table";
import { JsonInspector } from "./json-inspector";

export function InsightPreview({ result }: { result: any }) {
  const {
    message,
    dataset,
    dataset_version,
    sample_rows,
    schema,
  } = result;

  return (
    <div className="space-y-8">
      {/* Metadata */}
      <div className="space-y-1">
        <div className="text-sm font-semibold text-foreground">
          {dataset}
        </div>
        <div className="text-xs text-muted-foreground">
          Version {dataset_version} • {message}
        </div>
      </div>

      {/* Sample rows (PRIMARY VALUE) */}
      <div className="space-y-2">
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Sample Rows
        </div>
        <InsightTable data={sample_rows} />
      </div>

      {/* Schema (SECONDARY, COLLAPSIBLE) */}
      <details className="rounded-xl border border-border bg-muted/20 p-4">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Schema Definition
        </summary>
        <div className="mt-4">
          <JsonInspector data={schema} />
        </div>
      </details>
    </div>
  );
}
