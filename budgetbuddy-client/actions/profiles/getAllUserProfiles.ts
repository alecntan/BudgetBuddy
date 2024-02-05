'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { UserProfile } from '@/types/budgetbuddy';

export default async function getAllUserProfiles(searchParams : string, from : number , offset : number )  {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let result : Array<UserProfile> = [];
    if( searchParams === "") {
        const { data, error } =  await supabase.from('profiles').select().range(from, offset);
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    } else {
        const { data, error } = await supabase.from('profiles').select().textSearch('first_name', searchParams ).textSearch('last_name', searchParams).range(from, offset );
        console.log(`Searching with query: ${searchParams}. Result: ${data}`);
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    }
    console.log(result); 
    return result;
}

