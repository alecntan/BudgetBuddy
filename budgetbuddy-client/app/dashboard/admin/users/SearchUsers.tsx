"use client"

import {
Card,
CardBody,
Text,
Flex,
Input,
Button,
CheckboxGroup,
Checkbox,
Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

const SearchUsers = ({ onSubmit } : { onSubmit : ( searchParams : { name : string; roles: ( string | number )[] } ) => void }) => {

    const [ inputValue, setInputValue ] = useState<string>("");
    const handleInputChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
            setInputValue(e.target.value);
    };

    const [ checkboxValues, setCheckboxValues ] = useState<(string | number)[]>(['admin', 'director', 'manager', 'associate'])


    const handleSubmit = () => {  
        let searchString = "";
        if( inputValue !== "" ) {
            const tokens = inputValue.trim().split(" ");   
            const allTokensWithQuotes = tokens.map((token) => {return `'${token}'`});
            searchString = allTokensWithQuotes.join(" | ");
        }
        onSubmit({ name : searchString, roles : checkboxValues });
    };

    const handleReset = () => {
        setInputValue("");
        setCheckboxValues(['admin',  'director', 'manager', 'associate']);
        onSubmit({ name : "", roles: [ "admin", "director", "manager", "associate" ]});
    };

    return (
        <Card width={'100%'} borderRadius={'10px'} variant={'elevated'}>
            <CardBody>
                <Text fontWeight={'bold'}>Search and Filter Users</Text>
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Input value={inputValue} onChange={handleInputChange} width={'100%'} />
                    <Button onClick={handleSubmit} marginLeft={'5px'}>Search</Button>
                </Flex>
                <Flex marginTop={'10px'} width={'100%'} justifyContent={'space-between'} alignItems={'flex-end'}>
                     <CheckboxGroup defaultValue={checkboxValues} value={checkboxValues} onChange={setCheckboxValues}>
                        <Stack spacing={[1, 5]} direction={['column', 'row']} marginTop={'10px'}>
                            <Checkbox value={'admin'}>Admin</Checkbox>
                            <Checkbox value={'director'}>Director</Checkbox>
                            <Checkbox value={'manager'}>Manager</Checkbox>
                            <Checkbox value={'associate'}>Associate</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                    <Button size={'sm'} variant={'ghost'} onClick={handleReset} marginRight={'10px'} >Reset</Button>
                </Flex>
            </CardBody>
        </Card>
    );

};
export default SearchUsers;
