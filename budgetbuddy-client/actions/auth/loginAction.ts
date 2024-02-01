'use server'

import { cookies } from "next/headers";
import { ZodError, z } from "zod";

import { createClient } from '@/util/supabase/actions';
import { FormResponse } from "@/types/FormResponse";

export default async function loginAction( initialState: FormResponse<null>, formData : FormData ) {

    const formEmail = formData.get('email') as string;
    const formPassword = formData.get('password') as string;

    const credentialsSchema = z.object({
        email: z.string().email(),
        password: z.string()
    }).required();

    try {
        credentialsSchema.parse({ email : formEmail, password: formPassword });
    } catch (e) {
        if( e instanceof ZodError ) {
            return  { ...initialState, isError : true, message : `${e.issues[0].message}`}
        } else {
            return { ...initialState, isError : true, message : "Could Not Login. Please Try Again Later" }
        }
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.signInWithPassword({
        email : formEmail,
        password: formPassword
    });

    if( error ) {
        return { ...initialState, isError : true, message : "Wrong Username or Password" };
    }

    return { ...initialState, isError: false, isRedirect: true, redirectUrl: "/dashboard", message: "Logged In Successfully" };
}
