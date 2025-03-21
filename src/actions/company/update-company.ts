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
    textColor: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
    lat: z.preprocess((val) => parseFloat(val as string), z.number()),
    lng: z.preprocess((val) => parseFloat(val as string), z.number()),
    instagram: z.string().optional().nullable(),
    facebook: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    whatsapp: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    site: z.string().optional().nullable(),
    openHours: z.record(z.object({
        from: z.string(),
        to: z.string(),
        closed: z.boolean(),
    })).optional().default({}),
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
        console.log('Validation failed:', companyParsed.error.format());
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

    console.log(rest)

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
                    textColor: rest.textColor,
                    activityTypeId: editedCompany.activityType.id,
                    openHours: openHours,
                    description: rest.description,
                    instagram: rest.instagram,
                    facebook: rest.facebook,
                    twitter: rest.twitter,
                    whatsapp: rest.whatsapp,
                    phone: rest.phone,
                    site: rest.site,
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