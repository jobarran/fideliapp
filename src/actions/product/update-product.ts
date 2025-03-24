'use server';

import { auth } from "@/auth.config";
import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const templateSchema = z.object({
    id: z.string().uuid(),
    description: z.string().nullable(),
    points: z.number().min(0),
    type: z.enum(['BUY', 'REWARD']),
});

const productSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255),
    description: z.string().nullable(),
    active: z.boolean(),
    templates: z.array(templateSchema),
});

export const updateProduct = async (product: Product, clientId: string) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId || userId !== clientId) {
        return { ok: false, message: 'No autorizado para actualizar este producto.' };
    }

    const parsedProduct = productSchema.safeParse(product);
    if (!parsedProduct.success) {
        return { ok: false, message: 'Datos del producto inválidos.' };
    }

    const { id, name, description, active, templates } = parsedProduct.data;

    try {
        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return { ok: false, message: 'Producto no encontrado.' };
        }

        // Update the product
        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                active,
                templates: {
                    deleteMany: {},
                    create: templates.map((template) => ({
                        id: template.id,
                        description: template.description,
                        points: template.points,
                        type: template.type,
                    })),
                },
            },
        });

        // Update buyPoints and rewardPoints separately
        await prisma.$transaction(async (tx) => {
            // Assuming there's a related PointTransaction or related models to update
            for (const template of templates) {
                if (template.type === 'BUY') {
                    await tx.pointTransaction.updateMany({
                        where: {
                            cardId: clientId,
                            state: 'CONFIRMED',
                            type: 'BUY',
                        },
                        data: {
                            points: {
                                increment: template.points,
                            },
                        },
                    });
                }

                if (template.type === 'REWARD') {
                    await tx.pointTransaction.updateMany({
                        where: {
                            cardId: clientId,
                            state: 'CONFIRMED',
                            type: 'REWARD',
                        },
                        data: {
                            points: {
                                decrement: template.points,
                            },
                        },
                    });
                }
            }
        });

        revalidatePath(`/client/${clientId}`);
        return { ok: true, message: 'Producto actualizado exitosamente.' };
    } catch (error) {
        console.error('Error actualizando producto:', error);
        return { ok: false, message: 'Error interno del servidor.' };
    }
};
