import { router, protectedProcedure } from "../trpc";

export const bookingsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.supabase
      .from("bookings")
      .select("*")
      .eq("user_id", ctx.userId);

    return data;
  }),
});
