'use server';

import prisma from "@/lib/prisma";

export const generatePin = async (userId: string, companyId: string) => {
  try {
    console.log('generating');

    let pin: string;
    let existingPin: any;

    // Generate a new 4-digit PIN and check if it exists in the database
    do {
      pin = Math.floor(1000 + Math.random() * 9000).toString();

      // Check if the generated PIN already exists
      existingPin = await prisma.pin.findFirst({
        where: {
          pin,
          userId,
          companyId
        },
      });
    } while (existingPin); // Keep generating until a unique PIN is found

    // Set expiration time for 10 minutes
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Store the pin in the database
    const createdPin = await prisma.pin.create({
      data: {
        pin,
        expiresAt,
        userId,
        companyId,
      },
    });

    return createdPin; // Return the whole createdPin object
  } catch (error) {
    console.error('Error generating pin:', error);
    throw new Error('Failed to generate pin');
  }
};
