'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const checkUserCardForCompany = async (slug: string): Promise<{ userCardForCompany: boolean; cardId: string | null; userId: string | null; cardPoints: number | null }> => {
    const session = await auth();

    if (!session?.user) {
        return { userCardForCompany: false, cardId: null, userId: null, cardPoints: null }; // Return false and null if the user is not authenticated
    }

    try {
        const card = await prisma.card.findFirst({
            where: {
                userId: session.user.id,
                company: {
                    slug: slug,
                },
            },
        });

        // Return the existence of the card and its ID
        return { userCardForCompany: !!card, cardId: card?.id ?? null, userId: session.user.id, cardPoints: card?.points ?? null };
    } catch (error) {
        console.log(error);
        return { userCardForCompany: false, cardId: null, userId: null, cardPoints:null }; // Return false and null in case of an error
    }
};
