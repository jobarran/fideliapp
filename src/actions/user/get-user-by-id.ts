'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getUserById = async (id: string) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado',
        };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                role: true,
                active: true,
                Company: {
                    select: {
                        name: true,
                        backgroundColor: true,
                        slug: true,
                        activityTypeId: true,
                    },
                },
                Cards: {
                    select: {
                        id: true,
                        points: true,
                        company: {
                            select: {
                                name: true,
                                backgroundColor: true,
                                slug: true,
                                activityTypeId: true,
                            },
                        },
                        History: {
                            select: {
                                id: true, // Ensure this is selected
                                points: true, // Ensure this is selected
                                date: true, // Ensure this is selected
                                reason: true, // Ensure this is selected
                                type: true, // Ensure this is selected
                                cardId: true, // Ensure this is selected
                            },
                        },
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) throw `No encontramos un usuario con este id:${id}`;

        return {
            ok: true,
            user,
        };
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'Error al obtener los datos del usuario',
        };
    }
};
