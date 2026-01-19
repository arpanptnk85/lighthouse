"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Beaker,
  Terminal,
  Globe,
  Shield,
  Clock,
  Braces,
} from "lucide-react";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import { AuthConfigFields } from "./auth-config-fields";
import { AuthType } from "@/types/sources";

interface AuthConfigFieldsProps {
  authType: AuthType;
  setAuthType: (val: AuthType) => void;
  authData: any;
  setAuthData: (data: any) => void;
}

type CustomAPISource = {
  id: number;
  name: string;
  base_url: string;
  auth_type: "none" | "api_key";
  schema: object;
  sync_interval_minutes?: number | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  source?: CustomAPISource; // undefined = create
  onSaved: () => void;
};

export function AddEditCustomAPIModal({
  open,
  onClose,
  source,
  onSaved,
}: Props) {
  const isEdit = Boolean(source);

  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [authType, setAuthType] = useState<AuthType>("none");
  const [apiKey, setApiKey] = useState("");
  const [schemaText, setSchemaText] = useState("{}");
  const [schedule, setSchedule] = useState<string>("manual");

  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [schemaError, setSchemaError] = useState<string | null>(null);

  const [authData, setAuthData] = useState<any>({});

  const schemaPlaceholder = `{
  "type": "object",
  "properties": {
    "status": { "type": "string" },
    "data": { "type": "array" }
  }
}`;

  useEffect(() => {
    if (source) {
      setName(source.name);
      setBaseUrl(source.base_url);
      setAuthType(source.auth_type);
      setSchemaText(JSON.stringify(source.schema, null, 2));
      setSchedule(
        source.sync_interval_minutes
          ? String(source.sync_interval_minutes)
          : "manual",
      );
    } else {
      resetForm();
    }
  }, [source, open]);

  function resetForm() {
    setName("");
    setBaseUrl("");
    setAuthType("none");
    setApiKey("");
    setSchemaText("{}");
    setSchedule("manual");
    setSchemaError(null);
  }

  function parseSchema(): object | null {
    try {
      return JSON.parse(schemaText);
    } catch {
      setSchemaError("Invalid JSON schema");
      return null;
    }
  }

  async function testConnection() {
    const schema = parseSchema();
    if (!schema) return;

    setTesting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/${source?.id}/test/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Test failed");
      }

      toast.success("Connection successful");
    } catch (err: any) {
      toast.error("Test failed");
    } finally {
      setTesting(false);
    }
  }

  async function saveSource() {
    const schema = parseSchema();
    if (!schema) return;

    setLoading(true);

    try {
      const payload = {
        name,
        base_url: baseUrl,
        auth_type: authType,
        api_key: authType === "api_key" ? apiKey : undefined,
        schema,
        sync_interval_minutes: schedule === "manual" ? null : Number(schedule),
      };

      const url = source
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/${source.id}/`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/`;

      const method = source ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Save failed");
      }

      toast.success(isEdit ? "Source updated" : "Source created");

      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-4xl overflow-hidden bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* 1. Header Section - Full Width */}
          <DialogHeader className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-inner">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight leading-none">
                  {isEdit ? "Configure Source" : "Register Custom API"}
                </DialogTitle>
                <DialogDescription className="text-xs mt-1.5 text-muted-foreground">
                  Map your external endpoints to the Lighthouse Intelligence
                  engine.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* 2. Main Content - Optimized Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden flex-1">
            {/* LEFT COLUMN: Configuration (5/12) */}
            <div className="lg:col-span-5 p-6 space-y-6 overflow-y-auto border-r border-border/50 bg-muted/5">
              {/* Connection Details Group */}
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Core Endpoint
                </Label>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs">
                      Friendly Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Production API"
                      className="bg-background/50 h-9"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Identification for your dashboard.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="url" className="text-xs">
                      Target URL
                    </Label>
                    <Input
                      id="url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://api.example.com/v1/orders/"
                      className="bg-background/50 h-9"
                    />
                    <p className="text-[10px] text-muted-foreground italic">
                      Target extraction root.
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/50 w-full" />

              {/* Security & Sync Group */}
              <div className="grid gap-4">
                <AuthConfigFields
                  authType={authType}
                  setAuthType={setAuthType}
                  authData={authData} // You'll need to manage this state object in the parent
                  setAuthData={setAuthData}
                />

                <div className="space-y-3 p-4 rounded-xl border bg-muted/20">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" /> Frequency
                  </Label>
                  <Select value={schedule} onValueChange={setSchedule}>
                    <SelectTrigger className="w-full bg-background/50 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Refresh</SelectItem>
                      <SelectItem value="60">Hourly Sync</SelectItem>
                      <SelectItem value="1440">Daily Snapshot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: JSON Editor (7/12) */}
            <div className="lg:col-span-7 flex flex-col bg-black/5 dark:bg-black/20">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Braces className="h-3 w-3" /> Response Schema (JSON)
                </Label>
                <code className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  Read-Only View Enabled
                </code>
              </div>

              <div className="relative flex-1 group">
                <Textarea
                  className="absolute inset-0 font-mono text-xs p-6 bg-transparent border-none focus-visible:ring-0 resize-none leading-relaxed overflow-y-auto h-full"
                  placeholder={schemaPlaceholder}
                  value={schemaText}
                  onChange={(e) => setSchemaText(e.target.value)}
                />

                {/* Syntax Highlighting Visual Overlay */}
                <div className="absolute bottom-4 right-4 p-2 bg-background/80 backdrop-blur rounded-lg border text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  JSON v1.0
                </div>
              </div>

              {schemaError && (
                <div className="p-3 bg-destructive/10 border-t border-destructive/20 text-[11px] font-bold text-destructive flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-ping" />
                  {schemaError}
                </div>
              )}
            </div>
          </div>

          {/* 3. Footer Section - Full Width */}
          <DialogFooter className="p-6 border-t border-border/50 bg-muted/30 flex justify-between items-center shrink-0">
            {isEdit ? (
              <Button
                variant="outline"
                onClick={testConnection}
                disabled={testing}
                className="border-primary/20 hover:bg-primary/5 text-primary font-bold text-xs h-10 px-6"
              >
                {testing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Beaker className="h-4 w-4 mr-2" />
                )}
                Test Intelligence
              </Button>
            ) : (
              <div />
            )}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                className="font-bold text-xs h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={saveSource}
                disabled={loading}
                className="px-8 font-bold text-xs h-10 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : isEdit ? (
                  "Update Config"
                ) : (
                  "Deploy Source"
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
