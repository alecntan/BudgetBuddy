import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers';

export function createClient( cookieStore : ReturnType<typeof cookies>) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies:  {
                get( name :  string ) {
                    console.log(`Login Action: Getting Cookie of name ${name} and value ${cookieStore.get(name)?.value}`);
                    return cookieStore.get(name)?.value
                },
                set( name: string, value: string, options: CookieOptions ) {
                    console.log(`Login Action: Setting cookie of name ${name} and value ${value}$`);
                    cookieStore.set({ name, value, ...options });
                },
                remove( name: string, options: CookieOptions ){
                    console.log(`Login Action: Removing cookie of name ${name}`);
                    cookieStore.set({ name, value: '', ...options });
                }
            }
        }
    );
}
