import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id:string;
            name:string;
            lastName:string;
            email:string;
            role:string;
            active: boolean
            image?:string;
        } & DefaultSession['user']
    }
}