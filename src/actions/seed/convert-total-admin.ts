'use server'

import prisma from "@/lib/prisma"; // Prisma client
import { revalidatePath } from "next/cache"; // For revalidation
import { z } from "zod";

interface Prop { userId: string; userRole: string; userPermission: string }

// Define Zod schema for validating user input
const updateRolePermissionSchema = z.object({
    userId: z.string().uuid(),
    userRole: z.enum(['USER', 'CLIENT', 'ADMIN']),
    userPermission: z.enum(['NONE', 'TOTAL']),
});


export const convertTotalAdmin = async (userData: Prop) => {

    // Validate the userData using the schema
    const parsedData = updateRolePermissionSchema.safeParse(userData);

    if (!parsedData.success) {
        return { ok: false, message: 'La validación falló' };
    }

    const { userId, userRole, userPermission } = parsedData.data;

    try {
        // Find the user to ensure they exist
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return {
                ok: false,
                message: 'El usuario no existe con el ID proporcionado',
            };
        }

        console.log(existingUser)


        // Prepare the data for updating the user
        const updatedUserData = {
            role: userRole,
            permission: userPermission,
        };

        // Update the user's role and permission
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedUserData,
        });

        revalidatePath(`/user/${userId}`); // Revalidate the page after the update

        return {
            ok: true,
            user: updatedUser,
            message: 'Usuario actualizado con éxito',
        };
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar el usuario',
        };
    }
};
