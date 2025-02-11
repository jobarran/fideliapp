"use client";

import { ActivityType, CompanyFilters } from '@/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { ActionButton } from '../buttons/ActionButton';

interface Props {
    filters: CompanyFilters;
    handleInputChange: (name: keyof CompanyFilters, value: string[] | string) => void;
    handleClearFilters: () => void;
    activityTypes: ActivityType[];
    filterModalData: boolean;
    setFilterModalData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterModal = ({ filters, activityTypes, handleInputChange, filterModalData, setFilterModalData, handleClearFilters }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);

    useEffect(() => {
        setSelectedActivityTypes(filters.activityTypeId);
    }, [filters.activityTypeId]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-company-modal') {
            setFilterModalData(!filterModalData);
        }
    };

    useEffect(() => {
        if (modalRef.current) {
            if (filterModalData) {
                modalRef.current.removeAttribute('inert');
            } else {
                modalRef.current.setAttribute('inert', 'true');
            }
        }
    }, [filterModalData]);

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${filterModalData ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${filterModalData ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${filterModalData ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    const handleTagClick = (id: string) => {
        const isSelected = selectedActivityTypes.includes(id);
        const updatedActivityTypes = isSelected
            ? selectedActivityTypes.filter(typeId => typeId !== id)
            : [...selectedActivityTypes, id];
        setSelectedActivityTypes(updatedActivityTypes);
        handleInputChange('activityTypeId', updatedActivityTypes);
    };

    return (
        <div>
            <div className={blurEffectClasses}></div>
            <div
                id="new-company-modal"
                tabIndex={-1}
                aria-hidden={!filterModalData}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setFilterModalData(!filterModalData)}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4">
                        <div>
                            <span className="text-sm text-gray-900">Filtros</span>
                            <h1 className="text-lg font-bold">¿Qué estas buscando?</h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 p-4">
                        <h2 className="text-sm font-normal text-slate-900 mb-2">Tipo de Actividad</h2>
                        <div className="flex flex-wrap gap-2">
                            {activityTypes.map(type => (
                                <button
                                    key={type.id}
                                    className={`px-3 py-2 text-sm rounded-full ${selectedActivityTypes.includes(type.id) ? 'bg-slate-800 text-white' : 'bg-gray-200 text-slate-800'}`}
                                    onClick={() => handleTagClick(type.id)}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row justify-end gap-2 m-2'>
                        <ActionButton
                            slug={'Aceptar'}
                            bgColor={'bg-slate-600'}
                            textColor={'text-white'}
                            hoverColor={'hover:bg-slate-800'}
                            icon={undefined}
                            action={() => setFilterModalData(!filterModalData)}
                        />
                        <ActionButton
                            slug={'Borrar filtros'}
                            bgColor={'border border-slate-200'}
                            textColor={'text-slate-800'}
                            hoverColor={'hover:bg-slate-100'}
                            icon={undefined}
                            action={handleClearFilters}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}