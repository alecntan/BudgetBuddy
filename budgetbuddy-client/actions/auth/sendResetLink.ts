'use server'

import { ZodError, z } from "zod"
import { cookies } from "next/headers";
import { getServerClient } from "@/util/getSupabaseClient";
import { type FormResponse } from "@/types/FormResponse";

export default async function sendResetLink( initialState : FormResponse<boolean>, formData : FormData ) {
    
    const formEmail = formData.get('email') as string;
    const emailSchema = z.string().email();
    
    try {
        emailSchema.parse(formEmail);
    } catch (e) {
        if( e instanceof ZodError ) {
            return { ...initialState, isError : true, messsage : "Invalid Email" }
        } else {
            return { ...initialState, isError : true, message : "Could Not Send Link. Please Try Again Later" }
        }
    }

    const cookieStore = cookies();
    const supabase = getServerClient(cookieStore);
    const { error }  = await supabase.auth.resetPasswordForEmail( formEmail,  { redirectTo : `${process.env.APP_DOMAIN}/auth/recovery/authenticate`});

    if( error ) {
        return { ...initialState, isError : true, message : "Could Not Send Email Link. Please Try Again Later" }
    }

    return { ...initialState, result: true, message : "Email Sent!" };
}
