'use server'

import { cookies } from "next/headers";
import { getServerClient } from "@/util/getSupabaseClient";

export default async function resetPassword( _ : any, formData : FormData ) {

    const formPassword1 = formData.get('password1') as string;
    const formPassword2 = formData.get('password2') as string;

    if( formPassword1 !== formPassword2 ) {
        return { isError : true, message: "Passwords Do Not Match" };
    }

    const cookieStore = cookies();
    const supabase = getServerClient(cookieStore);
    const { error } = await supabase.auth.updateUser({ password: formPassword1 }); 

    if( error ) {
        return { isError : true, message: "Could Not Update Password" };
    }

    return { isError : false, message: "Password Updated Successfully" }
}
