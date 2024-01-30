import { NextResponse, type NextRequest } from 'next/server';
import { getMiddlewareClient } from "./util/getSupabaseClient";


export async function middleware( request : NextRequest ) {

    const { response, supabase } = getMiddlewareClient(request);    
    const { data: { user } } = await supabase.auth.getUser();
    if( user === null ) {
        const url = new URL('/auth/login', request.url);
        return NextResponse.redirect(url);
    }

    // if( request.nextUrl.pathname === "/" ) { return NextResponse.redirect(new URL('/dashboard', request.url )); }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image/favicon.ico|auth/login|auth/recovery/link|auth/callback|auth/recovery/authenticate).*)",
    ],
}
