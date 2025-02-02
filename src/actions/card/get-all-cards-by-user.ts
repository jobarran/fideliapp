'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getAllCardsByUser = async () => {

  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: 'No authenticated'
    }
  }

  try {

    const cards = await prisma.card.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        points: true,
        favourite: true,
        active: true,
        userId: true,
        companyId: true,
        user: {
          select: {
            name: true,
            lastName: true,
          },
        },
        company: {
          select: {
            name: true,
            backgroundColor: true,
            slug: true,
            activityTypeId: true,
            CompanyLogo: {
              select: {
                id: true,
                url: true,
                companyId: true,
              },
            },
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
          },
        },
      },
      orderBy: {
        company: {
          name: 'asc',
        },
      },
    });

    return {
      ok: true,
      cards: cards
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error fetching cards',
      error: (error as Error).message,
    };;
  }
};
