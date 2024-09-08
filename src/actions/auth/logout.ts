'use server';

import { signOut } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const logout = async () => {
    // Perform logout
    await signOut({ redirect: false });
    // revalidatePath('/');
    // redirect(`/`) // Navigate to the new post page

};