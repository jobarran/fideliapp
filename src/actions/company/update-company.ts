'use server';

import { auth } from "@/auth.config";
import { CompanyClientDashboard } from "@/interfaces";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const companySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(1).max(255),
    slug: z.string().min(3).max(255),
    activityTypeId: z.string().uuid(),
    description: z.string().min(3).max(1000),
    backgroundColor: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
    lat: z.preprocess((val) => parseFloat(val as string), z.number()),
    lng: z.preprocess((val) => parseFloat(val as string), z.number()),
    instagram: z.string().min(0).max(100),
    facebook: z.string().min(0).max(100),
    twitter: z.string().min(0).max(100),
    whatsapp: z.string().min(0).max(100),
    phone: z.string().min(0).max(100),
    openHours: z.record(z.object({
        from: z.string(),
        to: z.string(),
        closed: z.boolean(),
    })).optional().default({}), // Default to empty object
});

export const updateCompany = async (editedCompany: CompanyClientDashboard) => {

    const session = await auth();
    const userId = session?.user.id;

    // Check if openHours is a string and parse it if necessary
    if (typeof editedCompany.openHours === 'string') {
        editedCompany.openHours = JSON.parse(editedCompany.openHours);
    }

    const companyParsed = companySchema.safeParse(editedCompany);

    if (!companyParsed.success) {
        return { ok: false, message: 'Validation failed' };
    }

    const companyData = companyParsed.data;
    const { openHours, slug, ...rest } = companyData;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Check if the company exists by slug
        const existingCompany = await prisma.company.findUnique({
            where: { slug: slug },
        });

        if (existingCompany) {
            const updatedCompany = await prisma.company.update({
                where: { slug: slug },
                data: {
                    backgroundColor: rest.backgroundColor,
                    activityTypeId: editedCompany.activityType.id,
                    openHours: openHours,
                    description: rest.description,
                    instagram: rest.instagram,
                    facebook: rest.facebook,
                    twitter: rest.twitter,
                    whatsapp: rest.whatsapp,
                    phone: rest.phone,
                }
            });

            revalidatePath(`/client/${editedCompany.slug}`);

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