'use server'

import { cookies } from "next/headers";
import { ZodError, z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from '@/util/supabase/actions';

export default async function loginAction( _ : any, formData : FormData ) {
    console.log('Entered Login Action');

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
            return  { isError : true, message : `${e.issues[0].message}`}
        } else {
            return { isError : true, message : "Could Not Login. Please Try Again Later" }
        }
    }

    const cookieStore = cookies();
    console.log("$$$$$$$$$$$$$$$$$$$$$ SERVER ACTION $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(`$$$$ BEFORE CLIENT: ${cookieStore}`);
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.signInWithPassword({
        email : formEmail,
        password: formPassword
    });

    if( error ) {
        return { isError : true, message : "Could Not Authenticate User" };
    }
    
    console.log(`$$$$ After Login: ${cookieStore}`);
    revalidatePath('/', 'layout');
    console.log('Exiting  Login Action');
    redirect('/');
    //return { isError: false, message: "Logged In Succesfully" };
}
