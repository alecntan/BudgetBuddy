'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { UserProfile } from '@/types/budgetbuddy';

export default async function getAllUserProfiles(from : number , offset : number )  {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from('profiles').select().range(from, offset );

    if( error ) {
        return [];
    }
    return data as Array<UserProfile>;
}

