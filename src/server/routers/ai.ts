import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const aiRouter = router({
  // Simple healthcheck (like test.hello)
  healthCheck: publicProcedure.query(() => {
    return {
      status: "ok",
      message: "AILUXE Concierge AI router is online ✨",
      timestamp: new Date().toISOString(),
    };
  }),

  // Main concierge endpoint (temporary: public until we add UI + auth flows)
  conciergeChat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Please write a message for the concierge."),
        context: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { message, context } = input;

      if (!process.env.OPENAI_API_KEY) {
        console.error("[AILUXE AI] Missing OPENAI_API_KEY");
        throw new Error("OPENAI_API_KEY is missing in .env.local");
      }

      const userId = (ctx as any).userId ?? "anonymous";

      const systemPrompt = `
You are AILUXE, a refined but warm luxury lifestyle and travel concierge.
You help busy professionals plan trips, experiences, restaurants, wellness, and daily-life optimizations.
You speak in a clear, concise, friendly tone. You can ask follow-up questions when needed.
Whenever helpful, you suggest 2–3 options, not long lists.
User id (for context only): ${userId}
      `.trim();

      const userContent =
        (context ? `Context:\n${context}\n\n` : "") +
        `User message:\n${message}`;

      try {
        console.log("[AILUXE AI] Incoming request:", {
          userId,
          hasContext: !!context,
        });

        const completion = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent },
          ],
        });

        const reply =
          completion.choices[0]?.message?.content ??
          "I’m sorry, I couldn’t generate a reply right now.";

        // 🔗 Memory hook placeholder (later: write to DB)
        // await ctx.db.conversation.create({...})

        return {
          reply,
        };
      } catch (err) {
        console.error("[AILUXE AI] Error while talking to OpenAI:", err);
        throw new Error("Something went wrong while talking to the concierge.");
      }
    }),
});
