'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const companySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(1).max(255),
    description: z.string().min(3).max(1000),
    slug: z.string().min(3).max(255),
    activityTypeId: z.string().uuid(),
    backgroundColor: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
    lat: z.preprocess((val) => parseFloat(val as string), z.number()),
    lng: z.preprocess((val) => parseFloat(val as string), z.number()),
    openHours: z.record(z.object({
        from: z.string(),
        to: z.string(),
        closed: z.boolean(),
    })).optional().default({}), // Default to empty object
});

export const registerCompany = async (formData: FormData) => {

    
    const session = await auth();
    const userId = session?.user.id;
    
    // Use a Record type to ensure types are correctly asserted
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);
    
    
    // Parse openHours from JSON string back to an object if it exists
    if (data.openHours) {
        data.openHours = JSON.parse(data.openHours as string);
    }
    
    const companyParsed = companySchema.safeParse(data);
    
    if (!companyParsed.success) {
        return { ok: false };
    }
    
    const companyData = companyParsed.data;
    
    
    const { openHours, slug, ...rest } = companyData; // Destructure and remove `id`

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Check if the slug already exists
        const existingCompany = await prisma.company.findUnique({
            where: { slug: slug },
        });

        if (existingCompany) {
            return {
                ok: false,
                message: 'Slug already exists, please choose another.',
            };
        }

        const company = await prisma.company.create({
            data: {
                name: rest.name,
                userId: userId,
                slug: slug,
                backgroundColor: rest.backgroundColor,
                address: rest.address,
                lat: rest.lat,
                lng: rest.lng,
                activityTypeId: rest.activityTypeId,
                openHours: openHours,
                description: rest.description
            }
        });

        // Update user role to "CLIENT"
        await prisma.user.update({
            where: { id: userId },
            data: { role: "CLIENT" },
        });

        // Process for uploading and saving images
        const companyLogo = await uploadLogo(formData.get('logo') as File);

        if (companyLogo) {
            await prisma.companyLogo.create({
                data: {
                    url: companyLogo,
                    companyId: company.id,
                }
            });
        } else {
            console.warn('No logo uploaded. Company created without logo.');
        }

        revalidatePath('/admin/companies');

        return {
            ok: true,
            company: company,
            message: companyLogo 
                ? 'Company created with logo.'
                : 'Company created without logo. Logo was not provided.',
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot create Company',
        };
    }
}

const uploadLogo = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
        return result.secure_url;

    } catch (error) {
        console.log(error);
        return null;
    }
};
