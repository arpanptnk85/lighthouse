"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export default function AuthPage() {
  const { authenticate, loading, error } = useAuth();

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* LEFT SIDE: AUTH FORM */}
      <div className="lg:p-8 h-full flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          {/* Back Button / Mobile Logo */}
          <div className="absolute left-4 top-4 md:left-8 md:top-8">
            <Button variant="ghost" asChild className="-ml-2">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the Lighthouse.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
              <TabsTrigger value="login" className="text-sm">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">
                Create Account
              </TabsTrigger>
            </TabsList>

            <UserAuthForm
              type="login"
              loading={loading}
              error={error}
              onSubmit={authenticate}
            />

            <UserAuthForm
              type="signup"
              loading={loading}
              error={error}
              onSubmit={authenticate}
            />
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: BRANDING PANEL */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* Background Layer with Lighthouse Gradients */}
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-zinc-900 to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-50" />

        {/* Logo Area */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground mr-2">
            <Sparkles className="h-5 w-5" />
          </div>
          Lighthouse
        </div>

        {/* Testimonial / Quote Area */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 w-fit px-4 py-1 text-sm text-white">
              <Sparkles className="h-4 w-4" />
              <span>Insight System v2.0</span>
            </div>
            <p className="text-xl font-medium leading-relaxed">
              "Lighthouse clears the fog. We stopped guessing about our Shopify
              data and started making decisions based on radiant, clear
              signals."
            </p>
            <footer className="text-sm text-zinc-400 mt-4">
              Designed for Scale
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
