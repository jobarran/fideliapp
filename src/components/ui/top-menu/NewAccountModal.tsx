"use client";

import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import { IoCloseSharp } from "react-icons/io5";
import { SubmitHandler, useForm } from 'react-hook-form';
import { login, registerUser } from "@/actions";

type FormInputs = {
    email: string;
    name: string;
    lastName: string;
    password: string;
}

interface Props {
    newAccountModal: boolean;
    setNewAccountModal: () => void
    setLoginModal: () => void
}

export const NewAccountModal = ({ newAccountModal, setNewAccountModal, setLoginModal }: Props) => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-account-modal') {
            setNewAccountModal();
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        const { name, lastName, email, password } = data

        const resp = await registerUser({ name, lastName, email, password, role: 'USER' })

        if (!resp.ok) {
            setErrorMessage(resp.message)
            return
        }

        await login(email.toLowerCase(), password)
        window.location.replace('/')

    }

    const handleLoginClick = () => {
        setLoginModal();
        setNewAccountModal();
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${newAccountModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${newAccountModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${newAccountModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    return (
        <div>
            <div className={blurEffectClasses}></div>
            <div
                id="new-account-modal"
                tabIndex={-1}
                aria-hidden={newAccountModal}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className="relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-sm md:max-w-md xl:max-w-lg sm:h-auto flex flex-col justify-center sm:py-10 py-20">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={setNewAccountModal}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4 text-center">
                        <h1 className="text-lg font-bold">Crear cuenta</h1>
                    </div>

                    <div className="overflow-auto max-h-[70vh]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col items-center">

                            <div className="w-full max-w-xs">
                                <input
                                    type="email"
                                    placeholder="email"
                                    required
                                    autoComplete="email"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        {
                                            'focus:outline-none focus:border border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                        }
                                    )}
                                    {...register('email', {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                />
                            </div>

                            <div className="my-3 w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    autoComplete="given-name"
                                    required
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        {
                                            'focus:outline-none focus:border border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                        }
                                    )}
                                    {...register('name', { required: true })}
                                />
                            </div>

                            <div className="my-3 w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    autoComplete="family-name"
                                    required
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        {
                                            'focus:outline-none focus:border border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                        }
                                    )}
                                    {...register('lastName', { required: true })}
                                />
                            </div>

                            <div className="my-3 w-full max-w-xs">
                                <input
                                    type="Contraseña"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        {
                                            'focus:outline-none focus:border border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                        }
                                    )}
                                    {...register('password', { required: true, minLength: 6 })}
                                />
                            </div>

                            <div className="pt-5 w-full max-w-xs">
                                <SignUpButton />
                            </div>

                            <div className="flex justify-center">
                                <span className="text-sm text-slate-700 mr-1">Ya tenés cuenta?</span>
                                <span
                                    className="text-sm text-slate-700 font-semibold cursor-pointer"
                                    onClick={handleLoginClick}
                                >Iniciar sesión</span>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

function SignUpButton() {

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "w-full bg-slate-800 hover:bg-slate-950 text-white py-2 rounded-md transition duration-100": !pending,
                "cursor-not-allowed opacity-50": pending
            })}
            disabled={pending}
        >
            Crear Cuenta
        </button>
    );
}
