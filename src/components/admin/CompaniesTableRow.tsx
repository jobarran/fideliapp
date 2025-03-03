"use client";

import { Company } from "@/interfaces";
import { FiEdit } from "react-icons/fi";
import { Avatar, UserCardImage } from "..";

interface Prop {
    company: Company;
    setCompanyToEdit: React.Dispatch<React.SetStateAction<Company | null>>;
    setOpenCompanyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CompaniesTableRow({ company, setCompanyToEdit, setOpenCompanyModal }: Prop) {

    const handleEditCompany = () => {
        setCompanyToEdit(company); // Set the company to edit
        setOpenCompanyModal(true); // Open the modal
    };

    return (
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    {company.CompanyLogo ? (
                        <UserCardImage
                            src={company.CompanyLogo?.url}
                            width={0}
                            height={0}
                            alt={company.name}
                            className="object-cover"
                            priority
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Avatar name={company.name} backgroundColor={company.backgroundColor} size={'16'} />
                    )}
                </div>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {company.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {company.user.name} {company.user.lastName}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {company.active ? "Sí" : "No"}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {company.validated ? "Sí" : "No"}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {company.slug}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleEditCompany}
                >
                    <FiEdit size={20} />
                </button>
            </td>
        </tr>
    );
}
