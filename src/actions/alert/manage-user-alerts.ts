'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // Import revalidatePath from next/cache

export const manageUserAlerts = async (
    userId: string,
    action: "deleteAllSeen" | "markAllAsSeen" | "deleteAll"
): Promise<{ ok: boolean; message?: string }> => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: "Debe estar autenticado",
        };
    }

    try {
        if (action === "deleteAllSeen") {
            await prisma.alert.deleteMany({
                where: {
                    userId,
                    status: "SEEN",
                },
            });
            revalidatePath("/"); // Revalidate the "/" path after deleting all seen alerts
            return { ok: true, message: "Todas las alertas vistas han sido eliminadas" };
        }

        if (action === "markAllAsSeen") {
            await prisma.alert.updateMany({
                where: {
                    userId,
                    status: "NOT_SEEN",
                },
                data: {
                    status: "SEEN",
                },
            });
            revalidatePath("/"); // Revalidate the "/" path after marking all as seen
            return { ok: true, message: "Todas las alertas han sido marcadas como vistas" };
        }

        if (action === "deleteAll") {
            await prisma.alert.deleteMany({
                where: {
                    userId,
                },
            });
            revalidatePath("/"); // Revalidate the "/" path after deleting all alerts
            return { ok: true, message: "Todas las alertas han sido eliminadas" };
        }

        return { ok: false, message: "Acción no válida" };

    } catch (error) {
        console.error("Error al gestionar las alertas:", error);
        return {
            ok: false,
            message: "Error al gestionar las alertas",
        };
    }
};
