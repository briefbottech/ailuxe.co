import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.next).*)", // match all routes except Next.js internals
    "/",              // allow homepage
    "/api/(.*)",      // allow API
  ],
};
