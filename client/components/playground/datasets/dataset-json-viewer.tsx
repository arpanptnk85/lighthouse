"use client";

import React from "react";
import { X, Copy, Check, Braces } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";

export function JsonInspector({ 
  data, 
  isOpen, 
  onClose, 
  title = "Object Details" 
}: { 
  data: any; 
  isOpen: boolean; 
  onClose: () => void; 
  title?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Braces className="size-5" />
              </div>
              <div>
                <SheetTitle className="text-xl font-black uppercase tracking-tight">
                  {title}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  Raw data structure
                </SheetDescription>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopy}
              className="h-8 text-[10px] font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/5"
            >
              {copied ? <Check className="mr-2 size-3 text-emerald-500" /> : <Copy className="mr-2 size-3" />}
              {copied ? "Copied" : "Copy JSON"}
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-auto bg-black/20 p-6">
          <pre className="font-mono text-[12px] leading-relaxed text-emerald-400/90 selection:bg-primary/30">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        
        <div className="p-4 border-t border-border/50 bg-muted/20 text-center">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
             Lighthouse Intelligence Protocol v1.0
           </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}