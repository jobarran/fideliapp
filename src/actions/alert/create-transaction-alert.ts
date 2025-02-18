'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface CreateAlertProps {
  userId: string;
  companyId: string;
  pointTransactionId: string;
  type: string; // Type of alert (e.g., "transaction", "reward", etc.)
}

export const createTransactionAlert = async ({
  userId,
  companyId,
  pointTransactionId,
  type,
}: CreateAlertProps) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    // Create a new alert for the user after the transaction
    const newAlert = await prisma.alert.create({
      data: {
        userId,
        companyId,
        type,
        status: 'NOT_SEEN', // New alerts are initially "NOT_SEEN"
        pointTransactionId, // Associate the alert with the point transaction
      },
    });

    return {
      ok: true,
      alert: newAlert,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error al crear la alerta',
    };
  }
};
