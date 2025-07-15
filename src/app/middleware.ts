import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: "secret" });
  const isAuth = !!token;
  const path = req.nextUrl.pathname;

  // Block access to protected routes when NOT authenticated
  if (
    !isAuth &&
    (
      path.startsWith("/users") ||
      path.startsWith("/countries")
    )
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Block access to login when already authenticated
  if (isAuth && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Protect /users and /countries (including dynamic subroutes)
export const config = {
  matcher: ["/login", "/users/:path*", "/countries/:path*"],
};
