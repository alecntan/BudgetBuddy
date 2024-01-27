import revalidateUserInMiddleware from "./util/auth/revalidateUserInMiddleware";
import { NextResponse, type NextRequest } from 'next/server';


export async function middleware( request : NextRequest ) {

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        }
    });
    
    const isValidUser = revalidateUserInMiddleware(response, request);

    if( request.nextUrl.pathname === "/" ) { return NextResponse.redirect(new URL('/dashboard', request.url )); }

    if( !isValidUser ) {
        const url = new URL('/auth/login', request.url);
        return NextResponse.redirect(url);
    }
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image/favicon.ico|auth/login|auth/recovery/link|auth/callback|auth/recovery/authenticate).*)",
    ],
}
