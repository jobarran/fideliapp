"use client";

import { ActivityType, CompanyFilters } from '@/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { CompanyGridFilterModalActivityType } from './CompanyGridFilterModalActivityType';

interface Props {
    filters: CompanyFilters;
    handleInputChange: (name: keyof CompanyFilters, value: string[] | string) => void;
    activityTypes: ActivityType[];
    companyFilterModal: boolean;
    setCompanyFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanyGridFilterModal = ({ filters, activityTypes, handleInputChange, companyFilterModal, setCompanyFilterModal }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);

    useEffect(() => {
        setSelectedActivityTypes(filters.activityTypeId);
    }, [filters.activityTypeId]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-company-modal') {
            setCompanyFilterModal(!companyFilterModal);
        }
    };

    useEffect(() => {
        if (modalRef.current) {
            if (companyFilterModal) {
                modalRef.current.removeAttribute('inert');
            } else {
                modalRef.current.setAttribute('inert', 'true');
            }
        }
    }, [companyFilterModal]);

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${companyFilterModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${companyFilterModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${companyFilterModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

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
                aria-hidden={!companyFilterModal}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setCompanyFilterModal(!companyFilterModal)}
                    >
                        <IoCloseSharp />
                    </button>
                    <div className="p-4">
                        <div>
                            <span className="text-sm text-gray-900">Filtros</span>
                            <h1 className="text-lg font-bold">¿Qué estas buscando?</h1>
                        </div>
                    </div>

                    <CompanyGridFilterModalActivityType
                        activityTypes={activityTypes}
                        selectedActivityTypes={selectedActivityTypes}
                        onTagClick={handleTagClick}
                    />

                </div>
            </div>
        </div>
    );
}