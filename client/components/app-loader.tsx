import { Loader2 } from "lucide-react";

export default function AppLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
        <div className="absolute h-5 w-5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
      </div>
      <span className="mt-4 text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Initializing Lighthouse
      </span>
    </div>
  );
}
