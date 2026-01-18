"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

type AuthFormType = "login" | "signup";

interface UserAuthFormProps {
  type: AuthFormType;
  loading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => void;
}

export function UserAuthForm({
  type,
  loading,
  error,
  onSubmit,
}: UserAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TabsContent value={type}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email, password);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="h-11 bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder={
              type === "signup"
                ? "Create a strong password"
                : "••••••••"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="h-11 bg-background"
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md border border-red-500/20">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-base shadow-lg shadow-primary/20"
          disabled={loading}
        >
          {loading && <Sparkles className="mr-2 h-4 w-4 animate-spin" />}
          {type === "login" ? "Sign In with Email" : "Create Account"}
        </Button>
      </form>
    </TabsContent>
  );
}
