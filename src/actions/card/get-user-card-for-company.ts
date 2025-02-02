'use server';

import { auth } from '@/auth.config';
import { Card, CardProfile } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getUserCardForCompany = async (slug: string): Promise<{
    card: CardProfile | null
    userId: string | null
}> => {
    const session = await auth();

    if (!session?.user) {
        return { card: null, userId: null }; // Return false and null if the user is not authenticated
    }

    try {
        const card = await prisma.card.findFirst({
            where: {
                userId: session.user.id,
                company: {
                    slug: slug,
                },
            },
            select: {
                id: true,
                points: true,
                favourite: true,
                active: true,
                userId: true,
                companyId: true,
                History: {
                    select: {
                        id: true,
                        points: true,
                        date: true,
                        type: true,
                        cardId: true,
                        state: true,
                        products: {select: {name:true}}
                    },
                },
            },
        });


        // Return the existence of the card and its ID
        return {
            card,
            userId: session.user.id
        };
    } catch (error) {
        console.log(error);
        return { card: null, userId: null }; // Return false and null in case of an error
    }
};
