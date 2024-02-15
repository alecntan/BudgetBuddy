import { Button, ButtonProps } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton( props : ButtonProps) {
    const { pending } = useFormStatus();
    return <Button isLoading={pending} loadingText={"Submitting"} colorScheme={'teal'} type='submit' { ...props }>Submit</Button>;
}
