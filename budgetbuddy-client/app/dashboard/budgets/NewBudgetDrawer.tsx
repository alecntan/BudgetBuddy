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
Text,
Card,
CardBody,
StackDivider,
} from '@chakra-ui/react';
import SubmitButton from '@/components/SubmitButton';
import { useState } from 'react';

export default function NewBudgetDrawer({ show, toggleShow } : { show : boolean, toggleShow : () => void }) {  

    
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
                <form>
                    <FormControl>
                        <DrawerCloseButton />
                        <DrawerHeader>Create New Budget</DrawerHeader>
                        <DrawerBody>
                            <Stack direction={'column'} spacing={'20px'}>
                                <Box>
                                    <FormLabel>Name</FormLabel>
                                    <Input type={'text'} name={'form_label'} />
                                </Box>
                                <Box>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea />
                                </Box>
                                <Box>
                                    <FormLabel>Add Directors</FormLabel>
                                    <SearchAndSelectUsers />
                               </Box>
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button onClick={toggleShow} mr={'10px'}>Cancel</Button>
                            <SubmitButton />
                        </DrawerFooter>
                    </FormControl>
                </form>
            </DrawerContent>
        </Drawer>
    ); 
}


const SearchAndSelectUsers = () => {


    const [ showList, setShowList ] = useState<boolean>(false);
    
    const handleOnInputFocus = () => {
        setShowList(true);
    };

    const handleOnInputBlur = () => {
        setShowList(false);
    };

    return (
        <Box width={'100%'}>
            <Input position={'relative'} onFocus={handleOnInputFocus} onBlur={handleOnInputBlur}/>
            <Card display={ showList ? 'block' : 'none' } zIndex={'1'} width={'400px'} height={'250px'} variant={'elevated'} position={'absolute'}> 
                <CardBody>
                    <Stack shouldWrapChildren={true} overflow={'scroll'} height={'200px'} direction={'column'} divider={<StackDivider />}>
                        {[...new Array<number>(20)].map((value, index) =>  <Text key={index}>{`${value}`}</Text>)}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

