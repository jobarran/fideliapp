"use client";

import { updateCompany } from '@/actions';
import { defaultOpenHours } from '@/config';
import { CompanyClientDashboard, DayHours } from '@/interfaces';
import React, { useCallback, useState } from 'react';
import { OpenHoursSection } from '..';
import { FiEdit, FiSave, FiX } from 'react-icons/fi'

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
}

export const ClientAdminConfigurationHours = ({ company }: Props) => {

    const [editedCompany, setEditedCompany] = useState<EditedCompany>({
        ...company,
        openHours: company.openHours || defaultOpenHours(),
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = useCallback(() => {
        if (isEditing) {
            updateCompany(editedCompany);
        }
        setIsEditing((prev) => !prev);
    }, [isEditing, editedCompany]);

    const handleCancelClick = useCallback(() => {
        setEditedCompany({
            ...company,
            openHours: company.openHours || defaultOpenHours(),
        });
        setIsEditing(false);
    }, [company]);


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

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center pb-4'>
                <h2 className="text-lg font-semibold text-gray-700">Horarios</h2>
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
            <OpenHoursSection
                openHours={editedCompany.openHours}
                onHourChange={handleOpenHourChange}
                onCheckboxChange={handleCheckboxChange}
                isEditing={isEditing}
                label={''}
                divClassName={'mb-4'}
                labelClassName={'font-medium hidden sm:flex'}
                sectionClassName={'flex flex-row sm:grid sm:grid-cols-3 gap-4 items-center mb-2'}
            />

        </div>



    );
}
