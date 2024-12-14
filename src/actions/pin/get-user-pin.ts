'use server';

import prisma from '@/lib/prisma';
import { deletePin } from './delete-pin';

export const getUserPin = async (cardId: string | undefined) => {

  try {
    // If userId is null, return false immediately
    if (!cardId) {
      return {
        ok: false,
        message: 'No se proporcionó un ID de usuario',
      };
    }

    // Check if the PIN exists for the userS
    const userPin = await prisma.pin.findFirst({
      where: {
        cardId: cardId,
      },
    });

    // If the PIN does not exist or is invalid
    if (!userPin) {
      return {
        ok: false,
        message: 'Usuario sin PIN',
      };
    }

    // Check if the PIN has expired
    const currentDate = new Date();
    if (new Date(userPin.expiresAt) < currentDate) {
      // If expired, delete the pin
      deletePin(userPin.pin);
      return {
        ok: false,
        message: 'El PIN ha expirado',
      };
    }

    // Return success if the PIN is still valid
    return {
      ok: true,
      message: 'PIN recuperado', // Success message
      pin: userPin,
    };
  } catch (error) {
    console.error('Error during PIN searching:', error);

    return {
      ok: false,
      message: 'Error al buscar el PIN del usuario', // Message for unexpected errors
    };
  }
};
