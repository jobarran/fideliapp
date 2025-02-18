'use server';

import prisma from '@/lib/prisma';
import { TransactionType } from "@prisma/client";
import { revalidatePath } from 'next/cache';

interface CreateManualTransactionInput {
    cardId: string;
    type: TransactionType; // expected to be MANUAL
    companySlug: string;
    points: number;
    description: string;
}

interface CreateProductTransactionInput {
    cardId: string;
    type: TransactionType; // expected to be BUY or REWARD
    companySlug: string;
    transactionProduct: {
        quantity: number;
        productPoints: number;
        productName: string;
        productId: string;
    }[];
}

export type CreateTransactionInput =
    | CreateManualTransactionInput
    | CreateProductTransactionInput;

export async function createNewTransaction(input: CreateTransactionInput) {

    const { cardId, type, companySlug } = input;

    // Ensure the card exists and is active.
    const card = await prisma.card.findUnique({
        where: { id: cardId },
        include: { user: true, company: true },
    });

    if (!card || !card.active) {
        return { success: false, message: "The specified card does not exist or is inactive." };
    }

    if (type === TransactionType.MANUAL) {
        // Branch for MANUAL transactions.
        const manualInput = input as CreateManualTransactionInput;
        if (typeof manualInput.points !== 'number') {
            return { success: false, message: "Points are required for manual transactions." };
        }
        const manualPoints = manualInput.points;
        const manualDescription = manualInput.description
        // Create the point transaction without transactionProducts.
        const transaction = await prisma.pointTransaction.create({
            data: {
                cardId,
                points: manualPoints,
                type,
                description: manualDescription
            },
        });

        // Update the card's points balance.
        await prisma.card.update({
            where: { id: cardId },
            data: { points: card.points + manualPoints },
        });

        // Revalidate the company's path.
        revalidatePath(`/companies/${companySlug}`);

        return {
            success: true,
            message: "Transaction created successfully.",
            transaction,
        };

    } else {
        // Branch for product-based transactions (BUY or REWARD).
        const productInput = input as CreateProductTransactionInput;
        if (!productInput.transactionProduct || productInput.transactionProduct.length === 0) {
            return { success: false, message: "At least one product is required for this transaction." };
        }

        // Validate that all provided product IDs exist.
        const productIds = productInput.transactionProduct.map((p) => p.productId);
        const existingProducts = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (existingProducts.length !== productInput.transactionProduct.length) {
            return { success: false, message: "One or more products do not exist." };
        }

        // Calculate the total points.
        const totalPoints = productInput.transactionProduct.reduce(
            (sum, p) => sum + p.quantity * p.productPoints,
            0
        );

        // Create the point transaction with the related transactionProducts.
        const transaction = await prisma.pointTransaction.create({
            data: {
                cardId,
                points: totalPoints,
                type,
                transactionProducts: {
                    create: productInput.transactionProduct.map(({ productId, quantity, productName, productPoints }) => ({
                        quantity,
                        productName,
                        productPoints,
                        productId,
                    })),
                },
            },
        });

        // Update the card's points balance.
        await prisma.card.update({
            where: { id: cardId },
            data: { points: card.points + totalPoints },
        });

        // Create alert for user
        await prisma.alert.create({
            data: {
                userId: card.userId,
                companyId: card.companyId,
                type: 'COMMENT_PENDING',
                status: 'NOT_SEEN',
                pointTransactionId: transaction.id,
            },
        });

        // Revalidate the company's path.
        revalidatePath(`/companies/${companySlug}`);

        return {
            success: true,
            message: "Transaction created successfully.",
            transaction,
        };
    }
}