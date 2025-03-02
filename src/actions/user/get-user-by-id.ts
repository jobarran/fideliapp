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
                        active: true,
                    },
                },
                Cards: {
                    select: {
                        id: true,
                        points: true,
                        favourite: true,
                        company: {
                            select: {
                                name: true,
                                backgroundColor: true,
                                slug: true,
                                activityTypeId: true,
                                CompanyLogo: true,
                                id: true,
                                active: true,
                            },
                        },
                        History: {
                            select: {
                                id: true,
                                points: true,
                                date: true,
                                type: true,
                                cardId: true,
                                state: true,
                                transactionProducts: {
                                    select: {
                                        id: true,
                                        productPoints: true,
                                        productName: true,
                                        quantity: true,
                                        productId: true,
                                    },
                                },
                                companyReview: {
                                    select: {
                                        id: true,
                                        rating: true,
                                        comment: true,
                                        pointTransactionId: true,
                                        companyId: true,
                                    }
                                }
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
