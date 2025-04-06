'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Prisma, TransactionType } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

// Define Zod schema for CreateProductParams
const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    companyId: z.string().uuid("Invalid company ID format"),
    imageFile: z.instanceof(File).nullable().optional(),
    buyPoints: z.number().positive().optional(),
    rewardPoints: z.number().positive().optional(),
    free: z.coerce.boolean().optional(),
    productType: z.enum(["PRODUCT", "PROMOTION"] as const),
}).refine(
    (data) => ["PRODUCT", "PROMOTION"].includes(data.productType),
    { message: "Invalid product type", path: ["productType"] }
);

export const createNewProduct = async (params: unknown) => {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { ok: false, message: 'You must be authenticated.' };
    }


    // Convert FormData to a plain object and handle types
    const formData = params as FormData;
    const parsedParams = {
        name: formData.get("name") as string,
        description: formData.get("description") as string || '',
        companyId: formData.get("companyId") as string,
        productType: formData.get("productType") as "PRODUCT" | "PROMOTION", // Extract productType
        imageFile: formData.get("image") as File | null,
        buyPoints: parseFloat(formData.get("buyPoints") as string) || undefined,
        rewardPoints: parseFloat(formData.get("rewardPoints") as string) || undefined,
        free: formData.get("free") === 'true'
    };

    const validatedParams = createProductSchema.safeParse(parsedParams);
    if (!validatedParams.success) {
        console.error('Validation Errors:', validatedParams.error.errors); // Log validation errors
        return {
            ok: false,
            message: "Invalid input data",
            errors: validatedParams.error.errors,
        };
    }

    const { name, description, companyId, buyPoints, rewardPoints, productType, free = false, } = validatedParams.data;

    try {
        const productData: Prisma.ProductCreateInput = {
            name,
            description,
            active: true,
            productType,
            company: { connect: { id: companyId } },
        };

        const product = await prisma.product.create({ data: productData });

        // Process for uploading and saving images
        const imageFile2 = await uploadImage(formData.get('imageFile') as File);

        if (imageFile2) {
            await prisma.productImage.create({
                data: {
                    url: imageFile2,
                    productId: product.id,
                }
            });
        } else {
            console.warn('No image uploaded. Product created without image.');
        }

        // Handle point transaction templates
        const transactionTemplates: Prisma.PointTransactionTemplateCreateManyInput[] = [];

        transactionTemplates.push({ points: buyPoints || 0, type: TransactionType.BUY, productId: product.id, free: false });
        transactionTemplates.push({ points: rewardPoints || 0, type: TransactionType.REWARD, productId: product.id, free: free });

        if (transactionTemplates.length) {
            await prisma.pointTransactionTemplate.createMany({ data: transactionTemplates });
        }

        revalidatePath(`/client/${userId}`);
        return { ok: true, product, message: 'Product created successfully' };

    } catch (error) {
        console.error(error);
        return { ok: false, message: 'Product creation failed' };
    }
};

// Helper function to handle image upload
const uploadImage = async (image: File): Promise<string | null> => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
        return result.secure_url;
    } catch (error) {
        console.error('Image upload failed', error);
        return null;
    }
};
