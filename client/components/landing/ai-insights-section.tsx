"use client";

import { Bot, MessageSquare, Sparkles } from "lucide-react";

export default function AIInsightsSection() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Bot className="h-4 w-4" />
            <span>The Beacon AI</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Ask the Keeper. <br /> Get Instant Answers.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Don't just look at charts—talk to them. Our AI "Keeper" analyzes
            your Django-backed data streams to answer plain English questions
            about inventory, revenue, and customer trends.
          </p>
          <ul className="space-y-4">
            {[
              "Why did sales drop on Tuesday?",
              "Show me the top 5 returning customers.",
              "Forecast inventory needs for next month.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm font-medium"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <MessageSquare className="h-3 w-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Chat Visual */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" />
          <div className="relative rounded-2xl border border-border bg-background p-6 shadow-xl">
            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                  Why is the conversion rate down today?
                </div>
              </div>
              {/* AI Response */}
              <div className="flex justify-start gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <Sparkles className="h-4 w-4 text-foreground" />
                </div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-muted-foreground max-w-[90%]">
                  <p>
                    Traffic from mobile devices increased by{" "}
                    <strong>40%</strong>, but the checkout API latency spiked to
                    2.5s.
                  </p>
                  <div className="mt-3 h-24 w-full rounded-lg bg-background border border-border flex items-end px-2 pb-2 gap-1">
                    {/* Tiny Chart */}
                    <div className="w-full bg-primary/20 h-[30%] rounded-t-sm" />
                    <div className="w-full bg-primary/20 h-[40%] rounded-t-sm" />
                    <div className="w-full bg-red-400/80 h-[80%] rounded-t-sm" />{" "}
                    {/* Spike */}
                    <div className="w-full bg-primary/20 h-[45%] rounded-t-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
