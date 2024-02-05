'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { UserProfile } from '@/types/budgetbuddy';

export default async function getAllUserProfiles( searchParams : { name: string; roles: ( string | number )[] }, from : number , offset : number )  {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let result : Array<UserProfile> = [];
    if( searchParams.name.length === 0 && searchParams.roles.length === 4 ) {
        const { data, error } =  await supabase.from('profiles').select().range(from, offset);
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    } else if( searchParams.name.length === 0 ) {
        const { data, error } = await supabase.from('profiles').select().in('user_role', searchParams.roles ).range(from, offset);
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    } else if ( searchParams.roles.length === 4 ) {
        const { data, error } = await supabase.from('profiles').select().textSearch('firstname_lastname', searchParams.name).range(from, offset);
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    } else {
        const { data, error } = await supabase.from('profiles').select().textSearch('firstname_lastname', searchParams.name ).in('user_role', searchParams.roles).range(from, offset );
        if( error ) {
            return [];
        }
        result = data as Array<UserProfile>;
    }
    return result;
}

