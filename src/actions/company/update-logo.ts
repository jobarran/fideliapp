'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const updateLogoSchema = z.object({
    slug: z.string(),
    logo: z.instanceof(File).optional(), // Expecting a File object for the logo
});

export const updateLogo = async (formData: FormData) => {
    const session = await auth();
    const userId = session?.user.id;

    // Convert FormData to a Record type for easier handling
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    // Parse the incoming data
    const logoParsed = updateLogoSchema.safeParse(data);

    if (!logoParsed.success) {
        return { ok: false, message: 'Invalid input data.' };
    }

    const logoData = logoParsed.data;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged in.',
        };
    }

    try {
        // Check if the company exists using slug instead of id
        const existingCompany = await prisma.company.findUnique({
            where: { slug: logoData.slug }, // Updated to use slug
        });

        if (!existingCompany) {
            return {
                ok: false,
                message: 'Company not found.',
            };
        }

        // Process for uploading the new logo if it exists
        const logoFile = formData.get('logo') as File;

        // If a new logo is provided, upload it
        let companyLogoUrl: string | null = null; // Initialize as null
        if (logoFile) {
            companyLogoUrl = await uploadLogo(logoFile);

            if (!companyLogoUrl) {
                throw new Error('Image upload failed.');
            }
        }

        // Check if there is an existing logo for the company
        const existingLogo = await prisma.companyLogo.findUnique({
            where: { companyId: existingCompany.id }, // Use existingCompany.id to find the logo
        });

        if (existingLogo) {
            // Update the existing logo with the new URL if provided
            if (companyLogoUrl) {
                await prisma.companyLogo.update({
                    where: { companyId: existingCompany.id }, // Use existingCompany.id
                    data: {
                        url: companyLogoUrl, // Only set the URL if it's not null
                    },
                });
            }
        } else {
            // Create a new logo if it doesn't exist and URL is available
            if (companyLogoUrl) {
                await prisma.companyLogo.create({
                    data: {
                        url: companyLogoUrl,
                        companyId: existingCompany.id, // Use existingCompany.id
                    },
                });
            }
        }

        revalidatePath(`/client/${userId}`); // Revalidate with the correct slug

        return {
            ok: true,
            message: 'Logo updated successfully.',
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Failed to update logo.',
        };
    }
};

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
