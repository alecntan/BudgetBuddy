'use server'

import { cookies } from 'next/headers';
import { createClient } from '@/util/supabase/actions';

export default async function getNumUsers( searchParams: { name : string; roles: ( string | number )[] }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let result = 0;

    if( searchParams.name.length === 0 && searchParams.roles.length === 4 ) {
        const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        if( error ) {
            return 0;
        }
        result = count as number;
    } else if ( searchParams.name.length === 0 ) {
        const { count, error } = await supabase.from('profiles').select('*', { count : 'exact', head: true }).in('user_role', searchParams.roles );
        if( error ) {
            return 0;
        }
        result = count as number;
    } else if ( searchParams.roles.length === 4 ) {
        const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).textSearch('firstname_lastname', searchParams.name);
        if( error ) {
            return 0;
        }
        result = count as number;
    } else {
        const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).textSearch('firstname_lastname', searchParams.name ).in('user_role', searchParams.roles);
        if( error ) {
            return 0;
        }
        result = count as number;
    }

    return result;
}
