"use client";

import { getActivityTypes, updateCompany } from '@/actions';
import { defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { OpenHoursSection, SelectField, TextAreaField, TextField } from '..';
import { FaFacebook, FaInstagram, FaLink, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiEdit, FiSave } from 'react-icons/fi'

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
}

export const ClientAdminConfigurationForm = ({ company }: Props) => {

    const [editedCompany, setEditedCompany] = useState<EditedCompany>({
        ...company,
        openHours: company.openHours || defaultOpenHours(),
    });
    const [isEditing, setIsEditing] = useState(false);
    const [activityTypes, setActivityTypes] = useState<Array<{ id: string; name: string }>>([]);


    useEffect(() => {
        const fetchActivityTypes = async () => {
            const types = await getActivityTypes();
            setActivityTypes(types);
        };
        fetchActivityTypes();
    }, []);

    const handleEditClick = useCallback(() => {
        if (isEditing) {
            updateCompany(editedCompany);
        }
        setIsEditing((prev) => !prev);
    }, [isEditing, editedCompany]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof EditedCompany) => {
        const value = e.target.value.trim() === '' ? '' : e.target.value;  // Ensure value is an empty string if it's empty
        setEditedCompany((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }, []);


    const handleDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = e.target;
            if (value.length <= 1000) {
                setEditedCompany((prevState) => ({
                    ...prevState,
                    description: value,
                }));
            }
        },
        []
    );

    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = activityTypes.find((type) => type.id === e.target.value);
        if (selectedType) {
            setEditedCompany((prevState) => ({
                ...prevState,
                activityType: {
                    id: selectedType.id,
                    name: selectedType.name,
                },
            }));
        }
    }, [activityTypes]);

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center pb-2'>
                <h2 className="text-lg font-semibold text-gray-700">Información</h2>
                <button
                    onClick={handleEditClick}
                    className={`p-2 rounded-full ${isEditing ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"} `}
                >
                    {isEditing ? <FiSave className='w-6 h-6' /> : <FiEdit className='w-6 h-6' />}
                </button>
            </div>
            <TextField
                label="Nombre"
                value={editedCompany.name}
                onChange={(e) => handleInputChange(e, 'name')}
                disabled={true}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded w-full'
            />

            <TextField
                label="Dirección"
                value={editedCompany.address}
                onChange={(e) => handleInputChange(e, 'address')}
                disabled={true}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded w-full'
            />

            <SelectField
                label="Actividad"
                placeholder={'Tipo de actividad'}
                options={activityTypes}
                value={editedCompany.activityType.id}
                onChange={handleSelectChange}
                isEditing={isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                selectClassName='input border col-span-2 p-1 rounded'
            />

            <TextAreaField
                label="Descripción"
                value={editedCompany.description || ''}
                onChange={handleDescriptionChange}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 col-span-2 rounded resize-none overflow-auto'
                rows={8}
            />

            <h3 className='text-lg font-semibold mb-2 text-slate-800'>Contacto y Redes</h3>
            <TextField
                label="Teléfono"
                value={editedCompany.phone || ''}
                onChange={(e) => handleInputChange(e, 'phone')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaPhone}
            />


            <TextField
                label="Whatsapp"
                value={editedCompany.whatsapp || ''}
                onChange={(e) => handleInputChange(e, 'whatsapp')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4 w-full'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaWhatsapp}
            />


            <TextField
                label="site"
                value={editedCompany.site || ''}
                onChange={(e) => handleInputChange(e, 'site')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4 w-full'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaLink}
            />

            <TextField
                label="Instagram"
                value={editedCompany.instagram || ''}
                onChange={(e) => handleInputChange(e, 'instagram')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaInstagram}
            />

            <TextField
                label="Facebook"
                value={editedCompany.facebook || ''}
                onChange={(e) => handleInputChange(e, 'facebook')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaFacebook}
            />

            <TextField
                label="Twitter"
                value={editedCompany.twitter || ''}
                onChange={(e) => handleInputChange(e, 'twitter')}
                disabled={!isEditing}
                divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                labelClassName='font-medium hidden sm:flex'
                inputClassName='border p-1 rounded ps-10 w-full'
                icon={FaTwitter}
            />

        </div>



    );
}