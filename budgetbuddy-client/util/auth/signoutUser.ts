"use client"

import { getBrowserClient } from '../getSupabaseClient';

export default function signoutUser() {
    const supabase = getBrowserClient();
    supabase.auth.signOut();
}
