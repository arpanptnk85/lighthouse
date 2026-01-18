type Usage = {
  used: number;
  limit: number | null; // null = unlimited
  remaining: number | null;
};

export function UsageCard({ usage }: { usage: Usage }) {
  const { used, limit, remaining } = usage;

  const percentage = limit === null ? 0 : Math.min((used / limit) * 100, 100);

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Monthly Usage
        </h4>

        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {limit === null
            ? `${used.toLocaleString()} reqs`
            : `${used.toLocaleString()} / ${limit.toLocaleString()} reqs`}
        </span>
      </div>

      {limit !== null ? (
        <>
          <div className="space-y-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`
                  h-full transition-all duration-500 ease-out
                  ${percentage >= 90 ? "bg-destructive" : "bg-primary"}
                `}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-[11px] italic text-muted-foreground">
              Your usage resets on the 1st of next month.
            </p>
          </div>
        </>
      ) : (
        <p className="text-xs italic text-muted-foreground">
          Unlimited requests on your current plan.
        </p>
      )}
    </div>
  );
}
