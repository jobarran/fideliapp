"use client";

import React, { useState } from 'react'
import { Company, Product } from '@/interfaces'
import CompaniesTableRow from './CompaniesTableRow';
import { AdminEditCompanyModal } from '..';

interface Prop {
    companies: Company[]
}

export const CompaniesTable = ({ companies }: Prop) => {

    const [openCompanyModal, setOpenCompanyModal] = useState(false)
    const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null)

    return (
        <>
            <AdminEditCompanyModal
                setOpenCompanyModal={setOpenCompanyModal}
                openCompanyModal={openCompanyModal}
                companyToEdit={companyToEdit}
                setCompanyToEdit={setCompanyToEdit}
            />

            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Imagen</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nombre</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Usuario</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Activo</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Validado</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Slug</th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <CompaniesTableRow key={company.id} company={company} setOpenCompanyModal={setOpenCompanyModal} setCompanyToEdit={setCompanyToEdit}  />
                    ))}
                </tbody>
            </table>
        </>
    )
}
