"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions";
import clsx from "clsx";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

interface Props {
    loginModal: boolean;
    setLoginModal: () => void;
    setNewAccountModal: () => void;
    uniqueId: string;
}

export const LoginModal = ({
    loginModal,
    setLoginModal,
    setNewAccountModal,
    uniqueId,
}: Props) => {
    const [state, dispatch] = useFormState(authenticate, undefined);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [credentialsError, setCredentialsError] = useState<string | null>(null);

    useEffect(() => {
        if (loginModal && state === "Success") {
            handleCloseModal();
            window.location.reload();
        } else if (state === "CredentialsSignin") {
            setCredentialsError("Algo salió mal! Por favor vuelve a intentar.");
        }
    }, [state, loginModal]);

    const handleOverlayClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (
            event.target instanceof HTMLDivElement &&
            event.target.id === `login-modal-${uniqueId}`
        ) {
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setEmailError(null);
        setCredentialsError(null); // Clear errors when closing the modal
        setLoginModal();
    };

    const handleCreateAccountClick = () => {
        handleCloseModal();
        setNewAccountModal();
    };

    const validateEmail = () => {
        const email = emailRef.current?.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            setEmailError("El formato del email es inválido.");
        } else {
            setEmailError(null);
        }
    };

    if (!loginModal) return null; // Prevent rendering when modal is hidden

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-50"></div>
            <div
                id={`login-modal-${uniqueId}`}
                tabIndex={-1}
                aria-hidden={!loginModal}
                className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50"
                onClick={handleOverlayClick}
            >
                <div className="relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-sm md:max-w-md xl:max-w-lg sm:h-auto flex flex-col justify-center sm:py-10 py-20">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={handleCloseModal}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-6 text-center">
                        <div className="mb-8">
                            <Image
                                src="/imgs/logo-black-2.png"
                                alt="Company Logo"
                                width={250}
                                height={0}
                                className="mx-auto"
                            />
                        </div>
                        <h1 className="text-lg font-bold">
                            Iniciar sesión con tu cuenta
                        </h1>
                        <div className="overflow-auto max-h-[70vh] mt-4">
                            <form
                                action={dispatch}
                                className="space-y-3"
                                onSubmit={validateEmail}
                            >
                                <div className="my-3 w-full max-w-xs mx-auto">
                                    <input
                                        ref={emailRef}
                                        id={`email-${uniqueId}`}
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        required
                                        autoComplete="off"
                                        onBlur={validateEmail}
                                        className="px-4 w-full border py-2 rounded-md text-sm outline-none border-slate-300 mx-auto"
                                    />
                                    {emailError && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {emailError}
                                        </p>
                                    )}
                                </div>

                                <div className="my-3 w-full max-w-xs mx-auto">
                                    <input
                                        ref={passwordRef}
                                        id={`password-${uniqueId}`}
                                        name="password"
                                        type="password"
                                        placeholder="contraseña"
                                        required
                                        autoComplete="off"
                                        className="px-4 w-full border py-2 rounded-md text-sm outline-none border-slate-300 mx-auto"
                                    />
                                </div>

                                {credentialsError && (
                                    <div className="flex flex-row mb-1 mt-1 w-full justify-center">
                                        <p className="text-sm text-red-600 w-2/3">
                                            {credentialsError}
                                        </p>
                                    </div>
                                )}
                                <div className="pt-4 w-full max-w-xs mx-auto">
                                    <LoginButton />
                                </div>
                                <div className="flex justify-between w-full max-w-xs mx-auto">
                                    <span className="text-sm text-slate-700 hover:underline cursor-pointer">
                                        Olvide mi contraseña
                                    </span>
                                    <span
                                        className="text-sm text-slate-700 hover:underline cursor-pointer"
                                        onClick={handleCreateAccountClick}
                                    >
                                        Crear cuenta
                                    </span>
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
                "w-full py-2 rounded-md transition duration-100 mx-auto",
                {
                    "bg-slate-800 hover:bg-slate-900 text-white": !pending,
                    "bg-slate-800 text-white opacity-50 cursor-not-allowed": pending,
                }
            )}
            disabled={pending}
        >
            Iniciar sesión
        </button>
    );
}
