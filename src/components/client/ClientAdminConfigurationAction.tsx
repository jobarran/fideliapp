"use client";

import { FaBan, FaCheck } from "react-icons/fa";
import { ActiveWarningModal } from "..";
import { activeCompany } from "@/actions";
import { useState } from "react";
import { CompanyClientDashboard } from "@/interfaces";

interface Props {
    company: CompanyClientDashboard;
}

export const ClientAdminConfigurationAction = ({ company }: Props) => {

    const [isActive, setisActive] = useState(company.active)

    
    const handleActiveCompany = async () => {
        await activeCompany(company.slug, !isActive)
        setisActive(!isActive)
    };


    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center pb-4'>
                <h2 className="text-base font-semibold text-gray-700">Acciones</h2>
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
        </div>



    );
}
