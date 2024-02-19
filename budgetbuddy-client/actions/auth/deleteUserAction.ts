"use server"

import { UUID } from "crypto";
import { cookies } from "next/headers";
import { createClient } from '@/util/supabase/actions';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { FormResponse } from '@/types/budgetbuddy';

export default async function deleteUserAction(
    user_id : UUID    
) {

    const basicResult : FormResponse<boolean>= {
        isRedirect: false,
        redirectUrl: "",
        result: false,
        isError: false,
        message: ""
    };

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data : { user } } = await supabase.auth.getUser();
    if( !user ) {
        return { ...basicResult, isError : true, message: "Access Denied" }
    }

    if( user_id === user.id ) {
        return { ...basicResult, isError : true, message: "You can't delete yourself" };
    }

    const { data : isAdmin } = await supabase.rpc('is_budget_buddy_admin');
    if( !isAdmin ) {
        return { ...basicResult, isError : true, message: "Access Denied" }
    }

    const supabaseAdmin = createAdminClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, { auth: {
        autoRefreshToken: false,
        persistSession: false
    }});

    const { error } = await supabaseAdmin.auth.admin.deleteUser(user_id);

    if( error ) {
        return { ...basicResult, isError : true, message: "Could not delete user. Please try again later" }
    }
    
    return { ...basicResult, result: true, message: "Successfully deleted user" }

}
