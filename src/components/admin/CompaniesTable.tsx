"use client";

import React, { useState } from "react";
import { Company } from "@/interfaces";
import CompaniesTableRow from "./CompaniesTableRow";
import { AdminEditCompanyModal } from "..";
import useCompanyFilterAdmin from "@/hooks/useCompanyFilterAdmin";

interface Prop {
    companies: Company[];
}

export const CompaniesTable = ({ companies }: Prop) => {
    const [openCompanyModal, setOpenCompanyModal] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);

    const {
        filters,
        setFilter,
        filteredCompanies,
    } = useCompanyFilterAdmin(companies);

    return (
        <div className="flex flex-col w-full">
            <AdminEditCompanyModal
                setOpenCompanyModal={setOpenCompanyModal}
                openCompanyModal={openCompanyModal}
                companyToEdit={companyToEdit}
                setCompanyToEdit={setCompanyToEdit}
            />

            <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={filters.text}
                    onChange={(e) => setFilter("text", e.target.value)}
                    className="border px-4 py-2 rounded-md w-full"
                />
                <select
                    value={filters.active}
                    onChange={(e) => setFilter("active", e.target.value)}
                    className="border px-4 py-2 rounded-md w-full"
                >
                    <option value="">Todos los estados</option>
                    <option value="true">Activos</option>
                    <option value="false">Inactivos</option>
                </select>
                <select
                    value={filters.validated}
                    onChange={(e) => setFilter("validated", e.target.value)}
                    className="border px-4 py-2 rounded-md w-full"
                >
                    <option value="">Todos los habilitados</option>
                    <option value="true">Habilitado</option>
                    <option value="false">Deshabilitado</option>
                </select>
            </div>

            {/* Table container */}
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-md">
                    <thead className="bg-white border-b rounded-md">
                        <tr>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Imagen</th>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Nombre</th>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Usuario</th>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Activo</th>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Habilitado</th>
                            <th className="text-sm font-semibold text-slate-900 px-4 py-2 text-left">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map((company) => (
                            <CompaniesTableRow
                                key={company.id}
                                company={company}
                                setOpenCompanyModal={setOpenCompanyModal}
                                setCompanyToEdit={setCompanyToEdit}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};