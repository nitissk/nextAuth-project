import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: "secret" }); // match secret in [...nextauth]
  const isAuth = !!token;
  const path = req.nextUrl.pathname;

  // Block access to protected routes when NOT authenticated
  if (!isAuth && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Block access to login when already authenticated
  if (isAuth && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login"], // protect these routes
};
