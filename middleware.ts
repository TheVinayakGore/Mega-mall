import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/", // Protect the homepage
    "/((?!api|_next|static|favicon.ico|.*\\.svg|.*\\.png|.*\\.css|.*\\.js).*)",
  ],
};
