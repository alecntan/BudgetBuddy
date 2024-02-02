"use server"


import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';
import type { UserProfile } from '@/types/budgetbuddy';

export default async function getUserProfile() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user }, error : getUserError } = await supabase.auth.getUser();

    if( user === null || getUserError ) {
        return null;
    }
    const profileQuery = supabase.from('profiles').select("first_name, last_name, user_role").eq('id', user.id).maybeSingle();
    const { data , error : getProfileError } = await profileQuery;

    if( getProfileError || data === null ) {
        return null;
    }

    return data as UserProfile | null;
}
