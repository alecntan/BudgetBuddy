import { getMiddlewareClient } from "../getSupabaseClient";
import { type NextRequest } from 'next/server';

async function revalidateUserInMiddleware( request : NextRequest ) {
    let { supabase } = getMiddlewareClient(request);
    const { data: { user } } = await supabase.auth.getUser();

    if( user === null ) {
        return false;
    }
    return true;

}

export default revalidateUserInMiddleware;
