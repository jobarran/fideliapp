'use server';

import { auth } from "@/auth.config";
import { Company } from "@/interfaces";
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
                CompanyLogo: true, // Include the associated CompanyLogo
                Cards: true,       // Include associated Cards
            },
        });

        if (existingCompany) {
            // Delete associated CompanyLogo if it exists
            if (existingCompany.CompanyLogo) {
                await prisma.companyLogo.delete({
                    where: { id: existingCompany.CompanyLogo.id },
                });
            }

            // Delete all associated Cards
            await prisma.card.deleteMany({
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
                message: 'Company deleted successfully',
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
            message: 'Cannot delete Company',
        };
    }
};
