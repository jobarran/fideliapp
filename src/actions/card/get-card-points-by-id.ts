'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getCardPointsById = async (id: string) => {

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
        });

        if (!card) throw `${id} no existe`;

        return {
            ok: true,
            cardPoints: card.points,
        }


    } catch (error) {

        console.log(error);

        return {
            ok: false,
            message: 'Card no exist'
        }


    }




}