import {
Drawer,
DrawerOverlay,
DrawerContent,
DrawerHeader,
DrawerBody,
DrawerFooter,
DrawerCloseButton,
FormControl,
FormLabel,
Input,
Textarea,
Button,
Stack,
Box,
Tag,
} from '@chakra-ui/react';
import SubmitButton from '@/components/SubmitButton';
import { useContext } from 'react';
import { ProfileContext } from '../../ProfileContext';
import FormWithToast from '@/components/FormWithToast';
import createBudget from '@/actions/budgets/createBudget';

export default function NewBudgetDrawer({ show, toggleShow } : { show : boolean, toggleShow : () => void }) {  

    const userProfile = useContext(ProfileContext);

    return (
        <Drawer 
            isOpen={show}
            placement={'right'}
            onClose={toggleShow}
            size={'lg'}
            closeOnOverlayClick={false}
        >
            <DrawerOverlay />
            <DrawerContent>
                <FormWithToast toastTitle={"Create Budget"} onSubmit={createBudget}>
                    <FormControl isRequired>
                        <DrawerCloseButton />
                        <DrawerHeader>Create New Budget</DrawerHeader>
                        <DrawerBody>
                            <Stack direction={'column'} spacing={'20px'}>
                                <Box> 
                                    <FormLabel>Owner</FormLabel>
                                    <Tag variant={'solid'} colorScheme={'teal'}>{`${userProfile?.first_name} ${userProfile?.last_name}`}</Tag>
                                </Box>
                                <Box>
                                    <FormLabel>Name</FormLabel>
                                    <Input type={'text'} name={'budget-name'} />
                                </Box>
                                <Box>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea name={'budget-description'} />
                                </Box>
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button onClick={toggleShow} mr={'10px'}>Cancel</Button>
                            <SubmitButton />
                        </DrawerFooter>
                    </FormControl>
                </FormWithToast>
            </DrawerContent>
        </Drawer>
    ); 
}
