'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Prop {
    validate: boolean,
    companyId: string,
}

export const updateCompanyValidationAdmin = async ({ validate, companyId }: Prop) => {

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Check if the company exists by slug
        const existingCompany = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (existingCompany) {
            const updatedCompany = await prisma.company.update({
                where: { id: companyId },
                data: {
                    validated: validate
                }
            });

            revalidatePath(`/admin/companies`);

            return {
                ok: true,
                company: updatedCompany,
                message: 'Company updated successfully',
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
            message: 'Cannot update Company',
        };
    }
};