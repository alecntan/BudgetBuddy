"use client"

import { createClient } from '@/util/supabase/client';

export default function signoutUser() {
    const supabase = createClient();
    supabase.auth.signOut();
}
