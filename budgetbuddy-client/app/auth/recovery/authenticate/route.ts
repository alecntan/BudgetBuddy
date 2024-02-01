import { createClient } from '@/util/supabase/actions';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET( request : Request ) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if( code ) {
        const cookieStore = cookies();
        const supabaseClient = createClient(cookieStore);
        const { error } = await supabaseClient.auth.exchangeCodeForSession(code);
        if( error ) {
            return NextResponse.redirect(new URL("/error", requestUrl.origin));
        }
        return NextResponse.redirect(new URL("/auth/recovery/reset", requestUrl.origin));
    } 

    return NextResponse.redirect(new URL("/error", requestUrl.origin));

}
