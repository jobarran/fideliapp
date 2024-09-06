'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getCompanyIdByUserCard = async (): Promise<string[]> => {
    const session = await auth();

    if (!session?.user) {
        return []; // Return an empty array if not authenticated
    }

    try {
        const cards = await prisma.card.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                company: {
                    select: {
                        slug: true,
                    },
                },
            }
        });

        // Extract company IDs from the cards
        const companyIds = cards.map(card => card.company.slug);

        return companyIds;
    } catch (error) {
        console.log(error);
        return []; // Return an empty array in case of an error
    }
};
