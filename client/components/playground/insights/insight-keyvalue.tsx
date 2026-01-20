type Props = {
  data: Record<string, any>;
};

export function InsightKeyValue({ data }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="rounded-xl border border-border bg-card/40 p-4"
        >
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {key}
          </div>
          <div className="text-2xl font-bold mt-1">
            {String(value)}
          </div>
        </div>
      ))}
    </div>
  );
}
