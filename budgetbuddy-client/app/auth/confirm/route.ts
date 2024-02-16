import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from '@/util/supabase/actions';

export async function GET( request : NextRequest ) {
    const cookieStore = cookies();

    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/auth/recovery/reset';

    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;
    redirectTo.searchParams.delete('token_hash');
    redirectTo.searchParams.delete('type');

    if( token_hash && type ) {
        const supabase = createClient(cookieStore);
        const { error } = await supabase.auth.verifyOtp({ token_hash: token_hash, type: type  });
        if( !error ) {
            redirectTo.searchParams.delete('next');
            return NextResponse.redirect(redirectTo);
        } else {
            console.log(error.message);
        }
    }

    redirectTo.pathname = '/error';
    return NextResponse.redirect(redirectTo);
}
