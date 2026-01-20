"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Bookmark, AlignLeft, Info, Loader2 } from "lucide-react";

export function SaveInsightDialog({ askId }: { askId: number }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/ask/${askId}/save/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ title, description }),
      },
    );

    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group h-7 px-2 font-black text-[10px] uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Bookmark className="mr-2 size-3 fill-current group-hover:scale-110 transition-transform" />
          Archive Insight
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-2xl border-border/50 shadow-2xl overflow-hidden p-0">
        {/* 1. Header Design */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 text-primary-foreground">
              <Save className="size-4" />
            </div>
            <DialogTitle className="text-xl font-black uppercase tracking-tight italic leading-none">
              Commit <span className="text-primary/80 text-lg">to Archive</span>
            </DialogTitle>
          </div>
          <DialogDescription className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">
            Protocol: Permanent Knowledge Storage
          </DialogDescription>
        </DialogHeader>

        {/* 2. Form Section */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Intelligence Identifier
            </label>
            <div className="relative group">
              <Bookmark className="absolute left-3 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Ex: Q4 Revenue Anomaly"
                className="pl-10 bg-background/50 border-border/50 h-10 text-sm focus-visible:ring-primary/20"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Contextual Metadata
            </label>
            <div className="relative group">
              <AlignLeft className="absolute left-3 top-3 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Textarea
                placeholder="Provide additional context for this intelligence..."
                className="pl-10 min-h-[100px] bg-background/50 border-border/50 text-sm focus-visible:ring-primary/20 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Technical Info Note */}
          <div className="flex gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <Info className="size-4 text-primary shrink-0" />
            <p className="text-[10px] leading-tight text-muted-foreground">
              Saving this insight will index the current dataset snapshot and AI
              response for future interrogation.
            </p>
          </div>
        </div>

        {/* 3. Footer Actions */}
        <DialogFooter className="p-4 bg-muted/20 border-t border-border/50 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-[10px] font-bold uppercase tracking-widest"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !title}
            className="px-8 font-black text-xs uppercase tracking-tighter shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            {loading ? (
              <Loader2 className="mr-2 size-3 animate-spin" />
            ) : (
              <Save className="mr-2 size-3" />
            )}
            {loading ? "Archiving..." : "Confirm Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
