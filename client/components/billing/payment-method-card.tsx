import { Button } from "../ui/button";

export function PaymentMethodCard() {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-background font-bold text-[10px] tracking-tighter">
          VISA
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">
            Visa ending in 4242
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Expires 12/28
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs font-bold uppercase tracking-wider"
      >
        Update
      </Button>
    </div>
  );
}
