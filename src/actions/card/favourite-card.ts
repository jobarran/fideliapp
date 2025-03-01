'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const favouriteCard = async (cardId: string, favourite: boolean) => {

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
        const existingCard = await prisma.card.findUnique({
            where: { id: cardId },
        });

        if (existingCard) {
            // If company exists, update it
            const updatedCard = await prisma.card.update({
                where: { id: cardId },
                data: {
                    favourite: favourite
                }
            });

            revalidatePath(`/cards/${cardId}`);
            revalidatePath(`/user/${userId}`);
            revalidatePath(`/`);

            return {
                ok: true,
            };

        } else {
            return {
                ok: false,
                message: 'Card does not exist with the provided id',
            };
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Cannot update Card',
        };
    }
};