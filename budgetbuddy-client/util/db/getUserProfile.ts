import { QueryData } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

const supabase = createClient();
const profileQuery = supabase.from('profiles').select('first_name, last_name, user_role').maybeSingle();
export type TypeUserProfile = QueryData<typeof profileQuery>;

export default async function getUserProfile() {
    const { data, error } = await profileQuery;
    if( error ) {
        throw new Error("Failed to Fetch User Profile");
    }
    return data;
}

