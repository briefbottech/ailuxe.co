import { router } from "../trpc";
import { userRouter } from "./user";
import { conciergeRouter } from "./concierge";
import { bookingsRouter } from "./bookings";
import { aiRouter } from "./ai";
import { testRouter } from "./test";

export const appRouter = router({
  user: userRouter,
  concierge: conciergeRouter,
  bookings: bookingsRouter,
  ai: aiRouter,
  test: testRouter,
});

export type AppRouter = typeof appRouter;
