"use client";
export const dynamic = "force-dynamic";

import { useState, FormEvent } from "react";
import { trpc } from "@/trpc/client";

export default function AILuxeAiDevPage() {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const conciergeMutation = trpc.ai.conciergeChat.useMutation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setReply(null);
    setError(null);

    try {
      const data = await conciergeMutation.mutateAsync({
        message,
        context: context.trim() === "" ? undefined : context,
      });
      setReply(data.reply);
    } catch (err: any) {
      console.error("[AILUXE AI] Frontend error:", err);
      setError(err.message ?? "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-neutral-800 rounded-2xl p-6 space-y-4 bg-neutral-950/70">
        <h1 className="text-2xl font-semibold">
          AILUXE Concierge – Dev Console
        </h1>
        <p className="text-sm text-neutral-400">
          This is a developer-only page to test the AILUXE AI concierge endpoint
          via tRPC.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Your request</label>
            <textarea
              className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Plan me a 3-day luxury weekend in Rome with great food and child-friendly experiences..."
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Optional context (dev notes, user profile, etc.)
            </label>
            <textarea
              className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              rows={3}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Example: user prefers boutique hotels, hates nightclubs, travelling with 9-month baby..."
            />
          </div>

          <button
            type="submit"
            disabled={conciergeMutation.isPending}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 disabled:opacity-50"
          >
            {conciergeMutation.isPending ? "Thinking…" : "Ask AILUXE"}
          </button>
        </form>

        {error && (
          <div className="text-sm text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        {reply && (
          <div className="mt-4 border-t border-neutral-800 pt-4">
            <h2 className="text-sm font-semibold mb-2 text-neutral-300">
              Concierge reply
            </h2>
            <p className="text-sm whitespace-pre-wrap text-neutral-100">
              {reply}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
