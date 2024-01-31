import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient( cookieStore: ReturnType<typeof cookies> ) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get( name : string ) {
                    console.log(`Server: Getting Cookie of name ${name} and value ${cookieStore.get(name)?.value}`);
                    return cookieStore.get(name)?.value
                }
            },
        }
    );
}
