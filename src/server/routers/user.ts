import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const { data } = await ctx.supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return data;
  }),
});
