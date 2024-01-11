"use client"

import { Heading, Button } from "@chakra-ui/react"
import { getBrowserClient } from "@/util/getSupabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {

    const supabase = getBrowserClient();
    const router = useRouter();
    const handleLogout = () => {
        supabase.auth.signOut();
        router.push("/auth/login");
    }

    return (
        <>
           <Heading>This is the Home Page </Heading>
           <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}
