"use client";

import { formatAddress } from '@/utils'
import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { CompanyClientDashboard } from '@/interfaces';
import { CompanyLinkImage } from '../company/CompanyLinkImage';
import { Avatar, ChangeImage } from '..';

interface Props {
    company: CompanyClientDashboard
}

export const ClientDashboardInformation = ({ company }: Props) => {

    const [openModal, setOpenModal] = useState(false)

    const handleChangeImage = () => {
        console.log('Change image')
    }

    return (

        <div className="flex flex-col sm:flex-row items-center justify-between">

            <ChangeImage
                modalLabel='Atención!'
                content='Editar logo de negocio'
                acceptButton={'Aceptar'}
                cancelButton={'Cancelar'}
                contentAction={handleChangeImage}
                openModal={openModal}
                setOpenModal={setOpenModal}
                imgUrl={company.CompanyLogo?.url}
                name={company.name}
                backgroundColor={company.backgroundColor}
                slug={company.slug}
            />

            {/* Logo */}
            <div className="flex justify-center px-4">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center bg-white my-4">
                    <button onClick={() => setOpenModal(true)}>
                        {company.CompanyLogo ? (
                            <CompanyLinkImage
                                src={company.CompanyLogo.url}
                                width={0}
                                height={0}
                                alt={company.name}
                                className="object-cover"
                                priority
                                style={{
                                    borderRadius: '50%',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center center', 
                                    aspectRatio: '1/1',
                                }}
                            />
                        ) : (
                            <Avatar name={company.name} backgroundColor={company.backgroundColor} size={'20'} />
                        )}
                    </button>
                </div>
            </div>

            {/* Company information */}
            <div className="ml-6 flex-1 flex flex-col sm:items-start items-center">
                <h1 className="font-semibold text-lg sm:text-2xl text-center sm:text-left">
                    {company.name}
                </h1>
                <p className="text-gray-600 mb-2 hidden sm:flex">
                    {company.activityType?.name}
                </p>
                <p className="text-gray-600 items-center hidden sm:flex">
                    <FaMapMarkerAlt className="mr-2" />
                    {formatAddress(company.address)}
                </p>
            </div>

        </div>

    )
}
