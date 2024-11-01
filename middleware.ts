import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // If the path is public and user is authenticated, redirect to dashboard
  if (isPublicPath && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the path is private and user is not authenticated, redirect to login
  if (!isPublicPath && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};