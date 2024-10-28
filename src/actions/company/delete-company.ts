'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCompany = async (slug: string) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Find the existing company by its slug
        const existingCompany = await prisma.company.findUnique({
            where: { slug },
            include: {
                CompanyLogo: true, // Include associated CompanyLogo
                Cards: { include: { History: true } }, // Include associated Cards and PointTransactions
                Products: { include: { templates: true, ProductImage: true } } // Include associated Products, templates, and ProductImage
            },
        });

        if (existingCompany) {
            // Delete associated CompanyLogo if it exists
            if (existingCompany.CompanyLogo) {
                await prisma.companyLogo.delete({
                    where: { id: existingCompany.CompanyLogo.id },
                });
            }

            // Delete all PointTransaction records associated with each Card
            for (const card of existingCompany.Cards) {
                await prisma.pointTransaction.deleteMany({
                    where: { cardId: card.id },
                });
            }

            // Delete all Cards associated with the company
            await prisma.card.deleteMany({
                where: { companyId: existingCompany.id },
            });

            // Delete PointTransactionTemplates and ProductImages for each Product
            for (const product of existingCompany.Products) {
                if (product.ProductImage) {
                    await prisma.productImage.delete({
                        where: { id: product.ProductImage.id },
                    });
                }
                await prisma.pointTransactionTemplate.deleteMany({
                    where: { productId: product.id },
                });
            }

            // Delete all Products associated with the company
            await prisma.product.deleteMany({
                where: { companyId: existingCompany.id },
            });

            // Finally, delete the company itself
            await prisma.company.delete({
                where: { id: existingCompany.id },
            });

            // Revalidate the path for the deleted company
            revalidatePath(`/client/${slug}`);

            return {
                ok: true,
                message: 'Company and all related data deleted successfully',
            };
        } else {
            return {
                ok: false,
                message: 'Company does not exist with the provided slug',
            };
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Cannot delete Company and related data',
        };
    }
};
