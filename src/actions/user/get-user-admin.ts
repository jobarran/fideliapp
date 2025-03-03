'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getUserAdmin = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado',
        };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                role: true,
                permission: true,
                active: true,
            },
        });

        if (!user) throw `No encontramos un usuario con este id:${id}`;

        return {
            ok: true,
            user,
        };
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'Error al obtener los datos del usuario',
        };
    }
};
