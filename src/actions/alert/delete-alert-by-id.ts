"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteAlertById(ids: string | string[]) {
    const idArray = Array.isArray(ids) ? ids : [ids];  // Convert to array if it's a single ID

    if (idArray.length === 0) {
        throw new Error("At least one Alert ID is required");
    }

    const updatedAlerts = await prisma.alert.deleteMany({
        where: {
            id: {
                in: idArray,  // Find alerts with the provided IDs
            },
        },
    });

    // Optionally, revalidate path if necessary
    revalidatePath(`/`);

    return updatedAlerts;
}
