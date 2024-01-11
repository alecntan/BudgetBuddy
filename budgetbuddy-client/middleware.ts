import { NextResponse, type NextRequest } from 'next/server'
import { getMiddlewareClient } from './util/getSupabaseClient'

export async function middleware( request : NextRequest ) {
    
    let { response, supabase } = getMiddlewareClient(request);

    const { data }  = await supabase.auth.getSession();    

    if( data.session === null && request.nextUrl.pathname !== "/auth/login" ) {
        const url = new URL('/auth/login', request.url);
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image/favicon.ico).*)",
    ],
}
