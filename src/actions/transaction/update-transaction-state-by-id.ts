'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UpdateTransactionStateInput {
    transactionId: string;
    newState: "CONFIRMED" | "CANCELLED"; // Only accept these two states
}

export async function updateTransactionStateById(input: UpdateTransactionStateInput) {
    const { transactionId, newState } = input;

    // Find the transaction first to get the current points and card info
    const transaction = await prisma.pointTransaction.findUnique({
        where: { id: transactionId },
        include: { card: true }, // Include the related card to access points
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    // Calculate points change based on the new state
    let pointsDelta = 0;
    if (newState === "CANCELLED") {
        pointsDelta = -transaction.points; // Deduct points if cancelled
    } else if (newState === "CONFIRMED") {
        pointsDelta = transaction.points; // Add points if confirmed
    }

    // Update the transaction state and the card's points in a transaction
    await prisma.$transaction([
        prisma.pointTransaction.update({
            where: { id: transactionId },
            data: { state: newState },
        }),
        prisma.card.update({
            where: { id: transaction.cardId },
            data: { points: transaction.card.points + pointsDelta },
        }),
    ]);

    revalidatePath(`/client/${transaction.card.userId}`);

}
