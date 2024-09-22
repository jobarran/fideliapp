'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const companySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(255),
    slug: z.string().min(3).max(255), // Add slug with validation
    activityTypeId: z.string().uuid(),
    backgroundColor: z.string().min(3).max(255).nullable(),
    address: z.string().min(3).max(255).nullable(),
    lat: z.number().min(-90).max(90).nullable(),
    lng: z.number().min(-180).max(180).nullable(),
    openHours: z.array(z.object({
        day: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
        from: z.string(), // Define the expected structure
        to: z.string(),
    })).optional(), // Make it optional
});

export const registerCompany = async (formData: FormData) => {

    const session = await auth();
    const userId = session?.user.id;

    const data = Object.fromEntries(formData);
    const companyParsed = companySchema.safeParse(data);

    if (!companyParsed.success) {
        console.log(companyParsed.error);
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
                openHours: {
                    create: openHours ? 
                        openHours.map(({ day, from, to }) => ({
                            day,
                            from,
                            to,
                        })) : 
                        [], // Provide an empty array if openDays is not defined
                },
            }
        });

        // Process for uploading and saving images
        const companyLogo = await uploadLogo(formData.get('logo') as File);

        if (!companyLogo) {
            throw new Error('No se pudo cargar las imágenes, rolling back');
        }

        await prisma.companyLogo.create({
            data: {
                url: companyLogo,
                companyId: company.id,
            }
        });

        revalidatePath('/admin/companies');

        return {
            ok: true,
            company: company,
            message: 'Company created',
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
