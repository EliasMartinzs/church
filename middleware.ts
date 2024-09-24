import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk",
  "/api",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const user = await clerkClient().users.getUser(userId);
    const currentPath = new URL(req.url).pathname;

    if (user?.publicMetadata.role === "ADMIN") {
      if (currentPath.startsWith("/admin")) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (user.publicMetadata.role === "SECRETARY") {
      if (currentPath.startsWith("/secretario")) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/secretario", req.url));
    }

    if (user.publicMetadata.role === "MEMBER") {
      if (currentPath.startsWith("/member")) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/member", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
