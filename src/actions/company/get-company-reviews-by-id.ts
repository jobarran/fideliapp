'use server';

import prisma from '@/lib/prisma';

export const getCompanyReviewsByCompanyId = async (companyId: string) => {
    try {
        const reviews = await prisma.companyReview.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                pointTransaction: {
                    select: {
                        type: true,
                        description: true,
                        points: true,
                        transactionProducts: true,
                        card: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        lastName: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!reviews || reviews.length === 0) return null;

        // Map the data to include user details directly
        const reviewsWithUserDetails = reviews.map(review => {
            const user = review.pointTransaction?.card?.user;
            return {
                ...review,
                user: {
                    name: user.name,
                    lastName: user.lastName,
                    id: user.id
                }
            };
        });

        return reviewsWithUserDetails;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener reseñas por companyId');
    }
};
