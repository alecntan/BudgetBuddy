'use client'

import { getBrowserClient } from "@/util/getSupabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import {
    ThemeSupa,
} from '@supabase/auth-ui-shared';


const supabase = getBrowserClient();

export default function LoginPage() {
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme : ThemeSupa }}
            redirectTo="http://localhost:3000/auth/callback"
        />
    );
}

