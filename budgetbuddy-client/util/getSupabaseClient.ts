import { 
    createBrowserClient,
    createServerClient,
    type CookieOptions,
} from "@supabase/ssr";

import { NextResponse, type NextRequest } from "next/server";

import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function getBrowserClient() {
    return createBrowserClient( SUPABASE_URL, SUPABASE_ANON_KEY )
}

export function getServerClient(cookieStore : ReturnType<typeof cookies>) {

    return createServerClient(
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

export function getMiddlewareClient( request : NextRequest ) {


    let response = NextResponse.next({
        request : {
            headers : request.headers,
        }
    });

    const supabase =  createServerClient( SUPABASE_URL, SUPABASE_ANON_KEY, {
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
    

    return createServerClient( SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            get( name : string ) {
                return cookieStore.get(name)?.value
            }
        }
    })
}
