'use server';

import prisma from "@/lib/prisma";

export const deletePin = async (pin: string) => {
    try {
        await prisma.pin.delete({
            where: {
                pin: pin,
            },
        });
    } catch (error) {
        console.error('Error deleting pin:', error);
        throw new Error('Failed to delete pin');
    }
};
