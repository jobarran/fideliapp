
import { getAllCompanies } from "@/actions";
import { AdminNewCompanyModal, CompanyLogo } from "@/components";
import Link from "next/link";


export default async function CompaniesPage() {


    const companies = await getAllCompanies()

    return (
        <div>
            <div className="flex flex-col items-center">

                <AdminNewCompanyModal />

                <h1>Mantenimiento de locales</h1>

                <div className="mb-10">
                    <table className="min-w-full">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Imagen
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Nombre
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Tipo
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Usuario
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    Color
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr
                                    key={company.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/company/${company.name}`}>
                                            <CompanyLogo
                                                src={ company.CompanyLogo?.url }
                                                width={60}
                                                height={60}
                                                alt={company.name}
                                                className={`w-15 h-15 rounded-full object-cover`}
                                                />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={`/admin/company/${company.name}`}
                                            className="hover:underline"
                                        >
                                            {company.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {company.activityType}
                                    </td>

                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {company.user.name} {company.user.lastName}
                                    </td>

                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {company.backgroundColor}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    );
}