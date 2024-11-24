'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const pinValidation = async (pin: string, companySlug: string) => {
    // Ensure the user is authenticated
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado', // Message for unauthenticated users
        };
    }

    try {
        // Check if the PIN exists and is valid for the user
        const userWithPin = await prisma.pin.findFirst({
            where: {
                pin: pin,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        Cards: {
                            where: {
                                company: {
                                    slug: companySlug, // Filter by companySlug
                                },
                            },
                            select: {
                                id: true,
                                points: true,
                                favourite: true,
                                active: true,
                                company: {
                                    select: {
                                        slug: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        // If the PIN does not exist or is invalid
        if (!userWithPin) {
            return {
                ok: false,
                message: 'PIN inválido', // Message for invalid PIN
            };
        }

        // If no cards exist for the given companySlug, return an error
        if (userWithPin.user.Cards.length === 0) {
            return {
                ok: false,
                message: 'El usuario no tiene esta tarjeta asociada', // Message for no cards found
            };
        }

        // Update the PIN state to "IN_USE" instead of deleting it
        await prisma.pin.update({
            where: { id: userWithPin.id },
            data: {
                state: 'IN_USE', // Set state to IN_USE
            },
        });

        // Return user data and filtered cards
        return {
            ok: true,
            message: 'PIN validado correctamente', // Success message
            user: {
                name: userWithPin.user.name,
                lastName: userWithPin.user.lastName,
                userId: userWithPin.user.id,
                cards: userWithPin.user.Cards,
            },
        };
    } catch (error) {
        console.error('Error during PIN validation:', error);

        return {
            ok: false,
            message: 'Error al validar el PIN', // Message for unexpected errors
        };
    }
};
