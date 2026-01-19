import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SchemaEditorProps } from "@/types/sources";

export function SchemaEditor({
  value,
  onChange,
  error,
}: SchemaEditorProps) {
  return (
    <div className="space-y-2">
      <Label>Schema (JSON)</Label>
      <Textarea
        className="font-mono text-xs min-h-[180px]"
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            onChange(parsed);
          } catch {
            // silently ignore until valid JSON
          }
        }}
      />
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
