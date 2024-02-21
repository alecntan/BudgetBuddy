'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { UserRole } from '@/types/budgetbuddy';
import type { FormResponse } from '@/types/budgetbuddy';

export default async function editUserRole( _ : FormResponse<boolean>, formData : FormData ) {

    const basicResult : FormResponse<boolean> = {
        isRedirect: false,
        redirectUrl: "",
        result : false,
        isError : false,
        message: ""
    };

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data : { user } } = await supabase.auth.getUser();

    if( !user ) {
        return { ...basicResult, isError: true, message: "Access Denied" }
    }

    const { data: isAdmin } = await supabase.rpc('is_budget_buddy_admin');
    if( !isAdmin ) {
        return { ...basicResult, isError: true, message: 'Access Denied' }
    }

    const user_id = formData.get('user_id') as string;
    const user_role = formData.get('user_role') as UserRole;

    if( user_id === user.id ) {
        return { ...basicResult, isError: true, message: "You can't edit your own role" };
    }

    const { error } = await supabase.from('profiles').update({ user_role : user_role }).eq('id', user_id); 
    if( error ) {
        return { ...basicResult, isError: true, message: "Edit failed. Please try again later"};
    }

    return { ...basicResult, result: true, message: "Successfully updated role" };
}
