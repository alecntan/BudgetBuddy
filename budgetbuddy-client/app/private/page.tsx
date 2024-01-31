import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/util/supabase/server';

export default async function PrivatePage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase.auth.getUser();
    if( error || !data?.user) {
        if( error ) {
            console.log(`ERROR in PRIVATE PAGE: ${error}`);
        }
        redirect('/');
    }

    return <p>Hello { data.user.email}</p>
}
