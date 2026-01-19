"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Integrations", href: "#integrations" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "/docs" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-3"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          {/* The Beacon Icon */}
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-500 group-hover:shadow-primary/50 group-hover:-rotate-6 group-hover:scale-110">
              <Sparkles className="h-6 w-6 text-primary-foreground transition-transform duration-500 group-hover:rotate-12" />
            </div>

            {/* Decorative status dot to match the Dashboard's "Live" feel */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background"></span>
            </span>
          </div>

          {/* Typography: Bold Brand + Subtle Service Type */}
          <div className="flex flex-col">
            <span className="text-xl font-black leading-none tracking-tighter text-foreground">
              LIGHTHOUSE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth">
            <Button variant="ghost" className="font-bold text-sm">
              Log in
            </Button>
          </Link>
          <Link href="/auth?signup=true">
            <Button className="font-bold text-sm px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border p-6 md:hidden animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border" />
            <Link href="/auth" className="w-full">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link href="/auth?signup=true" className="w-full">
              <Button className="w-full justify-center">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
