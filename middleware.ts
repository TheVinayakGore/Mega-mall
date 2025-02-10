import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api/auth/callback|api/webhooks).*)", // Protect all pages except Next.js internal & API routes
  ],
};