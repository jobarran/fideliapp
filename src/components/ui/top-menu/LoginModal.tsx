"use client";

import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import clsx from 'clsx';


interface Props {
    loginModal: boolean;
    setLoginModal: () => void
}

export const LoginModal = ({ loginModal, setLoginModal }: Props) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'login-modal') {
            setLoginModal();
        }
    };

    const [state, dispatch] = useFormState(authenticate, undefined);

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${loginModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-lg overflow-hidden h-auto w-full max-w-xs md:max-w-sm xl:max-w-lg transition-opacity duration-300 ${loginModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${loginModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    return (
        <div>
            <div className={blurEffectClasses}></div>
            <div
                id="login-modal"
                tabIndex={-1}
                aria-hidden={loginModal}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className={modalContentClasses}>
                    <div className="p-4">
                        <div>
                            <span className="text-sm text-gray-900">Bienvenido!</span>
                            <h1 className="text-xl font-bold">Iniciar sesión con tu cuenta</h1>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">

                            <form action={dispatch} className="space-y-3">

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="email">Email</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" id='email' placeholder="email" required />
                                </div>

                                <div className="mt-5">
                                    <label className="block text-md mb-2" htmlFor="password">Password</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" id='password' placeholder="password" />
                                </div>



                                <div
                                    className="flex "
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {state === "CredentialsSignin" && (
                                        <div className='flex flex-row mb- mt-1'>
                                            <p className="text-sm text-red-500">Sorry, something went wrong. Please double-check your credentials.</p>
                                        </div>
                                    )}
                                </div>


                                <div className="flex justify-between">
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">Olvide mi contraseña</span>

                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">Crear cuenta</span>
                                </div>
                                <div className="">
                                    <LoginButton />
                                    <div className="flex  space-x-2 justify-center items-end bg-white hover:bg-slate-100 text-slate-800 py-2 border-2 rounded-md transition duration-100">
                                        <img className=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="" />
                                        <button >Iniciar sesión con Google</button>
                                    </div>
                                </div>
                            </form>
                        </div>





                    </div>
                </div>
            </div>
        </div >
    )
}

function LoginButton() {

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "mb-3 w-full bg-slate-800 hover:bg-slate-950 text-white py-2 rounded-md transition duration-100": !pending,
                "cursor-not-allowed opacity-50": pending
            })}
            disabled={pending}
        >
            Iniciar sesión
        </button>
    );
}

