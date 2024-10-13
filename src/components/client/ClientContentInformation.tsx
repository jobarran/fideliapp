"use client";

import { deleteCompany, getActivityTypes, updateCompany } from '@/actions';
import { colorOptions, defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import { formatAddress } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { CheckboxField, ColorPicker, DeleteWarningModal, OpenHoursSection, SelectField, TextField } from '..';
import { useRouter } from 'next/navigation';
import { FaRegTrashCan } from 'react-icons/fa6';

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
}

export const ClientContentInformation = ({ company }: Props) => {

    const [editedCompany, setEditedCompany] = useState<EditedCompany>({
        ...company,
        openHours: company.openHours || defaultOpenHours(),
    });
    const router = useRouter();
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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: keyof EditedCompany) => {
        setEditedCompany((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    }, []);

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

    const handleOpenHourChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, day: string, type: 'from' | 'to') => {
        const { value } = e.target;
        setEditedCompany((prevState) => ({
            ...prevState,
            openHours: {
                ...prevState.openHours,
                [day]: {
                    ...prevState.openHours[day],
                    [type]: value,
                    closed: false,
                },
            },
        }));
    }, []);

    const handleCheckboxChange = useCallback((day: string, checked: boolean) => {
        setEditedCompany((prevState) => ({
            ...prevState,
            openHours: {
                ...prevState.openHours,
                [day]: {
                    ...prevState.openHours[day],
                    closed: !checked,
                    from: checked ? prevState.openHours[day].from || "09:00" : "",
                    to: checked ? prevState.openHours[day].to || "17:00" : "",
                },
            },
        }));
    }, []);

    const handleColorChange = useCallback((color: string) => {
        setEditedCompany((prevState) => ({
            ...prevState,
            backgroundColor: color,
        }));
    }, []);

    const handleDeleteCompany = async () => {
       console.log("Eliminar Negocio")
       deleteCompany(company.slug)
       router.push('/')

    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Información</h2>
                <button
                    onClick={handleEditClick}
                    className="px-4 py-1 bg-white text-slate-800 border border-slate-800 rounded hover:bg-slate-800 hover:text-white"
                >
                    {isEditing ? 'Guardar' : 'Editar'}
                </button>
            </div>

            <hr className="w-full h-px border-neutral-200 my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                    <TextField
                        label="Nombre"
                        value={editedCompany.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                        disabled={true}
                        divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                        labelClassName='font-medium hidden sm:flex'
                        inputClassName='border p-1 col-span-2 rounded'
                    />

                    <TextField
                        label="Dirección"
                        value={formatAddress(editedCompany.address)}
                        onChange={(e) => handleInputChange(e, 'address')}
                        disabled={true}
                        divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                        labelClassName='font-medium hidden sm:flex'
                        inputClassName='border p-1 col-span-2 rounded'
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

                    <CheckboxField
                        label="Acepta referidos"
                        checked={editedCompany.acceptReferral}
                        onChange={() => setEditedCompany((prev) => ({ ...prev, acceptReferral: !prev.acceptReferral }))}
                        disabled={!isEditing}
                        divClassName='flex sm:grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                        labelClassName='font-medium mr-2'
                        inputClassName='w-4 h-4 col-span-2'
                    />

                    <ColorPicker
                        label="Color de Fondo"
                        colors={colorOptions}
                        selectedColor={editedCompany.backgroundColor}
                        onChange={handleColorChange}
                        isEditing={isEditing}
                        size='w-8 h-8'
                        divClassName='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4'
                        labelClassName='font-medium hidden sm:flex'
                        pickerClassName='flex space-x-2 col-span-2'
                    />

                </div>

                <OpenHoursSection
                    openHours={editedCompany.openHours}
                    onHourChange={handleOpenHourChange}
                    onCheckboxChange={handleCheckboxChange}
                    isEditing={isEditing}
                    label={''}
                    divClassName={'mb-4'}
                    labelClassName={'font-medium hidden sm:flex'}
                    sectionClassName={'grid grid-cols-3 gap-4 items-center mb-2'}
                />


            </div>

            <DeleteWarningModal
                buttonLabel={'Eliminar negocio'}
                buttonBgColor={''}
                buttonTextColor={'text-red-600'}
                buttonHoverColor={'hover:bg-red-100'}
                buttonIcon={<FaRegTrashCan />}
                buttonPossition='justify-end'
                modalLabel='Atención!'
                content='Atención! Una vez que elimines tu negocio ya no podrás acceder a toda tu información.'
                contentAction={handleDeleteCompany}
                acceptButton={'Eliminar'}
                cancelButton={'Cancelar'}
                />
        </div>


    );
}

