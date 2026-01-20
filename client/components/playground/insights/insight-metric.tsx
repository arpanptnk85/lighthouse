export function InsightMetric({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center h-48 rounded-xl border border-primary/20 bg-primary/5">
      <div className="text-center">
        <div className="text-5xl font-black text-primary">
          {value}
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
          Metric
        </div>
      </div>
    </div>
  );
}
