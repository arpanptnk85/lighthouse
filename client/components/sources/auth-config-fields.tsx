"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { KeyRound, Lock, User, ShieldCheck } from "lucide-react";

export type AuthType = "none" | "api_key" | "bearer" | "basic" | "oauth2";

interface AuthConfigFieldsProps {
  authType: AuthType;
  setAuthType: (val: AuthType) => void;
  authData: any;
  setAuthData: (data: any) => void;
}

export function AuthConfigFields({ 
  authType, 
  setAuthType, 
  authData, 
  setAuthData 
}: AuthConfigFieldsProps) {
  
  const updateField = (field: string, value: string) => {
    setAuthData({ ...authData, [field]: value });
  };

  return (
    <div className="space-y-4 p-4 rounded-2xl border border-primary/10 bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5" /> Authorization Protocol
        </Label>
        <span className="text-[9px] font-bold text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full border border-border/50">
          Encrypted at rest
        </span>
      </div>

      <Select value={authType} onValueChange={(v: AuthType) => setAuthType(v)}>
        <SelectTrigger className="w-full bg-background/50 h-10 border-border/50 focus:ring-primary/20">
          <SelectValue placeholder="Select Auth Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Authentication</SelectItem>
          <SelectItem value="api_key">API Key (Header/Query)</SelectItem>
          <SelectItem value="bearer">Bearer Token</SelectItem>
          <SelectItem value="basic">Basic Auth (User/Pass)</SelectItem>
          <SelectItem value="oauth2">OAuth 2.0 (Client Credentials)</SelectItem>
        </SelectContent>
      </Select>

      <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
        {/* API KEY SECTION */}
        {authType === "api_key" && (
          <div className="grid gap-3">
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
              <Input 
                className="pl-10 h-10 bg-background/40" 
                placeholder="X-API-KEY" 
                value={authData.key || ""} 
                onChange={(e) => updateField("key", e.target.value)}
              />
            </div>
            <Input 
              type="password" 
              className="h-10 bg-background/40" 
              placeholder="Value" 
              value={authData.value || ""} 
              onChange={(e) => updateField("value", e.target.value)}
            />
          </div>
        )}

        {/* BEARER TOKEN */}
        {authType === "bearer" && (
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
            <Input 
              type="password"
              className="pl-10 h-10 bg-background/40 font-mono text-xs" 
              placeholder="eyJhbGciOiJIUzI1NiIsInR..." 
              value={authData.token || ""} 
              onChange={(e) => updateField("token", e.target.value)}
            />
          </div>
        )}

        {/* BASIC AUTH */}
        {authType === "basic" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
              <Input 
                className="pl-10 h-10 bg-background/40" 
                placeholder="Username" 
                value={authData.username || ""} 
                onChange={(e) => updateField("username", e.target.value)}
              />
            </div>
            <Input 
              type="password"
              className="h-10 bg-background/40" 
              placeholder="Password" 
              value={authData.password || ""} 
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>
        )}

        {/* OAUTH 2.0 (Simplified for UI Demo) */}
        {authType === "oauth2" && (
          <div className="space-y-3">
            <Input className="h-9 bg-background/40 text-xs" placeholder="Access Token URL" value={authData.tokenUrl || ""} onChange={(e) => updateField("tokenUrl", e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
               <Input className="h-9 bg-background/40 text-xs" placeholder="Client ID" value={authData.clientId || ""} onChange={(e) => updateField("clientId", e.target.value)} />
               <Input type="password" className="h-9 bg-background/40 text-xs" placeholder="Client Secret" value={authData.clientSecret || ""} onChange={(e) => updateField("clientSecret", e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}