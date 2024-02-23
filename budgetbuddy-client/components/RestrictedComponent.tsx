"use client"

import { ReactNode, useContext } from 'react';
import { ProfileContext } from "@/app/dashboard/ProfileContext"
import { UserRole } from '@/types/budgetbuddy';


export default function RestrictedComponent({ roles, children, fallback } : { roles : Array<UserRole>, children : ReactNode, fallback : ReactNode }) {

    
    const userProfile = useContext(ProfileContext);
    
    if( userProfile && roles.includes(userProfile.user_role) ) {
        return (
            <>
                { children }
            </>
        );
    };


    return (
        <>
            { fallback }
        </>
    );
}
