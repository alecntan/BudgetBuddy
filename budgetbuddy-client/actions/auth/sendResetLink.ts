'use server'

import { ZodError, z } from "zod"
import { cookies } from "next/headers";
import { getServerClient } from "@/util/getSupabaseClient";

export default async function sendResetLink( _ : any, formData : FormData ) {
    
    const formEmail = formData.get('email') as string;
    const emailSchema = z.string().email();
    
    try {
        emailSchema.parse(formEmail);
    } catch (e) {
        if( e instanceof ZodError ) {
            return { isError : true, messsage : "Invalid Email" }
        } else {
            return { isError : true, message : "Could Not Send Link. Please Try Again Later" }
        }
    }

    const cookieStore = cookies();
    const supabase = getServerClient(cookieStore);
    const { error }  = await supabase.auth.resetPasswordForEmail( formEmail,  { redirectTo : "http://localhost:3000/auth/recovery/authenticate" });

    if( error ) {
        return { isError : true, message : "Could Not Send Email Link. Please Try Again Later" }
    }

    return { isError : false, message : "Email Sent!" };
}
