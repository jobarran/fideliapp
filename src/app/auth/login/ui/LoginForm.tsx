"use client";

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';


export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (state === 'Success') {
          const callbackUrl = searchParams.get('callbackUrl') || '/'; // Fallback to home
          router.push(callbackUrl); // Perform redirection
        }
      }, [state, searchParams, router]);

    return (
        <div>
            <div className="relative bg-white rounded-lg overflow-hidden transition-opacity duration-300 ">
                <div className="p-4">
                    <div>
                        <span className="text-sm text-gray-900">Bienvenido!</span>
                        <h1 className="text-xl font-bold">Debe iniciar sesión para continuar</h1>
                    </div>
                    <div className="overflow-auto max-h-[70vh]">
                        <form action={dispatch} className="space-y-3">
                            <div className="my-3">
                                <label className="block text-md mb-2" htmlFor="email">Email</label>
                                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" id='auth-email' placeholder="email" required />
                            </div>
                            <div className="mt-5">
                                <label className="block text-md mb-2" htmlFor="password">Contraseña</label>
                                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" id='auth-password' placeholder="contraseña" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-blue-700 hover:underline cursor-pointer">Olvide mi contraseña</span>
                                <span className="text-sm text-blue-700 hover:underline cursor-pointer">Crear cuenta</span>
                            </div>
                            <LoginButton />
                            <div className="flex space-x-2 justify-center items-end bg-white hover:bg-slate-100 text-slate-800 py-2 border-2 rounded-md transition duration-100">
                                {/* <Image className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="" width={0} height={0} /> */}
                                <button>Iniciar sesión con Google</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx(
                "mb-3 w-full py-2 rounded-md transition duration-100",
                {
                    "bg-slate-800 hover:bg-slate-950 text-white": !pending,
                    "bg-slate-800 text-white opacity-50 cursor-not-allowed": pending
                }
            )}
            disabled={pending}
        >
            Iniciar sesión
        </button>
    );
}
