"use server"

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { FormResponse } from '@/types/budgetbuddy';

export default async function createBudget( _ : FormResponse<boolean>, formData : FormData ) {

     const basicResponse : FormResponse<boolean> = {
        isRedirect: false,
        redirectUrl: "",
        result : false,
        isError: false,
        message :"",
    };

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const  { data : { user }, error : getUserError } = await supabase.auth.getUser();

    if( user === null || getUserError ) {
        return { ...basicResponse, isError : true, message: "Cannot create budget. Please try again later." };
    }

    const { data : isAdmin } = await supabase.rpc('is_budget_buddy_admin');
    const { data : isDirector } = await supabase.rpc('is_budget_buddy_director');

    if( !isAdmin && !isDirector ) {
        return { ...basicResponse, isError : true, message: "Access Denied" };
    }

    const budget_name = formData.get('budget-name') as string;
    const budget_desc = formData.get('budget-description') as string;

    const { error } = await supabase.from('budgets').insert({ name: budget_name, description: budget_desc, owner : user.id });
    if( error ) {
        return { ...basicResponse, isError: true, message: error.message };
    }

    return { ...basicResponse, result: true, message: "Successfully Created Budget" };
}

