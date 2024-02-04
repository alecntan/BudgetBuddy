'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';

export default async function getNumUsers() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { count, error } = await supabase.from('profiles').select('*', { count : 'exact', head: true });

    if( error ) {
        return 0;
    }

    return count as number;
}
