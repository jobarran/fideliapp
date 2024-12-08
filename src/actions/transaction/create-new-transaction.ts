'use server';

import prisma from '@/lib/prisma';
import { sendEvent } from '@/lib/sse';
import { TransactionType } from "@prisma/client";
import { revalidatePath } from 'next/cache';

interface CreateTransactionInput {
    cardId: string;
    points: number;
    type: TransactionType;
    productIds?: string[]; // Optional product IDs for the transaction
    companySlug: string
}

export async function createNewTransaction(input: CreateTransactionInput) {

    const { cardId, points, type, companySlug, productIds = [] } = input;

    // Validate inputs
    if (!cardId || points === undefined || !type) {
        throw new Error("All fields are required: cardId, points, and type.");
    }

    if (type !== "MANUAL" && productIds.length === 0) {
        throw new Error("Product IDs are required for non-manual transactions.");
    }

    // Ensure the card exists and is active
    const card = await prisma.card.findUnique({
        where: { id: cardId },
        include: { user: true, company: true },
    });

    if (!card || !card.active) {
        throw new Error("The specified card does not exist or is inactive.");
    }

    // Ensure all products exist
    if (productIds.length > 0) {
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (products.length !== productIds.length) {
            throw new Error("One or more products do not exist.");
        }
    }

    // Create the transaction
    const transaction = await prisma.pointTransaction.create({
        data: {
            cardId,
            points,
            type,
            products: productIds.length > 0
                ? {
                    connect: productIds.map((id) => ({ id })),
                }
                : undefined, // No products for manual transactions
        },
    });


    // Update the card's points balance
    await prisma.card.update({
        where: { id: cardId },
        data: {
            points: card.points + points,
        },
    });

    revalidatePath(`/companies/${companySlug}`);

    return transaction;
}
