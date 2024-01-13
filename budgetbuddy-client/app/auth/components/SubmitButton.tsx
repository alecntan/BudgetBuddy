import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button isLoading={pending} loadingText={"Submitting"} colorScheme={'teal'} width={'100%'} type='submit'>Submit</Button>;
}
