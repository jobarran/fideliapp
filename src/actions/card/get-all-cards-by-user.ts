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

    return {
      ok: true,
      cards: cards
    };
  } catch (error) {
    console.log(error);
    return  {
      ok: false,
      message: 'Error fetching cards',
      error: (error as Error).message,
    };;
  }
};
