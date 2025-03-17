"use client";

import { CompanyClientDashboard, DayHours } from '@/interfaces';
import React, { useState } from 'react';
import { ActiveWarningModal, ChangeImageModal, ClientAdminConfigurationAction, ClientAdminConfigurationCard, ClientAdminConfigurationForm, ClientAdminConfigurationHours, ClientAdminConfigurationSocial } from '..';
import { FaBan, FaCheck } from 'react-icons/fa';
import { activeCompany } from '@/actions';

interface EditedCompany extends CompanyClientDashboard {
    openHours: Record<string, DayHours>;
}

interface Props {
    company: CompanyClientDashboard;
}

export const ClientAdminConfiguration = ({ company }: Props) => {

    const [openModal, setOpenModal] = useState(false)

    return (

        <div className="flex flex-wrap w-full">
            <div className="w-full md:w-1/3 p-2">
                <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4">
                    <ClientAdminConfigurationCard company={company} setOpenModal={setOpenModal} />
                </div>
            </div>
            <div className="w-full md:w-2/3 p-2 space-y-4">
                <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4">
                    <ClientAdminConfigurationForm company={company} />
                </div>
                <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4">
                    <ClientAdminConfigurationSocial company={company} />
                </div>
                <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4">
                    <ClientAdminConfigurationHours company={company} />
                </div>
                <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4">
                    <ClientAdminConfigurationAction company={company} />
                </div>
            </div>
            <ChangeImageModal
                content='Editar logo de negocio'
                acceptButton={'Aceptar'}
                cancelButton={'Cancelar'}
                openModal={openModal}
                setOpenModal={setOpenModal}
                imgUrl={company.CompanyLogo?.url}
                name={company.name}
                backgroundColor={company.backgroundColor}
                slug={company.slug}
            />
        </div>

    );
}

