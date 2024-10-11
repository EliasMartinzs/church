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
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  auth().protect();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const user = await clerkClient().users.getUser(userId);
  const currentPath = new URL(req.url).pathname;

  if (currentPath.startsWith("/api")) {
    return NextResponse.next();
  }

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

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Ignorar arquivos internos do Next.js e arquivos estáticos
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre executar para rotas da API
    "/(api|trpc)(.*)",
  ],
};
