'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const pinValidation = async (pin: string, companySlug: string) => {
    console.log(pin);

    // Ensure the user is authenticated
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado', // Message for unauthenticated users
        };
    }

    try {
        // Find the PIN and its associated Card and User
        const userWithPin = await prisma.pin.findFirst({
            where: {
                pin: pin,
                card: {
                    company: {
                        slug: companySlug, // Ensure the company matches
                    },
                    userId: session.user.id, // Ensure the card belongs to the authenticated user
                },
            },
            include: {
                card: {
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
                        user: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });

        // If the PIN does not exist or is not valid for the user
        if (!userWithPin || !userWithPin.card) {
            return {
                ok: false,
                message: 'PIN inválido o no asociado a esta empresa', // Message for invalid PIN
            };
        }

        // Update the PIN state to "IN_USE"
        await prisma.pin.update({
            where: { id: userWithPin.id },
            data: {
                state: 'IN_USE',
            },
        });

        // Return user data and associated card
        return {
            ok: true,
            message: 'PIN validado correctamente', // Success message
            user: {
                name: userWithPin.card.user.name,
                lastName: userWithPin.card.user.lastName,
                userId: userWithPin.card.user.id,
            },
            card: {
                id: userWithPin.card.id,
                points: userWithPin.card.points,
                favourite: userWithPin.card.favourite,
                active: userWithPin.card.active,
                company: {
                    slug: userWithPin.card.company.slug,
                    name: userWithPin.card.company.name,
                },
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
