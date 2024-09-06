'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createNewCard = async (slug: string): Promise<string | null> => {

    const session = await auth();

    if (!session?.user) {
        return null; // Return null if the user is not authenticated
    }

    try {
        // Fetch the company based on the provided slug
        const company = await prisma.company.findUnique({
            where: { slug },
        });

        if (!company) {
            return null; // Return null if the company does not exist
        }

        // Create a new card
        const card = await prisma.card.create({
            data: {
                userId: session.user.id,
                companyId: company.id,
            },
        });

        revalidatePath(`/companies/${slug}`);

        // Return the ID of the newly created card
        return card.id;
    } catch (error) {
        console.log(error);
        return null; // Return null in case of an error
    }
};
