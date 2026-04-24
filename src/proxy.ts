import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth";

const PUBLIC_ROUTES = ["/"];
export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || pathname.startsWith(".")) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session.user?.role;

  if (pathname.startsWith("/admin") && role != "admin") {
    return NextResponse.redirect(new URL("/", req.url))
  }
  if (pathname.startsWith("/partner") && role != "partner") {

    if (pathname.startsWith("/partner/boarding")) return NextResponse.next();

    return NextResponse.redirect(new URL("/", req.url))
  }

  if (pathname.startsWith("/api") && !session.user) {
    return NextResponse.json(
      { message: "You are not authorized " },
      { status: 401 }
    )
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"]
}
