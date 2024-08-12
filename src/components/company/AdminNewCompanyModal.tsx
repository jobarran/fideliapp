"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { IoCloseSharp } from "react-icons/io5";
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerCompany } from '@/actions';

type FormInputs = {
    name: string;
    activityType: string;
    backgroundColor: string;
    logo?: FileList | undefined;
    address: string;
    openDays: string;
    openHours: string;
}

export const AdminNewCompanyModal = () => {

    const [newCompanyModal, setNewCompanyModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-company-modal') {
            setNewCompanyModal(!newCompanyModal);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('');

        const formData = new FormData();

        const { logo, ...companyToSave } = data
        
        formData.append("name", companyToSave.name);
        formData.append("activityType", companyToSave.activityType);
        formData.append("backgroundColor", companyToSave.backgroundColor);
        formData.append("address", companyToSave.address);
        formData.append("openDays", companyToSave.openDays);
        formData.append("openHours", companyToSave.openHours);

        if (logo) {
            formData.append("logo", logo[0]);  // Convert FileList to File
        }
    
        const resp = await registerCompany(formData);


        if (!resp.ok) {
            // setErrorMessage(resp);
            return;
        }

        setNewCompanyModal(false)
    };

    useEffect(() => {
        if (modalRef.current) {
            if (newCompanyModal) {
                modalRef.current.removeAttribute('inert');
            } else {
                modalRef.current.setAttribute('inert', 'true');
            }
        }
    }, [newCompanyModal]);

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${newCompanyModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${newCompanyModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${newCompanyModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    return (
        <div>
            <button
                type="button"
                className="p-2 w-full bg-slate-800 hover:bg-slate-950 text-white py-2 rounded-md transition duration-100"
                onClick={() => { setNewCompanyModal(true) }}
            >
                Crear Local
            </button>

            <div className={blurEffectClasses}></div>

            <div
                id="new-company-modal"
                tabIndex={-1}
                aria-hidden={!newCompanyModal}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setNewCompanyModal(!newCompanyModal)}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4">
                        <div>
                            <span className="text-sm text-gray-900">Bienvenido!</span>
                            <h1 className="text-xl font-bold">Crear cuenta</h1>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                                }
                                            )
                                        } placeholder="Nombre"
                                        {...register('name', { required: true })}
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="activityType">Tipo de actividad</label>
                                    <input
                                        type="text"
                                        id="activityType"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.activityType
                                                }
                                            )
                                        } placeholder="Actividad"
                                        {...register('activityType', { required: true })}
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="backgroundColor">Color de fondo</label>
                                    <input
                                        type="text"
                                        id="backgroundColor"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.backgroundColor
                                                }
                                            )
                                        } placeholder="Color de fondo"
                                        {...register('backgroundColor', { required: true })}
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="address">Dirección</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.address
                                                }
                                            )
                                        } placeholder="Dirección"
                                        {...register('address', { required: true })}
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="openDays">Abierto</label>
                                    <input
                                        type="text"
                                        id="openDays"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.openDays
                                                }
                                            )
                                        } placeholder="Abierto"
                                        {...register('openDays', { required: true })}
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="openHours">Horarios</label>
                                    <input
                                        type="text"
                                        id="openHours"
                                        className={
                                            clsx(
                                                "px-4 w-full border-2 py-2 rounded-md text-sm outline-none",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.openHours
                                                }
                                            )
                                        } placeholder="Horarios"
                                        {...register('openHours', { required: true })}
                                    />
                                </div>

                                <div className="flex flex-col mb-2">
                                    <span>Logo</span>
                                    <input
                                        type="file"
                                        {...register('logo')}
                                        className="p-2 border rounded-md bg-gray-200"
                                        accept="image/png, image/jpeg, image/avif"
                                    />
                                </div>

                                <div className="">
                                    <SignUpButton />
                                </div>

                            </form>
                        </div>
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
                "mb-3 w-full bg-slate-800 hover:bg-slate-950 text-white py-2 rounded-md transition duration-100": !pending,
                "cursor-not-allowed opacity-50": pending
            })}
            disabled={pending}
        >
            Crear Cuenta
        </button>
    );
}
