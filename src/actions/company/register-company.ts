'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config( process.env.CLOUDINARY_URL ?? '' )

const companySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(255),
    activityTypeId: z.string().uuid(),
    backgroundColor: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
    lat: z.number().min(-90).max(90), 
    lng: z.number().min(-180).max(180), 
    openDays: z.string().min(3).max(255),
    openHours: z.string().min(3).max(255),
});


export const registerCompany = async (formData: FormData) => {

    const session = await auth();
    const userId = session?.user.id

    const data = Object.fromEntries(formData);
    const companyParsed = companySchema.safeParse(data);

    if (!companyParsed.success) {
        console.log(companyParsed.error);
        return { ok: false }
    }

    const company = companyParsed.data;

    const { id, ...rest } = company;



    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const company = await prisma.company.create({
            data: {
                ...rest,
                userId: userId
            }
        })

        // Proceso de carga y guardado de imagenes

        const companyLogo = await uploadLogo(formData.get('logo') as File);

        if (!companyLogo) {
            throw new Error('No se pudo cargar las imágenes, rollingback'); //Salta este error
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
            message: 'Company created'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create Company'
        }
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