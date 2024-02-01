'use server'

import { cookies } from "next/headers";
import { FormResponse } from "@/types/FormResponse";
import { createClient } from "@/util/supabase/actions";

export default async function resetPassword( initialState : FormResponse<boolean>, formData : FormData ) {

    const formPassword1 = formData.get('password1') as string;
    const formPassword2 = formData.get('password2') as string;

    if( formPassword1 !== formPassword2 ) {
        return { ...initialState, isError : true, message: "Passwords Do Not Match" };
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.updateUser({ password: formPassword1 }); 

    if( error ) {
        return { ...initialState, isError : true, message: error.message };
    }

    return { ...initialState, isError: false, isRedirect: true, redirectUrl: "/dashboard", message: "Password Updated Successfully" }
}
