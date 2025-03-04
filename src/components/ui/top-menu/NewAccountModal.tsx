"use client";

import React, { useState } from "react";
import { IoCloseSharp, IoEye, IoEyeOff } from "react-icons/io5";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";

type FormInputs = {
    email: string;
    name: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

interface Props {
    newAccountModal: boolean;
    setNewAccountModal: () => void;
    setLoginModal: () => void;
}

export const NewAccountModal = ({ newAccountModal, setNewAccountModal, setLoginModal }: Props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormInputs>();

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === "new-account-modal") {
            closeModal();
        }
    };

    const closeModal = () => {
        reset(); // Reset form data and errors
        setErrorMessage("");
        setNewAccountModal();
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage("");
        const { name, lastName, email, password } = data;

        const resp = await registerUser({ name, lastName, email, password, role: "USER" });

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace("/");
    };

    const handleLoginClick = () => {
        setLoginModal();
        closeModal();
    };

    const modalClasses = clsx(
        "fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300",
        { "opacity-100": newAccountModal, "opacity-0 pointer-events-none": !newAccountModal }
    );
    const blurEffectClasses = clsx(
        "fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300",
        { "opacity-100": newAccountModal, "opacity-0 pointer-events-none": !newAccountModal }
    );

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
                        onClick={closeModal}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4 text-center">
                        <h1 className="text-lg font-bold">Crear cuenta</h1>
                    </div>

                    <div className="overflow-auto max-h-[70vh]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col items-center">
                            {/* Email */}
                            <div className="w-full max-w-xs">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        { "border-red-600 text-red-600": !!errors.email }
                                    )}
                                    {...register("email", {
                                        required: "El correo electrónico es obligatorio.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "El correo electrónico no es válido.",
                                        },
                                        onBlur: () => setErrorMessage(""), // Clear previous errors on blur
                                    })}
                                />
                                {/* Display only custom error messages */}
                                {errors.email && <span className="text-red-600 text-xs">{errors.email.message}</span>}
                            </div>


                            {/* Name */}
                            <div className="w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        { "border-red-600 text-red-600": !!errors.name }
                                    )}
                                    {...register("name", {
                                        required: "El nombre es obligatorio.",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres." },
                                        maxLength: { value: 100, message: "Máximo 100 caracteres." },
                                    })}
                                />
                                {errors.name && <span className="text-red-600 text-xs">{errors.name.message}</span>}
                            </div>

                            {/* Last Name */}
                            <div className="w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        { "border-red-600 text-red-600": !!errors.lastName }
                                    )}
                                    {...register("lastName", {
                                        required: "El apellido es obligatorio.",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres." },
                                        maxLength: { value: 100, message: "Máximo 100 caracteres." },
                                    })}
                                />
                                {errors.lastName && <span className="text-red-600 text-xs">{errors.lastName.message}</span>}
                            </div>

                            {/* Password */}
                            <div className="relative w-full max-w-xs">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        { "border-red-600 text-red-600": !!errors.password }
                                    )}
                                    {...register("password", {
                                        required: "La contraseña es obligatoria.",
                                        minLength: { value: 6, message: "Mínimo 6 caracteres." },
                                    })}
                                />
                                <span
                                    className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </span>
                                {errors.password && <span className="text-red-600 text-xs">{errors.password.message}</span>}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative w-full max-w-xs">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmar contraseña"
                                    className={clsx(
                                        "px-4 w-full border py-2 rounded-md text-sm outline-none",
                                        { "border-red-600 text-red-600": !!errors.confirmPassword }
                                    )}
                                    {...register("confirmPassword", {
                                        required: "Por favor confirma la contraseña.",
                                        validate: (value) =>
                                            value === watch("password") || "Las contraseñas no coinciden.",
                                    })}
                                />
                                <span
                                    className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                                </span>
                                {errors.confirmPassword && (
                                    <span className="text-red-600 text-xs">{errors.confirmPassword.message}</span>
                                )}
                            </div>
                            {errorMessage && <span className="text-red-600 text-xs">{errorMessage}</span>}
                            <div className="pt-4 w-full max-w-xs">
                                <SignUpButton />
                            </div>

                            <div className="flex justify-center">
                                <span className="text-sm text-slate-700 mr-1">¿Ya tienes cuenta?</span>
                                <span
                                    className="text-sm text-slate-700 font-semibold cursor-pointer"
                                    onClick={handleLoginClick}
                                >
                                    Iniciar sesión
                                </span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

function SignUpButton() {
    return (
        <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-950 text-white py-2 rounded-md transition duration-100"
        >
            Crear Cuenta
        </button>
    );
}
