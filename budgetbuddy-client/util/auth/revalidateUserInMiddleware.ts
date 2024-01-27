import { getMiddlewareClient } from "../getSupabaseClient";
import { type NextRequest, type NextResponse } from 'next/server';

async function revalidateUserInMiddleware( response : NextResponse, request : NextRequest ) {
    let { supabase } = getMiddlewareClient( response, request);
    const { data: { user } } = await supabase.auth.getUser();

    if( user === null ) {
        return false;
    }
    return true;

}

export default revalidateUserInMiddleware;
