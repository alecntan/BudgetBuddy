"use client" 

import { Flex, Menu, MenuButton, MenuList, MenuItem, HStack, Heading, Button, Box, Center, CircularProgress } from "@chakra-ui/react";
import { HiOutlineLogout } from 'react-icons/hi';
import { GoChevronDown } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import { ProfileContext } from './ProfileContext';
import { createClient } from "@/util/supabase/client";
import getUserProfile from "@/actions/profiles/getUserProfile";
import type { UserProfile } from "@/types/budgetbuddy";


export default function DashboardLayout({ children } : { children : React.ReactNode }) {

    const [ UserProfile, setUserProfile ] = useState<UserProfile | null >(null);

    useEffect( () => {
        const loadUserProfile = async () => {
            const data = await getUserProfile();
            setUserProfile(data);
        }
        loadUserProfile();
    }, []);

    const router = useRouter();
    const supabase = createClient();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    }

    const onClickUsersButton = () => {
        router.push("/dashboard/admin/users");
    }

    const onClickBudgetsButton = () => {
        router.push("/dashboard/budgets");
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
                    <Box paddingY={'15px'} paddingRight={'30px'}  borderRightWidth={'2px'} borderRightColor={'#ebebeb'}>
                        <Heading size={'sm'}>Budget Buddy</Heading>
                    </Box>
                    <HStack paddingX={'30px'} spacing="50px">
                        <Button size={'sm'} variant={'link'} color={'black'}>Home</Button>
                        <Button size={'sm'} variant={'link'} color={'black'} onClick={onClickBudgetsButton}>Budgets</Button>
                        { UserProfile.user_role === 'admin' ? ( <Menu>
                            <MenuButton as={Button} size={'sm'} color={'black'} variant={'link'} rightIcon={<GoChevronDown />} backgroundColor={'white'}>
                               Admin 
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onClickUsersButton}>Users</MenuItem>
                            </MenuList>
                        </Menu> ) : null }
                    </HStack>
                </Flex>
               <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<GoChevronDown />}
                        backgroundColor={'white'}
                    >
                        { UserProfile !== null ? `${UserProfile.first_name} ${UserProfile.last_name}` : null }
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem color={"red"} icon={<HiOutlineLogout/>} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
               </Menu>
            </Flex>
            <Center width={'80%'} maxWidth={'1350px'}>
                <ProfileContext.Provider value={UserProfile}>
                    { children }
                </ProfileContext.Provider>
            </Center>
        </Flex>
    );
}
