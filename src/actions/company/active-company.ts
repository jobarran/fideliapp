'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export const activeCompany = async (slug: string, active: boolean) => {

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Check if the company exists by slug
        const existingCompany = await prisma.company.findUnique({
            where: { slug: slug },
        });

        if (existingCompany) {
            // Update the company's active status directly
            const updatedCompany = await prisma.company.update({
                where: { slug: slug },
                data: {
                    active,  // Simply assign the boolean value
                },
            });

            // Revalidate the path
            revalidatePath(`/client/${slug}`);

            return {
                ok: true,
                company: updatedCompany,
                message: 'Company updated successfully',
            };
        } else {
            return {
                ok: false,
                message: 'Company does not exist with the provided slug',
            };
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Cannot update Company',
        };
    }
};
