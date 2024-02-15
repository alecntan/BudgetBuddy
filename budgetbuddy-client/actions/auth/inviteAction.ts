"use server"

import { ZodError, z } from 'zod';

import { cookies } from 'next/headers';
import { createClient as createActionClient } from '@/util/supabase/actions';
import { createClient } from '@supabase/supabase-js';
import { FormResponse, UserRole } from '@/types/budgetbuddy';


export default async function inviteAction( 
    _ : any,
    formData: FormData 
) {

    const basicResult : FormResponse<boolean>= {
        isRedirect: false,
        redirectUrl: "",
        result: false,
        isError: false,
        message: ""
    };

    const cookieStore = cookies();
    const supabase = createActionClient(cookieStore);
    const { data: isAdmin, error: actionError } = await supabase.rpc('is_budget_buddy_admin');
    console.log(isAdmin);
    
    if( actionError ) {
        return { ...basicResult, isError: true, message: "Could not invite user. Please try again later" };        
    }

    if( !isAdmin ) {
        return { ...basicResult, isError: true, message: "Access Denied" };
    }

    const formFirstName = formData.get('first_name') as string;
    const formLastName = formData.get('last_name') as string;
    const formEmail = formData.get('email') as string;
    const formPassword = formData.get('password') as string; 
    const userRole = formData.get('user_role') as UserRole;

    const credentialSchema = z.object({
        first_name : z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string(),
        user_role: z.enum(["admin", "director", "manager", "associate"])
    }).required()

    try {
        credentialSchema.parse({ first_name: formFirstName, last_name: formLastName, email: formEmail, password: formPassword, user_role : userRole });
    } catch( e) {
        if ( e instanceof ZodError ) {
            return { ...basicResult, isError: true, message: `${e.issues[0].message}`}
        } else {
            return { ...basicResult, isError: true, message : "Could not invite users. Please try again later" };
        }
    }

    const supabaseAdmin = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!, { auth: {
        autoRefreshToken: false,
        persistSession: false
    }});

    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(formEmail, { data: { first_name : formFirstName, last_name: formLastName, user_role: userRole }});

    if( error ) {
        return { ...basicResult, isError: true, message: error.message }; 
    }     

    return { ...basicResult, result: true, isError: false, message: "User Invited Successfully" };
}
