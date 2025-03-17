"use client";

import { updateCompany } from '@/actions';
import { defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import React, { useCallback, useRef, useState } from 'react';
import { Avatar } from '..';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image'
import { cropText } from '@/utils';
import { FiEdit, FiSave, FiUpload, FiX } from 'react-icons/fi';

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClientAdminConfigurationCard = ({ company, setOpenModal }: Props) => {

    const [editedCompany, setEditedCompany] = useState<EditedCompany>({
        ...company,
        openHours: company.openHours || defaultOpenHours(),
    });
    const [isEditing, setIsEditing] = useState(false);

    const colorInputRef = useRef<HTMLInputElement | null>(null); // Ref to target the input

    const handleEditClick = useCallback(() => {
        if (isEditing) {
            updateCompany(editedCompany);
        }
        setIsEditing((prev) => !prev);
    }, [isEditing, editedCompany]);

    const handleCancelClick = useCallback(() => {
        setEditedCompany({
            ...company, // Revert to the original company data
            openHours: company.openHours || defaultOpenHours(),
        });
        setIsEditing(false);
    }, [company]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof EditedCompany) => {
        const value = e.target.value.trim() === '' ? '' : e.target.value;  // Ensure value is an empty string if it's empty
        setEditedCompany((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }, []);

    const renderImage = () =>
        company.CompanyLogo?.url ? (
            <Image
                src={company.CompanyLogo.url}
                alt={company.name}
                className="object-cover w-full h-full"
                width={0} height={0} sizes="100vw"
                style={{ width: '100%', height: '100%' }}
            />
        ) : (
            <Avatar name={company.name} backgroundColor={company.backgroundColor} size={'28'} />
        )

    return (

        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <h2 className="text-lg font-semibold text-gray-700">Tarjeta</h2>
                <div className="flex gap-2">
                    {isEditing && (
                        <button
                            onClick={handleCancelClick}
                            className="p-2 rounded-full bg-slate-200 text-slate-800"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    )}
                    <button
                        onClick={handleEditClick}
                        className={`p-2 rounded-full ${isEditing ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"} `}
                    >
                        {isEditing ? <FiSave className='w-6 h-6' /> : <FiEdit className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="rounded-lg max-w-full w-60 xl:w-64">
                    <div
                        className="relative rounded-lg overflow-hidden flex flex-col justify-between"
                        style={{
                            backgroundColor: editedCompany.backgroundColor,
                        }}
                    >
                        {/* Title Section */}
                        <div className="flex flex-col justify-center py-2 px-1">
                            <p
                                className="text-sm lg:text-base font-medium text-center"
                                style={{
                                    color: editedCompany.textColor,
                                }}
                            >
                                {cropText(company.name, 23)}
                            </p>
                        </div>

                        {/* Image Section */}
                        <div className="flex flex-col items-center justify-center py-1">
                            <div className="relative h-20 w-20 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                                {renderImage()}
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="px-4 py-2 flex items-center justify-between">
                            {/* "Mis puntos" */}
                            <div>
                                <p
                                    className="text-sm font-medium"
                                    style={{
                                        color: company.textColor,
                                    }}
                                >
                                    Puntos
                                </p>
                            </div>
                            {/* Favorite Icon */}
                            <div onClick={(e) => e.preventDefault()}>
                                <FaHeart
                                    size={16}
                                    style={{ color: company.textColor }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">

                    <div className="flex flex-col items-center">
                        <button
                            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center"
                            onClick={() => setOpenModal(true)}
                            disabled={!isEditing}
                        >
                            <FiUpload className="w-5 h-5 text-slate-500" />
                        </button>
                        <label className="text-xs text-slate-500 mt-1">Logo</label>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-200">
                            <input
                                ref={colorInputRef} // Attach the ref here
                                type="color"
                                value={editedCompany.backgroundColor}
                                onChange={(e) => handleInputChange(e, 'backgroundColor')}
                                disabled={!isEditing}
                                className="absolute w-16 h-16 cursor-pointer"
                            />
                        </div>
                        <label className="text-xs text-slate-500 mt-1">Fondo</label>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-200">
                            <input
                                ref={colorInputRef}
                                type="color"
                                value={editedCompany.textColor}
                                onChange={(e) => handleInputChange(e, 'textColor')}
                                disabled={!isEditing}
                                className="absolute w-16 h-16 cursor-pointer"
                            />
                        </div>
                        <label className="text-xs text-slate-500 mt-1">Texto</label>
                    </div>

                </div>
            </div>
        </div>
    );
}

