"use client";

import { activeCompany, deleteCompany, getActivityTypes, updateCompany } from '@/actions';
import { colorOptions, defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import { formatAddress } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { ActionButton, CheckboxField, ColorPicker, DeleteWarningModal, OpenHoursSection, SelectField, TextField } from '..';
import { useRouter } from 'next/navigation';
import { FaBan, FaCheck, FaRegTrashCan } from 'react-icons/fa6';
import { ActiveWarningModal } from '../ui/modals/ActiveWarningModal';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';

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
    const [isActive, setisActive] = useState(company.active)

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
        deleteCompany(company.slug,)
        router.replace('/')
    };

    const handleActiveCompany = async () => {
        activeCompany(company.slug, !isActive)
        setisActive(!isActive)
    };

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className='text-sm'>
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

                <div className='text-sm'>
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


            </div>

            <div className='flex flex-row space-x-2'>
                <div className='flex justify-start'>
                    <button
                        onClick={() => handleEditClick()}
                        className={` text-xs py-1 px-2 rounded-lg border border-slate-200 ${isEditing ? 'bg-slate-800 text-slate-100' : 'text-slate-800 hover:bg-slate-100'}`}
                    >
                        <span className='flex gap-2 p-1'>
                            <p className='text-sm'>{isEditing ? 'Guardar' : 'Editar'}</p><span className='text-base'>{isEditing ? <FaRegSave className='hidden sm:block'/> : <FaRegEdit className='hidden sm:block'/>}</span>
                        </span>
                    </button>
                </div>


                <ActiveWarningModal
                    buttonLabel={isActive ? 'Desactivar negocio' : 'Activar negocio'}
                    buttonBgColor={''}
                    buttonTextColor={'text-slate-500'}
                    buttonHoverColor={'hover:bg-slate-100 border border-slate-200'}
                    buttonIcon={isActive ? <FaBan className='hidden sm:block' /> : <FaCheck className='hidden sm:block'/>}
                    buttonPossition='justify-start'
                    modalLabel='Atención!'
                    content={
                        isActive
                            ? 'Atención! Si desactivás tu negocio, los usuarios no podrán acceder a sus tarjetas hasta que vuelvas a activarlo.'
                            : 'Atención! Una vez que vuelva a activar su negocio los usuarios volverán a acceder a sus tarjetas'
                    }
                    contentAction={() => handleActiveCompany()}
                    acceptButton={isActive ? 'Desactivar' : 'Activar'}
                    cancelButton={'Cancelar'}
                />

                <DeleteWarningModal
                    buttonLabel={'Eliminar negocio'}
                    buttonBgColor={''}
                    buttonTextColor={'text-red-600'}
                    buttonHoverColor={'hover:bg-red-100 border border-red-200'}
                    buttonIcon={<FaRegTrashCan className='hidden sm:block'/>}
                    buttonPossition='justify-start'
                    modalLabel='Atención!'
                    content='Atención! Una vez que elimines tu negocio ya no podrás acceder a toda tu información.'
                    contentAction={handleDeleteCompany}
                    acceptButton={'Eliminar'}
                    cancelButton={'Cancelar'}
                />
            </div>


        </div>


    );
}

