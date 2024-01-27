import {
Flex, 
Heading,
Card,
CardHeader,
Text,
} from "@chakra-ui/react";

export default function UserPage() {
    return (
        <Flex width={'100%'}>
            <Card width={'100%'} borderRadius={'10px'} variant={'elevated'}>
                <CardHeader>
                    <Heading size={'sm'} marginBottom={'5px'}>Team Members</Heading>
                    <Text>{"Invite or manage your organisation's team members"}</Text>
                </CardHeader>
            </Card>
        </Flex>
    );
}
