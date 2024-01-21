import { getServerClient } from '@/util/getSupabaseClient';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET( request : Request ) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if( code ) {
        const cookieStore = cookies();
        const supabaseClient = getServerClient(cookieStore);
        await supabaseClient.auth.exchangeCodeForSession(code);
    } 
    return NextResponse.redirect(requestUrl.origin);
}

