'use server';

import { auth } from '@/auth.config';
import { Alert } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getAlertsByUser = async (userId: string): Promise<{
  ok: boolean;
  message?: string;
  alerts?: Alert[];
}> => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  try {
    const alerts = await prisma.alert.findMany({
      where: {
        userId,
        status: {
          in: ["SEEN", "NOT_SEEN"],
        },
      },
      orderBy: [
        { status: 'asc' },  // Sort by 'NOT_SEEN' first (since 'asc' puts 'NOT_SEEN' before 'SEEN')
        { createdAt: 'desc' },  // Then sort by the most recent alerts first
      ],
      take: 10,  // Limit to the first 10 alerts
      select: {
        id: true,
        type: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        pointTransaction: true, // Includes all fields of PointTransaction
      },
    });

    if (!alerts.length) {
      return {
        ok: false,
        message: `No encontramos alertas para este usuario con id: ${userId}`,
      };
    }

    return {
      ok: true,
      alerts: alerts as Alert[], // Explicitly cast to the Alert interface
    };
  } catch (error) {
    console.error("Error al obtener alertas:", error);

    return {
      ok: false,
      message: 'Error al obtener las alertas del usuario',
    };
  }
};
