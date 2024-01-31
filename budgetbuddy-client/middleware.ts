import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';


export async function middleware( request : NextRequest ) {
    console.log('Entering Middleware');
    //console.log("Request Headers:");
    //console.log(request.headers);

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get( name : string ) {
                    console.log(`Middleware: Getting cookie ${name} of value ${request.cookies.get(name)?.value}`);
                    return request.cookies.get(name)?.value
                },
                set( name : string, value : string, options: CookieOptions ) {

                    console.log(`Middleware: Setting cookie ${name} of value ${value}`);
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        }
                    })
                    response.cookies.set({
                        name, 
                        value,
                        ...options
                    })
                },
                remove( name : string, options: CookieOptions ) {
                    console.log(`Removing cookie ${name}`);
                    request.cookies.set({
                        name, 
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                }
            }
        }
    );
    const { error } = await supabase.auth.getUser();
    if( error ) {
        console.log(`Middleware Error: ${error}`);
    }
    //console.log("Response Headers");
    //console.log(response.headers);
    console.log('exiting middleware');
    return response;
}

export const config = {
    matcher: [
//        "/((?!_next/static|_next/image/favicon.ico|auth/login|auth/recovery/link|auth/callback|auth/recovery/authenticate).*)",
        "/((?!_next/static|_next/image/favicon.ico).*)",
    ],
}
