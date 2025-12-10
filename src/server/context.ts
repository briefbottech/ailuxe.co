import { auth } from "@clerk/nextjs/server";

export async function createContext() {
  const { userId } = auth();

  return {
    userId,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
