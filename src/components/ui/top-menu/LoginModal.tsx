"use client";

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import { IoCloseSharp } from "react-icons/io5";

interface Props {
    loginModal: boolean;
    setLoginModal: () => void;
    setNewAccountModal: () => void;
    uniqueId: string; 
}

export const LoginModal = ({ loginModal, setLoginModal, setNewAccountModal, uniqueId }: Props) => {
    const [state, dispatch] = useFormState(authenticate, undefined);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (loginModal && state === 'Success') {
            setLoginModal();
            window.location.reload();
        }
    }, [state, setLoginModal, loginModal]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === `login-modal-${uniqueId}`) {
            setLoginModal();
        }
    };

    const handleCreateAccountClick = () => {
        setLoginModal();
        setNewAccountModal();
    };

    if (!loginModal) return null; // Prevent rendering when modal is hidden

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
            <div
                id={`login-modal-${uniqueId}`}
                tabIndex={-1}
                aria-hidden={!loginModal}
                className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50"
                onClick={handleOverlayClick}
            >
                <div className="relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={setLoginModal}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4">
                        <div>
                            <span className="text-sm text-gray-900">Bienvenido!</span>
                            <h1 className="text-xl font-bold">Iniciar sesión con tu cuenta</h1>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">
                            <form action={dispatch} className="space-y-3">
                                <div className="my-3">
                                    <label htmlFor={`email-${uniqueId}`} className="block text-md mb-2">Email</label>
                                    <input
                                        ref={emailRef}
                                        id={`email-${uniqueId}`}
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        required
                                        autoComplete="off"
                                        className="px-4 w-full border py-2 rounded-md text-sm outline-none border-slate-300"
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor={`password-${uniqueId}`} className="block text-md mb-2">Contraseña</label>
                                    <input
                                        ref={passwordRef}
                                        id={`password-${uniqueId}`}
                                        name="password"
                                        type="password"
                                        placeholder="contraseña"
                                        required
                                        autoComplete="off"
                                        className="px-4 w-full border py-2 rounded-md text-sm outline-none border-slate-300"
                                    />
                                </div>
                                {state === "CredentialsSignin" && (
                                    <div className="flex flex-row mb-1 mt-1">
                                        <p className="text-sm text-red-500">
                                            Sorry, something went wrong. Please double-check your credentials.
                                        </p>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                                        Olvide mi contraseña
                                    </span>
                                    <span
                                        className="text-sm text-blue-700 hover:underline cursor-pointer"
                                        onClick={handleCreateAccountClick}
                                    >
                                        Crear cuenta
                                    </span>
                                </div>
                                <div className="">
                                    <LoginButton />
                                    <div className="flex space-x-2 justify-center items-end bg-white hover:bg-slate-100 text-slate-800 py-2 border rounded-md transition duration-100">
                                        <button>Iniciar sesión con Google</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


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
