'use server'

import { UserRole } from "@/interfaces";
import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs';

interface Props {
    name: string,
    lastName: string,
    email: string,
    password: string,
    role?: UserRole,
}

export const registerUser = async ({ name, lastName, email, password, role }: Props) => {

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { ok: false, message: "El correo electrónico ya está registrado." };
        }

        const userData = {
            name,
            lastName,
            email: email.toLowerCase(),
            password: bcryptjs.hashSync(password),
            role: role || "USER",
        };

        const user = await prisma.user.create({ data: userData });

        return { ok: true, user, message: "Usuario creado exitosamente." };
    } catch (error) {
        console.error(error);
        return { ok: false, message: "Error al crear el usuario." };
    }
};
