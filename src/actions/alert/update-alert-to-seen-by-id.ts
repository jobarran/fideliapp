"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateAlertToSeenById(id: string) {

    if (!id) {
        throw new Error("Alert ID is required");
    }

    const updatedAlert = await prisma.alert.update({
        where: { id },
        data: { status: "SEEN" },
    });

    revalidatePath(`/`);

    return updatedAlert;
}
