import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const conciergeRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.supabase
      .from("concierge_bots")
      .select("*")
      .eq("user_id", ctx.userId);

    return data;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("concierge_bots")
        .insert({
          user_id: ctx.userId,
          name: input.name,
          description: input.description,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});
