"use client" 

import { Flex, Menu, MenuButton, MenuList, MenuItem, Heading, Button, Box, Center, CircularProgress } from "@chakra-ui/react";
import { HiOutlineLogout } from 'react-icons/hi';
import { GoChevronDown } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import getUserProfile from "@/util/db/getUserProfile";
import type { TypeUserProfile } from "@/util/db/getUserProfile";
import signoutUser from "@/util/auth/signoutUser";

export default function DashboardLayout({ children } : { children : React.ReactNode }) {

    const [ UserProfile, setUserProfile ] = useState<TypeUserProfile | null >(null);

    useEffect( () => {
        const loadUserProfile = async () => {
            const data = await getUserProfile();
            setUserProfile(data);
        }
        loadUserProfile();
    }, []);

    const router = useRouter();
    const handleLogout = () => {
        signoutUser();
        router.push('/auth/login');
    }

    if( UserProfile === null ) {
        return (
            <Center width={'100%'} height={'100vh'}>
                <CircularProgress isIndeterminate size={'70px'} />
            </Center>
        );
    }

    return (
        <Flex
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'100%'}
            height={'100vh'}
        >
            <Flex 
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
                paddingX={'30px'}
                boxShadow={'base'}
            >
                <Flex width={'500px'}>
                    <Box paddingY={'15px'} paddingRight={'10px'} width={'200px'} borderRightWidth={'2px'} borderRightColor={'#ebebeb'}>
                        <Heading size={'sm'}>Budget Buddy</Heading>
                    </Box>
                    <Flex width={'100%'} paddingX={'30px'} justifyContent={'space-between'} alignItems={'center'}>
                        <Button size={'sm'} variant={'link'} color={'black'}>Home</Button>
                        <Button size={'sm'} variant={'link'} color={'black'}>Budgets</Button>
                        <Button size={'sm'} variant={'link'} color={'black'}>Admin</Button>
                    </Flex>
                </Flex>
               <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<GoChevronDown />}
                        backgroundColor={'white'}
                    >
                        { UserProfile !== null ? UserProfile.first_name : null }
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem color={"red"} icon={<HiOutlineLogout/>} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
               </Menu>
            </Flex>
            <Center>
                { children }
            </Center>
        </Flex>
    );
}
