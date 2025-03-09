'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getCardById = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {

        const card = await prisma.card.findUnique({
            where: { id },
            include: {
                company: {
                    select: {
                        name: true,
                        activityType: true,
                        backgroundColor: true,
                        textColor: true,
                        CompanyLogo: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                        lastName: true,
                    },
                },
            },
        });

        if (!card) throw `${id} no existe`;

        return {
            ok: true,
            card: card,
        }


    } catch (error) {

        console.log(error);

        return {
            ok: false,
            message: 'Card no exist'
        }


    }




}