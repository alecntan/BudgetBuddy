"use client" 

import { Flex, Menu, MenuButton, MenuList, MenuItem, Center, Heading, Button, Box } from "@chakra-ui/react";
import { HiOutlineLogout } from 'react-icons/hi';
import { GoChevronDown } from 'react-icons/go';
import { getBrowserClient } from "@/util/getSupabaseClient";
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children } : { children : React.ReactNode }) {

    const supabase = getBrowserClient();
    const router = useRouter();
    const handleLogout = () => {
        supabase.auth.signOut();
        router.push('/auth/login');
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
                        John
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
