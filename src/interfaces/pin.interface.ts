import { PinState } from "@prisma/client";

export interface Pin {
    pin: string;
    id: string;
    state: PinState
    userId: string;
    expiresAt: Date;
}