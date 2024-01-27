import { 
    createBrowserClient,
    createServerClient,
    type CookieOptions,
} from "@supabase/ssr";

import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import type { Database } from "@/types/supabase";

const DEFAULT_SUPABASE_URL = "http://127.0.0.1:54321";
const DEFAULT_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function getBrowserClient() {
    return createBrowserClient<Database>( SUPABASE_URL, SUPABASE_ANON_KEY )
}

export function getServerClient(cookieStore : ReturnType<typeof cookies>) {

    return createServerClient<Database>(
        SUPABASE_URL, SUPABASE_ANON_KEY, {
            cookies : {
                get( name : string ) {
                    return cookieStore.get(name)?.value
                },
                set( name : string, value : string, options: CookieOptions ) {
                    cookieStore.set({ name, value, ...options })
                },
                remove( name : string, options : CookieOptions ) {
                    cookieStore.set({ name, value: '', ...options  })
                }
            } 
        }
    );
}

export function getMiddlewareClient( response : NextResponse, request : NextRequest ) {

    const supabase =  createServerClient<Database>( SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies : {
            get( name : string ) {
                return request.cookies.get(name)?.value;
            },
            set( name : string, value : string, options : CookieOptions ) {
                request.cookies.set({
                    name, 
                    value,
                    ...options
                })
                response = NextResponse.next({
                    request : {
                        headers : request.headers,
                    },
                });
                response.cookies.set({
                    name, 
                    value, 
                    ...options,
                })
            },
            remove( name : string, options : CookieOptions ) {
                request.cookies.set({
                    name, 
                    value : '',
                    ...options,
                })
                response = NextResponse.next({
                    request: {
                        headers: request.headers,
                    }
                })
                response.cookies.set({
                    name,
                    value: '',
                    ...options,
                })
            },
        }
   });

   return { response, supabase };
}

export function getReadOnlyServerClient(cookieStore : ReturnType<typeof cookies>) {
    

    return createServerClient<Database>( SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            get( name : string ) {
                return cookieStore.get(name)?.value
            }
        }
    })
}
