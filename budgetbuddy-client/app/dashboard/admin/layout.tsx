"use client"

import { Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";


export default function AdminLayout({ children } : { children : React.ReactNode }) {

   const userProfile = useContext(ProfileContext);

   if( userProfile == null || userProfile.user_role !== 'admin' ) {
        return <Heading>Permission Denied</Heading>
   }

    return (
        <Flex
            paddingBottom={'250px'} 
            maxWidth={'900px'} 
            width={'100%'} 
            marginTop={'30px'} 
            flexDirection={'column'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
        >
            <Heading width={'100%'} as={'h2'} paddingY={'10px'} fontSize={'lg'}>Admin Dashboard</Heading>
            { children }
        </Flex>
    );
}
