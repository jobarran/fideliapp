'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const updateImageSchema = z.object({
    id: z.string(),
    logo: z.instanceof(File).optional(), // Expecting a File object for the logo
});

export const updateImage = async (formData: FormData) => {
    const session = await auth();
    const userId = session?.user.id;

    // Convert FormData to a Record type for easier handling
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    // Parse the incoming data
    const imageParsed = updateImageSchema.safeParse(data);

    if (!imageParsed.success) {
        return { ok: false, message: 'Invalid input data.' };
    }

    const productData = imageParsed.data;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged in.',
        };
    }

    try {
        // Check if the company exists using slug instead of id
        const existingProduct = await prisma.product.findUnique({
            where: { id: productData.id }, // Updated to use slug
        });

        if (!existingProduct) {
            return {
                ok: false,
                message: 'Product not found.',
            };
        }

        // Process for uploading the new logo if it exists
        const imageFile = formData.get('image') as File;

        // If a new logo is provided, upload it
        let productImageUrl: string | null = null; // Initialize as null
        if (imageFile) {
            productImageUrl = await uploadLogo(imageFile);

            if (!productImageUrl) {
                throw new Error('Image upload failed.');
            }
        }

        // Check if there is an existing logo for the company
        const existingImage = await prisma.productImage.findUnique({
            where: { productId: existingProduct.id }, // Use existingCompany.id to find the logo
        });

        if (existingImage) {
            // Update the existing logo with the new URL if provided
            if (productImageUrl) {
                await prisma.productImage.update({
                    where: { id: existingImage.id }, // Use existingCompany.id
                    data: {
                        url: productImageUrl, // Only set the URL if it's not null
                    },
                });
            }
        } else {
            // Create a new logo if it doesn't exist and URL is available
            if (productImageUrl) {
                await prisma.productImage.create({
                    data: {
                        url: productImageUrl,
                        productId: existingProduct.id, // Use existingCompany.id
                    },
                });
            }
        }

        revalidatePath(`/client/${userId}/products`); // Revalidate with the correct slug

        return {
            ok: true,
            message: 'Image updated successfully.',
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
