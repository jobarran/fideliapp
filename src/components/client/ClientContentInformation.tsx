"use client";

import { activeCompany, deleteCompany, getActivityTypes, updateCompany } from '@/actions';
import { colorOptions, defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import { formatAddress } from '@/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { ColorField, ColorPicker, CompanyCard, OpenHoursSection, SelectField, TextAreaField, TextField } from '..';
import { useRouter } from 'next/navigation';
import { FaBan, FaCheck } from 'react-icons/fa6';
import { ActiveWarningModal } from '../ui/modals/ActiveWarningModal';
import { FaFacebook, FaInstagram, FaLink, FaPhone, FaRegEdit, FaRegSave, FaTwitter, FaWhatsapp } from 'react-icons/fa';

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientContentInformation = ({ company, setOpenModal }: Props) => {

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

            <div className="flex flex-col mb-4">
                <div className='text-sm'>
                    <h3 className='text-lg font-semibold mb-2 text-slate-800'>Información</h3>
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

                <div className='text-sm'>
                    <h3 className='text-lg font-semibold mb-2 text-slate-800'>Horarios</h3>
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

                    <h3 className='text-lg font-semibold sm:pt-4 mb-2 text-slate-800'>Tarjeta</h3>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4 w-full'>

                        <h3 className="font-medium hidden col-span-1 sm:flex">Editar tarjeta</h3>

                        <div className="flex-1 flex flex-col sm:flex-row col-span-2 mb-2 lg:mb-0 items-center sm:items-start justify-center sm:justify-start gap-4 w-full">
                            <CompanyCard
                                logo={company.CompanyLogo?.url}
                                name={editedCompany.name}
                                address={editedCompany.address}
                                backgroundColor={editedCompany.backgroundColor}
                                activityType={editedCompany.activityType.name}
                                textColor={editedCompany.textColor} // Pass the textColor to the CompanyCard
                            />
                            <div className='flex sm:flex-col space-x-2'>
                                <button
                                    className='border border-1 rounded-sm p-1 my-1 mx-1 sm:mx-2 h-8 w-24 border-slate-600'
                                    onClick={() => setOpenModal(true)}
                                    disabled={!isEditing}
                                >
                                    <p className='text-sm text-slate-500'>Logo</p>
                                </button>

                                <ColorField
                                    label="Fondo"
                                    value={editedCompany.backgroundColor}
                                    onChange={(e) => handleInputChange(e, 'backgroundColor')}
                                    disabled={!isEditing}
                                    divClassName="flex"
                                    labelClassName="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-500"
                                    inputClassName="h-10 p-0 rounded-lg w-24"
                                />

                                <ColorField
                                    label="Texto"
                                    value={editedCompany.textColor}
                                    onChange={(e) => handleInputChange(e, "textColor")}
                                    disabled={!isEditing}
                                    divClassName="flex"
                                    labelClassName="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-500"
                                    inputClassName="h-10 p-0 w-24 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>


                </div>


            </div>

            <div className='flex flex-row space-x-2'>
                <div className='flex justify-start'>
                    <button
                        onClick={() => handleEditClick()}
                        className={` text-xs py-1 px-2 rounded-lg border border-slate-200 ${isEditing ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <span className='flex gap-2 p-1'>
                            <p className='text-sm'>{isEditing ? 'Guardar' : 'Editar'}</p><span className='text-base'>{isEditing ? <FaRegSave /> : <FaRegEdit />}</span>
                        </span>
                    </button>
                </div>


                <ActiveWarningModal
                    buttonLabel={isActive ? 'Desactivar negocio' : 'Activar negocio'}
                    buttonBgColor={''}
                    buttonTextColor={'text-slate-500'}
                    buttonHoverColor={'hover:bg-slate-100 border border-slate-200'}
                    buttonIcon={isActive ? <FaBan /> : <FaCheck />}
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

                {/* <DeleteWarningModal
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
                /> */}

            </div>


        </div>


    );
}

