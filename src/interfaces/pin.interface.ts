import { PinState } from "@prisma/client";

export interface Pin {
    pin: string;
    id: string;
    state: PinState
    cardId: string;
    expiresAt: Date;
}