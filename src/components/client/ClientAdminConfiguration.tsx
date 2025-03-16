"use client";

import { CompanyClientDashboard, DayHours } from '@/interfaces';
import React, { useState } from 'react';
import { ActiveWarningModal, ChangeImageModal, ClientAdminConfigurationCard, ClientAdminConfigurationForm, ClientAdminConfigurationHours, ClientAdminConfigurationSocial } from '..';
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
    const [isActive, setisActive] = useState(company.active)

    const handleActiveCompany = async () => {
        await activeCompany(company.slug, !isActive)
        setisActive(!isActive)
    };

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

