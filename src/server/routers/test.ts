import { router, publicProcedure } from "../trpc";

export const testRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Ailuxe TRPC is alive 🔥" };
  }),
});
