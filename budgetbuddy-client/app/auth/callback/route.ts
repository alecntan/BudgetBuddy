import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';

export async function GET( request : Request ) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if( code ) {
        const cookieStore = cookies();
        const supabaseClient = createClient(cookieStore);
        await supabaseClient.auth.exchangeCodeForSession(code);
    } 
    return NextResponse.redirect(requestUrl.origin);
}

