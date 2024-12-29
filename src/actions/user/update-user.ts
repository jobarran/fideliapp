'use server';

import { auth } from "@/auth.config";
import { User } from "@/interfaces"; // Import your User interface
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from 'bcryptjs';

// Updated Zod schema
const userSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    oldPassword: z.string().max(255).optional(),
    password: z.string().min(6).max(255).optional(),
    active: z.boolean(),
});

export const updateUser = async (editedUser: User) => {
    const session = await auth();
    const userId = session?.user.id;

    const userParsed = userSchema.safeParse(editedUser);

    if (!userParsed.success) {
        return { ok: false, message: 'La validación falló' };
    }

    const userData = userParsed.data;
    const { oldPassword, password, ...rest } = userData;

    if (!userId) {
        return {
            ok: false,
            message: 'No hay un usuario registrado',
        };
    }

    if (userId !== editedUser.id) {
        return {
            ok: false,
            message: 'Solo puedes actualizar tu propia cuenta.',
        };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return {
                ok: false,
                message: 'El usuario no existe con el ID proporcionado',
            };
        }

        // Only verify the old password if it's provided
        if (oldPassword) {
            const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);

            // Log to debug the result of the password comparison
            console.log("Verificación de la contraseña anterior:", isPasswordCorrect);

            if (!isPasswordCorrect) {
                return { ok: false, message: 'La contraseña anterior es incorrecta' };
            }
        } 

        // Prepare the update data
        const updatedUserData: any = {
            ...rest,
        };

        // Only add the hashed password if a new password is provided
        if (password) {
            updatedUserData.password = await bcrypt.hash(password, 10);
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedUserData,
        });

        revalidatePath(`/user/${userId}`);

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
