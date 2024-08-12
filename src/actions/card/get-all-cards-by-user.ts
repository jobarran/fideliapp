'use server';

import prisma from '@/lib/prisma';

export const getAllCardsByUser = async (userId: string) => {
  try {
    const cards = await prisma.card.findMany({
      where: {
        userId,
      },
      include: {
        company: {
          select: {
            name: true,
            activityType: true,
            backgroundColor: true,
            CompanyLogo: true,
          },
        },
        user: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        company: {
          name: 'asc',
        },
      },
    });

    return cards;
  } catch (error) {
    console.log(error);
    return [];
  }
};
